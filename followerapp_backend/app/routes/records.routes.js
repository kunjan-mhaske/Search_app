module.exports = app => {
    const records = require("../controllers/records.controller.js");
    var router = require("express").Router();

    // retrieve all followers and following in single query
    router.get("/followersfollowings", records.findAllFollowersAndFollowings);

    //retrive all followers
    router.get("/followers", records.findAllFollowers);

    // retrieve all followings
    router.get("/followings", records.findAllFollowings);

    app.use("/api/records", router);

};