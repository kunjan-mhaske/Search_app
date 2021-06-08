import http from "../http-common";

class RecordDataService {
    findByName(param) {
        const {school_name} = param;
        return http.get(`/records/dynamic?school_name=${school_name}`);
    } 
}
export default new RecordDataService();