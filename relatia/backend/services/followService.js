//THIS IS A SERVICE TO USE WHATEVER WE WANT IN FOLLOW CONTROLLER OR OTHER CONTROLLERS

//IMPORT THE MODEL TO WORK WITH---------------------------------
const Follow = require("../models/follow");

const followUserIds = async (identityUserId) => {
  try {
    let following = await Follow.find({ user: identityUserId });

    let followers = await Follow.find({ followed: identityUserId });

    // Procesar el array de following ids
    let followingClean = [];
    following.forEach((follow) => {
      followingClean.push(follow.followed);
    });

    // Procesar el array de followers ids
    let followersClean = [];
    followers.forEach((follow) => {
      followersClean.push(follow.user);
    });

    return {
      following: followingClean,
      followers: followersClean,
    };
  } catch (error) {
    return {};
  }
};

const followThisUser = async (identityUserId, profileUserId) => {
  let following = await Follow.findOne({
    user: identityUserId,
    followed: profileUserId,
  });

  let follower = await Follow.findOne({
    user: profileUserId,
    followed: identityUserId,
  });

  return {
    following,
    follower,
  };
};

module.exports = {
  followUserIds,
  followThisUser,
};
