// module.exports = (sequelize, Sequelize) => {
//     const FollowersControl = sequelize.define("follower_app_control", {
//         // id: { type: Sequelize.BIGINT },
//         date_time: { type: Sequelize.DATE },
//         follower_email: { type: Sequelize.STRING },
//         follower_handle: { type: Sequelize.STRING },
//         follower_name: { type: Sequelize.STRING },
//         follower_image_url: { type: Sequelize.STRING(2000) },
//         follower_dob: { type: Sequelize.DATEONLY },
//         follower_dob_share: { type: Sequelize.BOOLEAN },
//         follower_collection_handle: { type: Sequelize.STRING },
//         display_follower: { type: Sequelize.BOOLEAN },

//         followed_email: { type: Sequelize.STRING },
//         followed_handle: { type: Sequelize.STRING },
//         followed_name: { type: Sequelize.STRING },
//         followed_image_url: { type: Sequelize.STRING(2000) },
//         followed_dob: { type: Sequelize.DATEONLY },
//         followed_dob_share: { type: Sequelize.BOOLEAN },
//         followed_collection_handle: { type: Sequelize.STRING },
//         display_followed: { type: Sequelize.BOOLEAN },
//     }, {
//         timestamps: false,
//         createdAt: false,
//         updatedAt: false,
//     } );
//     return FollowersControl;
    
// };

module.exports = (sequelize, Sequelize) => {
    const FollowersControl = sequelize.define("test_app_control", {
        // id: { type: Sequelize.BIGINT },
        date_time: { type: Sequelize.DATE },
        follower_email: { type: Sequelize.STRING },
        follower_handle: { type: Sequelize.STRING },
        follower_name: { type: Sequelize.STRING },
        follower_image_url: { type: Sequelize.STRING(2000) },
        follower_dob: { type: Sequelize.DATEONLY },
        follower_dob_share: { type: Sequelize.BOOLEAN },
        follower_collection_handle: { type: Sequelize.STRING },
        display_follower: { type: Sequelize.BOOLEAN },

        followed_email: { type: Sequelize.STRING },
        followed_handle: { type: Sequelize.STRING },
        followed_name: { type: Sequelize.STRING },
        followed_image_url: { type: Sequelize.STRING(2000) },
        followed_dob: { type: Sequelize.DATEONLY },
        followed_dob_share: { type: Sequelize.BOOLEAN },
        followed_collection_handle: { type: Sequelize.STRING },
        display_followed: { type: Sequelize.BOOLEAN },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        tableName: "test_app_control"
    } );
    return FollowersControl;
    
};