const { sequelize } = require("../models");
const db = require("../models");

const FollowersControl = db.follower_app_control;
const Op = db.Sequelize.Op;

// KEEPING FOR FUTURE USE
// For default pagination part: if client dont provide paging parameters
// const getPagination = (page, size) => {
//   const limit = size ? +size : 10;
//   const offset = page ? page * limit : 0;
//   return {limit, offset};
// };

// function to map default response to desired structure
// const getPagingData = (data, page, limit) => {
//   const { count: totalItems, rows: records } = data;
//   const currentPage = page ? +page : 0;
//   const totalPages = Math.ceil(totalItems / limit);

//   return {totalItems, records, totalPages, currentPage};
// };


// Retrieve all followers and followed both in single query
exports.findAllFollowersAndFollowings = (req, res) => {
  const user_email = req.query.user_email;
  var condition = { 
        [Op.or]: [ {"followed_email": user_email}, {"follower_email": user_email}],
        display_followed: 1,
        display_follower: 1
                  };
  // Get results in descending order of datetime (lastest follower)
  const ordering = [['date_time', 'DESC']];

  FollowersControl.findAll({ where: condition, order: ordering })
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


// retrieve all records of followers without pagination
exports.findAllFollowers = (req, res) => {
  const user_email = req.query.user_email;
  var condition = { 
        followed_email: user_email,
        display_followed: 1,
        display_follower: 1
                  };
  // Get results in descending order of datetime (lastest follower)
  const ordering = [['date_time', 'DESC']];

  FollowersControl.findAll({ where: condition, order: ordering })
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

// retrieve all records of followings without pagination
exports.findAllFollowings = (req, res) => {
    const user_email = req.query.user_email;
    var condition = { 
          follower_email: user_email,
          display_followed: 1,
          display_follower: 1
                    };
    // Get results in descending order of datetime (lastest follower)
    const ordering = [['date_time', 'DESC']];

    FollowersControl.findAll({ where: condition, order: ordering })
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


// KEEPING FOR FUTURE USE
// retrieve all records of followers with pagination
// exports.findAllSchools = (req, res) => {
//   const {page, size, school_city, school_state} = req.query;
//   const {limit, offset} = getPagination(page, size);

//   if (school_state == " "){
//     var condition = school_city ? { 
//       City: { [Op.like]: `%${school_city}%` } 
//     } : null;      
//   }else{
//     var condition = school_city ? { 
//       State: { [Op.like]: `%${school_state}%` },
//       City: { [Op.like]: `%${school_city}%` } 
//     } : null;
//   }
//   // Get results in ascending order of school name
//   const ordering = [['School_Name', 'ASC']];

//   SchoolRecords.findAndCountAll({ 
//     where : condition,
//     order: ordering,
//     limit, offset
//   })
//   .then(data => {
//     const response = getPagingData(data, page, limit);
//     res.send(response);
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while retrieving records."
//     });
//   });
// };

