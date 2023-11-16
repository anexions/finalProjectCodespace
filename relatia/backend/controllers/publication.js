const Publication = require("../models/publication");


//IMPORT SERVICES------------------------------------
const FollowService = require("../services/followService");

//SIMPLE TEST
const testPublication = (req, res) => {
  return res.status(200).send({
    message: "Test from publication controller",
  });
};

//SAVE PUBLICATION FUNCTION-------------------------
//Make a post.

const savePublication = async (req, res) => {
  try {
    //Take params from request
    const params = req.body;

    //Check if the request have all the fields
    if (!params.title && !params.description && !params.story) {
      return res.status(400).send({
        status: "error",
        message: "All fields are required.",
      });
    }

    //Create object to save
    let newPublication = new Publication(params);
    newPublication.user = req.user.id; // Asignamos el usuario que crea la publicación

    //Save in bbdd using async/await (mongoose dont use callbacks)
    const publicationStored = await newPublication.save();

    // Check if the publication was saved
    if (!publicationStored) {
      return res.status(400).send({
        status: "error",
        message: "Error saving the publication.",
      });
    }

    return res.status(200).send({
      message: "Story saved correctly.",
      publicationStored,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the request.",
      error: error.message,
    });
  }
};

//SHOW PUBLICATION FUNCTION-------------------------

const detailPublication = async (req, res) => {
  try {
    //Save id from url
    const publicationId = req.params.id;

    //Find publication in bbdd
    const publication = await Publication.findById(publicationId);

    //Check if the publication exist
    if (!publication) {
      return res.status(404).send({
        status: "error",
        message: "Publication does not exist.",
      });
    }

    //Return publication
    return res.status(200).send({
      message: "Publication finded.",
      publication,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the request.",
      error: error.message,
    });
  }
};

//DELETE PUBLICATION FUNCTION-------------------------
const deletePublication = async (req, res) => {
  try {
    //Take id from url
    const publicationId = req.params.id;

    //Find and delete publication (only ours)
    const publication = await Publication.findOneAndRemove({
      user: req.user.id, //With this we only can delete our publications************
      _id: publicationId,
    });

    //Check if the publication was removed
    if (!publication) {
      return res.status(404).send({
        status: "error",
        message: "Publication does not exist or you dont have permission.",
      });
    }

    //Return confirmation
    return res.status(200).send({
      message: "Publication deleted correctly.",
      publication: publicationId,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the request.",
      error: error.message,
    });
  }
};

//USER LIST PUBLICATIONS FUNCTION-------------------------
const listPublicationUser = async (req, res) => {
  try {
    const userId = req.params.id;

    let page = 1;
    if (req.params.page) {
      page = req.params.page;
    }
    const itemsPerPage = 5;

    const publications = await Publication.find({ user: userId })
      .sort("-created_at")
      .populate("user", "-password -__v -role -email")
      .paginate(page, itemsPerPage);

    if (!publications) {
      return res.status(404).send({
        status: "error",
        message: "No publications found for this user.",
      });
    }

    let total = await Publication.countDocuments({ user: userId });

    return res.status(200).send({
      message: "Publication list of the user.",
      total,
      page,
      pages: Math.ceil(total / itemsPerPage),
      publications,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the request.",
      error: error.message,
    });
  }
};


//LIST ALL PUBLICATIONS FUNCTION (START FEED)-----
const feedInicial = async (req, res) => {
  try {
    //Control page number
    let page = 1;
    if (req.params.page) {
      page = req.params.page;
    }

    //Number of items per page
    const itemsPerPage = 5;

    //Obtain clean array of user I follow. (Service FollowService)
    const myFollows = await FollowService.followUserIds(req.user.id);

    //Find publications of the user, sort and populate. Paginate
    const publicationsResult = await Publication
      .find({ user: { $in: myFollows.following } })
      .populate("user", "-password -__v -role -email")
      .sort("-created_at")
      .paginate(page, itemsPerPage);

    let total = await Publication.countDocuments({ user: { $in: myFollows.following } });

    return res.status(200).send({
      message: "Publication list of the user.",
      myFollows: myFollows.following,
      total,
      page,
      pages: Math.ceil(total / itemsPerPage),
      publications: publicationsResult,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the request, there is no publication to show.",
      error: error.message,
    });
  }
};



//LIKE PUBLICATION FUNCTION-------------------------

const likePublication = async (req, res) => {
  try {
    const likePublication = await Publication.findByIdAndUpdate(
      req.params.id,
      { $inc: { like: 1 } },
      { new: true }
    );
    return res.status(200).send({
      message: "Like publication done correctly.",
      likePublication,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "You cant like this publication.",
      error: error.message,
    });
  }
};

//EDIT PUBLICATION FUNCTION----------------------------

const editPublication = async (req, res) => {
  try {
    //Take id from url
    const publicationId = req.params.id;

    //Take params from request
    const params = req.body;

    //Find and update publication
    const publication = await Publication.findOneAndUpdate(
      {
        user: req.user.id, //With this we only can edit our publications************
        _id: publicationId,
      },
      params,
      { new: true }
    );

    //Check if the publication was edited
    if (!publication) {
      return res.status(404).send({
        status: "error",
        message: "Publication does not exist or you dont have permission.",
      });
    }

    //Return confirmation
    return res.status(200).send({
      message: "Publication edited correctly.",
      publication,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the request.",
      error: error.message,
    });
  }
};

//UNLIKE PUBLICATION FUNCTION-------------------------

const unLikePublication = async (req, res) => {
  try {
    const unLikePublication = await Publication.findByIdAndUpdate(
      req.params.id,
      { $inc: { like: -1 } },
      { new: true }
    );
    return res.status(200).send({
      message: "Unlike publication done correctly.",
      unLikePublication,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "You can not unlike this publication.",
      error: error.message,
    });
  }
};

//EXPORT FUNCTIONS-----------------------------------------

module.exports = {
  testPublication,
  savePublication,
  detailPublication,
  deletePublication,
  feedInicial,
  listPublicationUser,
  likePublication,
  unLikePublication,
  editPublication,
};
