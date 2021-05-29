import http from "../http-common";

class RecordDataService {
    // getAll(params){
    //     return http.get("/records", {params});
    // }
    // get(id){
    //     return http.get(`/records/${id}`);
    // }
    // create(data){
    //     return http.post("/records", data);
    // }
    // update(id, data){
    //     return http.put(`/records/${id}`, data);
    // }
    // delete(id){
    //     return http.delete(`/records/${id}`);
    // }
    // deleteAll(){
    //     return http.delete(`/records`);
    // }
    // findByName(name){
    //     return http.get(`/records?school_name=${name}`);
    // }
    findByName(params){
        const { school_name, size, page } = params;
        return http.get(`/records?school_name=${school_name}&size=${size}&page=${page}`);
    }
    findByCityState(params){
        const { school_city, school_state, size, page } = params;
        return http.get(`/records/Schools?school_city=${school_city}&school_state=${school_state}&size=${size}&page=${page}`);
    }
    findByZip(params){
        const { school_zip, size, page } = params;
        return http.get(`/records/SchoolsZip?school_zip=${school_zip}&size=${size}&page=${page}`);
    }
}

export default new RecordDataService();