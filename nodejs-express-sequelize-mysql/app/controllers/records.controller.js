const db = require("../models");
const SchoolRecords = db.school_records;
const NpRecords = db.np_records;
const Op = db.Sequelize.Op;

// For default pagination part: if client dont provide paging parameters
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return {limit, offset};
};

// function to map default response to desired structure
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: records } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {totalItems, records, totalPages, currentPage};
};

// retrieve all records based on the school name for Dynamic search bar
exports.findAllDynamic = (req, res) => {
  const school_name = req.query.school_name;
  var condition = school_name ? { 
                    School_name: { [Op.like]: `%${school_name}%` } 
                  } : null;
  // Get results in ascending order of school name
  const ordering = [['School_Name', 'ASC']];

  SchoolRecords.findAll({ where: condition, order: ordering })
    .then(data => {
      const response = data;
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving records."
      });
    });
};

// retrieve all records based on the school name
exports.findAll = (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const school_name = req.query.school_name;
    // const { page, size, school_name } = req.query;
    var condition = school_name ? { 
                      School_name: { [Op.like]: `%${school_name}%` } 
                    } : null;
    
    const {limit, offset } = getPagination(page, size);

    // Get results in ascending order of school name
    const ordering = [['School_Name', 'ASC']];
  
    SchoolRecords.findAndCountAll({ where: condition, order: ordering, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving records."
        });
      });
};

// Find all specific records based on city and state
exports.findAllSchools = (req, res) => {
  const {page, size, school_city, school_state} = req.query;
  const {limit, offset} = getPagination(page, size);

  var condition = school_city ? { 
    State: { [Op.like]: `%${school_state}%` },
    City: { [Op.like]: `%${school_city}%` } 
  } : null;

  // Get results in ascending order of school name
  const ordering = [['School_Name', 'ASC']];

  SchoolRecords.findAndCountAll({ 
    where : condition,
    order: ordering,
    limit, offset
  })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving records."
    });
  });
};

// Find all specific records based on zip
exports.findAllSchoolsZip = (req, res) => {
  const {page, size, school_zip} = req.query;
  const {limit, offset} = getPagination(page, size);

  // Get results in ascending order of school name
  const ordering = [['School_Name', 'ASC']];

  SchoolRecords.findAndCountAll({ 
    where: { Zip: school_zip }, order: ordering, limit, offset })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving records."
    });
  });
};

// find single record with school id
exports.findOne = (req, res) => {
    const school_id = req.params.school_id;

    SchoolRecords.findByPk(school_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving school record with id=" + school_id
        });
      });
};

exports.findAllNonProfits = (req, res) => {
  const { page, size, np_name } = req.query;
  var condition = np_name ? { 
                    np_name: { [Op.like]: `%${np_name}%` } 
                  } : null;
  
  const {limit, offset } = getPagination(page, size);

  // Get results in ascending order of non-profit name
  const ordering = [['np_name', 'ASC']];

  NpRecords.findAndCountAll({ where: condition, order: ordering, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving records."
      });
    });
};