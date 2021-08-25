import http from "../http-common";

class RecordDataService {

    findAllFollowersFollowings(param){
        const { user_email } = param;
        return http.get(`/records/followersfollowings?user_email=${user_email}`);
    }

    findFollowers(param) {
        const {user_email} = param;
        return http.get(`/records/followers?user_email=${user_email}`);
    } 
    findFollowings(param) {
        const {user_email} = param;
        return http.get(`/records/followings?user_email=${user_email}`);
    } 
}
export default new RecordDataService();