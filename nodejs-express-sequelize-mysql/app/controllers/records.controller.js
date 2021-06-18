const db = require("../models");
const Records = db.records;
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

// create and save new record
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.school_name) {
//     res.status(400).send({
//       message: "School name can not be empty!"
//     });
//     return;
//   }

  // Create a record
  // const record = {
  //   URL : req.body.school_url,
  //   School_name: req.body.school_name,
  //   City: req.body.school_city,
  //   State: req.body.school_state,
  //   Zip: req.body.school_zip
  // };

  // Save a record in the database
//   Records.create(record)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the record."
//       });
//     });
// };

// retrieve all records based on the school name for Dynamic search bar
exports.findAllDynamic = (req, res) => {
  const school_name = req.query.school_name;
  var condition = school_name ? { 
                    School_name: { [Op.like]: `%${school_name}%` } 
                  } : null;
  // Get results in ascending order of school name
  const ordering = [['School_Name', 'ASC']];

  Records.findAll({ where: condition, order: ordering })
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
  
    Records.findAndCountAll({ where: condition, order: ordering, limit, offset })
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
    State: school_state,
    City: { [Op.like]: `%${school_city}%` } 
  } : null;

  // Get results in ascending order of school name
  const ordering = [['School_Name', 'ASC']];

  Records.findAndCountAll({ 
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

  Records.findAndCountAll({ 
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

    Records.findByPk(school_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving school record with id=" + school_id
        });
      });
};

// Update a record by the id in the request
// exports.update = (req, res) => {
//     const school_id = req.params.school_id;
//     Records.update(req.body, {
//       where: { School_id: school_id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Record was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update record with id=${school_id}. Maybe record was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating record with id=" + school_id
//         });
//       });
// };

// Delete a record with the specified id in the request
// exports.delete = (req, res) => {
//     const school_id = req.params.school_id;

//     Records.destroy({
//       where: { School_id: school_id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Record was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete record with id=${school_id}. Maybe record was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete record with id=" + school_id
//         });
//       });
// };

// Delete all records from the database.
// exports.deleteAll = (req, res) => {
//     Records.destroy({
//         where: {},
//         truncate: false
//       })
//         .then(nums => {
//           res.send({ message: `${nums} Records were deleted successfully!` });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all records."
//           });
//         });
// };
