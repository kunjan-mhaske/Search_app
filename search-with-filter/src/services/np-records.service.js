import http from "../http-common";

class RecordDataService{
    findByName(params){
        const {np_name, size, page} = params;
        return http.get(`/records/non-profits?np_name=${np_name}&size=${size}&page=${page}`);
    }

    getFilters(params){
        const { filter_name } = params;
        return http.get(`/records/non-profits/filters?filter_name=${filter_name}`);
    }
}

export default new RecordDataService();