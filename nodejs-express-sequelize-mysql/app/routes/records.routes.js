module.exports = app => {
    const records = require("../controllers/records.controller.js");
    var router = require("express").Router();

    // create a new record
    // router.post("/", records.create);

    // retrieve all records
    router.get("/", records.findAll);

    // retrieve all records with zip
    router.get("/SchoolsZip", records.findAllSchoolsZip);

    // retrive all records with city and state
    router.get("/Schools", records.findAllSchools);

    // retrive a school with id
    router.get("/:school_id", records.findOne);

    // update the record
    router.put("/:school_id", records.update);

    // delete a record with id
    // router.delete("/:school_id", records.delete);

    // delete all records
    // router.delete("/", records.deleteAll);

    app.use("/api/records", router);

};