const Connection = require('../model/connection')
Connection.connecting();

class CityService{
    getCity(){
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`select *from City`,(err, city)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(city)
                }
            });
        });
    }

    findByIDCity(id){
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`select *from City where id = ${+id}`,(err, city)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(city)
                }
            });
        });
    }

}

let cityService = new CityService()
module.exports = cityService;