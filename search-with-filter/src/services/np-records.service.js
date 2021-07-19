import http from "../http-common";

class RecordDataService{
    findByName(params){
        const {np_name, size, page} = params;
        return http.get(`/records/non-profits?np_name=${np_name}&size=${size}&page=${page}`);
    }

    // findByFilter(params){
    //     const { np_name, size, page } = params;
    //     return http.get(`/records/non-profits?np_name=${np_name}&size=${size}&page=${page}`);
    // }
}

export default new RecordDataService();