import http from "../http-common";

class RecordDataService {
    getAll(params){
        return http.get("/records", {params});
    }
    get(id){
        return http.get(`/records/${id}`);
    }
    // create(data){
    //     return http.post("/records", data);
    // }
    update(id, data){
        return http.put(`/records/${id}`, data);
    }
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
        return http.get("/records?", params);
    }
    findByCityState(city, state){
        return http.get(`/records/Schools?school_city=${city}&school_state=${state}`);
    }
    findByZip(zip){
        return http.get(`/records/SchoolsZip?school_zip=${zip}`);
    }
}

export default new RecordDataService();