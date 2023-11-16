// IMPORTS
const Follow = require("../models/follow");
const User = require("../models/user");
const mongoosePaginate = require("mongoose-pagination");
const followService = require("../services/followService");

// TEST ACTION
const testFollow = (req, res) => {
  return res.status(200).send({
    message: "Test from follow controller",
  });
};

// SAVE FOLLOW FUNCTION
const saveFollow = async (req, res) => {
  try {
    const params = req.body;
    const identity = req.user;

    if (identity.id === params.followed) {
      return res.status(400).send({
        status: "error",
        message: "Cannot follow yourself.",
      });
    }

    const existingFollow = await Follow.findOne({
      user: identity.id,
      followed: params.followed,
    });

    if (existingFollow) {
      return res.status(409).send({
        status: "error",
        message: "Already following this user.",
      });
    }

    const userToFollow = new Follow({
      user: identity.id,
      followed: params.followed,
    });

    const userToFollowStored = await userToFollow.save();
    
    return res.status(200).send({
      status: "success",
      identity: req.user,
      follow: userToFollowStored,
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error saving the follow",
      error: error.message,
    });
  }
};

// REMOVE FOLLOW FUNCTION
const deleteFollow = async (req, res) => {
  try {
    const userId = req.user.id;
    const followedId = req.params.id;

    const followDeleted = await Follow.findOneAndRemove({
      user: userId,
      followed: followedId,
    });

    if (!followDeleted) {
      return res.status(404).send({
        status: "error",
        message: "Follow not found",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Follow deleted",
      identity: req.user,
      followDeleted,
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error deleting the follow",
      error: error.message,
    });
  }
};

// Utility function for pagination
const paginateResults = async (query, page = 1, itemsPerPage = 5) => {
  const results = await query.paginate(page, itemsPerPage);
  const total = await query.countDocuments();

  return {
    results,
    total,
    pages: Math.ceil(total / itemsPerPage),
  };
};

// FOLLOWING LIST FUNCTION
const following = async (req, res) => {
  try {
    //Obtain the id from the logged user
    let userId = req.user.id;
    //Check the id from the url
    if (req.params.id) userId = req.params.id;

    //Obtain page, default 1 if not specified
    let page = 1;
    if (req.params.page) page = req.params.page;

    //Pagination options
    const itemsPerPage = 5;

    //Find the users I follow
    const following = await Follow.find({ user: userId })
      .populate("followed", "-password -role -__v -email")
      .paginate(page, itemsPerPage);

    let total = following.total;  // Using the total from the paginate response

    //Obtain array from users
    let followUserIds = await followService.followUserIds(req.user.id);

    res.status(200).send({
      status: "success",
      message: "List of users I follow",
      following,
      total,
      pages: Math.ceil(total / itemsPerPage),
      user_following: followUserIds.following,
      user_follow_me: followUserIds.followers,
    });

  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error in the request",
      error: error.message, // This will give more details about the error
    });
  }
};


// FOLLOWERS LIST FUNCTION
const followers = async (req, res) => {
  try {
    let userId = req.user.id;
    if (req.params.id) userId = req.params.id;

    const query = Follow.find({ followed: userId })
      .populate("user followed", "-password -role -__v -email");

    const { results, total, pages } = await paginateResults(query, req.params.page);

    const followUserIds = await followService.followUserIds(req.user.id);

    res.status(200).send({
      status: "success",
      message: "List of users who follow me",
      followers: results,
      total,
      pages,
      user_following: followUserIds.following,
      user_follow_me: followUserIds.followers,
    });

  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error in the request",
      error: error.message,
    });
  }
};

//FOLLOW PROFILE FUNCTION--------------------------------
//USER PROFILE FUNCTION-------------------------------

const followProfile = async (req, res) => {
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

// EXPORT FUNCTIONS
module.exports = {
  testFollow,
  saveFollow,
  deleteFollow,
  following,
  followers,
};
