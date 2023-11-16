//IMPORT DEPENDENCIES---------------------------------
const bcrypt = require("bcrypt"); //To cifrate password
const mongoosePagination = require("mongoose-pagination"); //To paginate when we have a lot of data
const User = require("../models/user"); //To use the models created on Models folder
const path = require("path"); //To obtain the path of the file
const fs = require("fs"); //To delete files
//IMPORTAR MODELO------------------------------------

//IMPORT SERVICES------------------------------------
const jwt = require("../services/jwt"); //Middleware to create authentiction token.
const followService = require("../services/followService"); //Service to follow users (followService.js)

//CREATE FIRST FUNCTION TO TEST----------------------
const testUser = (req, res) => {
  return res.status(200).send({
    message: "Test from user controller",
    User: req.user, //We can see the user in the request with token validation
  });
};

//USER REGISTER FUNCTION-----------------------------

const register = async (req, res) => {
  const params = req.body;

  // Check if the request is empty
  if (!params.name || !params.email || !params.password || !params.nick) {
    return res.status(400).json({
      status: "error",
      message: "Require date to register user",
    });
  }

  // Check if the user is already registered (find in the database with $or)
  const existingUser = await User.findOne({
    $or: [
      { email: params.email.toLowerCase() },
      { nick: params.nick.toLowerCase() },
    ],
  });

  if (existingUser) {
    return res.status(200).json({
      status: "error",
      message: "User already registered",
    });
  }

  // Encrypt password and save user
  params.password = await bcrypt.hash(params.password, 10);

  const newUser = new User(params);

  try {
    await newUser.save();
    return res.status(200).json({
      status: "success",
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error saving user:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

//LOGIN USER FUNCTION---------------------------------

const login = async (req, res) => {
  const params = req.body;

  // Check the params.
  if (!params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      message: "Require data to login user",
    });
  }

  try {
    const user = await User.findOne({ email: params.email });
    //If user doesn't exist, return error
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    //Compare password with bcrypt
    const pwd = bcrypt.compareSync(params.password, user.password); //compare password in bbdd with bcrypt

    if (!pwd) {
      return res.status(404).send({
        status: "error",
        message: "Password not found",
      });
    }

    //return token (now is false)
    //const token = false; we change this line for the real token
    const token = jwt.createToken(user);

    return res.status(200).send({
      status: "success",
      message: "User logged!!",
      user: {
        //We choose what we want to return
        id: user._id,
        name: user.name,
        nick: user.nick,
        image: user.image,
        bio: user.bio,
      },
      token, //Now when you login you will get the token
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

//USER PROFILE FUNCTION-------------------------------

const profile = async (req, res) => {
  const userId = req.params.id;

  try {
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).send({ message: "User not found" });
    }

    //Obtain follow info with the service we created.
    const followInfo = await followService.followThisUser(req.user.id, userId); //Con esto al entrar en mi profile, debo de ver a quien sigo y quien me sigue

    return res.status(200).send({
      status: "success",
      user: {
        id: userProfile.id,
        name: userProfile.name,
        bio: userProfile.bio,
        nick: userProfile.nick,
        email: userProfile.email,
        image: userProfile.image,
        created_date: userProfile.created_date,
      },
      following: followInfo.following,
      follower: followInfo.follower,
    });
  } catch (error) {
    return res.status(500).send({ message: "Error in the request" });
  }
};

//USER LIST FUNCTION----------------------------------

const userList = async (req, res) => {
  // Control number of page
  let page = req.params.page ? parseInt(req.params.page) : 1;
  const itemsPerPage = 5; // Number of items per page (5 users per page)

  try {
    const users = await User.find().sort("_id").paginate(page, itemsPerPage);
    const total = await User.countDocuments();

    if (!users || users.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "There are no users",
      });
    }

    //OBTAIN ARRAYS WITH USERS I FOLLOW AND USERS THAT FOLLOW ME

    let followUserIds = await followService.followUserIds(req.user.id);

    return res.status(200).send({
      status: "success",
      users,
      page,
      itemsPerPage,
      total,
      pages: Math.ceil(total / itemsPerPage), // math.ceil to round up the number
      user_following: followUserIds.following,
      user_follow_me: followUserIds.followers,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching users",
      error,
    });
  }
};

//USERS UPDATE FUNCTION-------------------------------

const updateUser = async (req, res) => {
  let userId = req.user.id; // Request user identity
  let { name, bio, password, currentPassword } = req.body; 

  try {
    // If user wants to change the password
    if (password && currentPassword) {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({
          status: "error",
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).send({
          status: "error",
          message: "Current password is incorrect",
        });
      }

      // Encrypt the new password
      password = await bcrypt.hash(password, 10);
    } else if (password && !currentPassword) {
      return res.status(400).send({
        status: "error",
        message: "Current password is required to set a new password",
      });
    }

    // Update the user document
    const updatedFields = { name, bio };
    if (password) {
      updatedFields.password = password;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );

    return res.status(200).send({
      status: "success",
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error updating user",
      error,
    });
  }
};



//CHANGE AVATAR FUNCTION------------------------------

const upload = async (req, res) => {
  try {
    // Check if the file exists
    if (!req.file) {
      return res.status(404).send({
        status: "error",
        message: "File not uploaded",
      });
    }

    // Obtain file name.
    let image = req.file.filename;

    //Obtain file extension
    const imageSplit = image.split(".");
    const extension = imageSplit[1].toLowerCase();

    //Check file extension and remove is it no correct (png, jpg, jpeg, gif)
    if (
      extension !== "png" &&
      extension !== "jpg" &&
      extension !== "jpeg" &&
      extension !== "gif"
    ) {
      //Delete incorrect file
      const filePath = req.file.path;
      fs.unlinkSync(filePath); // Elimina antes de subir

      return res.status(400).send({
        status: "error",
        message: "Invalid extension",
      });
    }

    //Save file (if it is correct)
    const userUpdated = await User.findByIdAndUpdate(
      {_id: req.user.id},
      { image: req.file.filename },
      { new: true } // new: true para devolver el nuevo usuario
    );

    if (!userUpdated) {
      return res.status(500).send({
        status: "error",
        message: "Error saving image",
      });
    }

    //RETURN RESPONSE
    return res.status(200).send({
      status: "success",
      user: userUpdated,
      file: req.file,
      files: req.files,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the upload process",
      error: error.message,
    });
  }
};

//CHANGE AVATAR FUNCTION------------------------------

const getAvatar = async (req, res) => {
  //url parameter
  const file = req.params.file;
  //real path of the file
  const filePath = "./uploads/avatars/" + file;
  //check if the file exists
  fs.stat(filePath, (error, exists) => {
    if (error || !exists) {
      return res.status(404).send({
        status: "error",
        message: "Avatar not found",
      });
    }

    return res.sendFile(path.resolve(filePath));
  });
};

//TOTAL USER LIST-------------------------------------

const getWriters = async (req, res) => {
  try {
    const users = await User.find().sort("_id");

    if (!users || users.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "There are no users",
      });
    }

    return res.status(200).send({
      status: "success",
      users,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "There was an error fetching users",
      error,
    });
  }
};

//EXPORT FUNCTIONS------------------------------------

module.exports = {
  register,
  testUser,
  login,
  profile,
  userList,
  updateUser,
  upload,
  getAvatar,
  getWriters,
};
