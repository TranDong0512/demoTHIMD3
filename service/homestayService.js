const Connection = require('../model/connection')
Connection.connecting()

class HomestayService {
    getHomestay(){
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`select *from Homestay`,(err, homestay)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(homestay)
                }
            });
        });
    }

    saveHomestay(homestay){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject)=>{
            connection.query(`insert into homestay (numberOfBedroom, numberOfWC, description, idCity, name, price) 
                                    VALUES (${+homestay.bedroom}, ${+homestay.wc},"${homestay.description}",
                                            ${+homestay.city},"${homestay.name}",${+homestay.price})`,(err,homestay)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(homestay)
                }
            });
        });
    }
    findByID(id){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select *from homestay where id = ${id}`, (err, homestay) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(homestay)
                }
            });
        });
    }
    editProduct(homestay, id){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`update homestay set name= '${homestay.name}' ,price = ${homestay.price},description = '${homestay.description}',
                                    numberOfBedroom = ${homestay.bedroom}, numberOfWC = ${homestay.wc}, idCity = ${homestay.city}
                                    where id = ${id}`, (err, homestays) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(homestays)
                }
            });
        });
    }

    delete(id) {
        let connection = Connection.getConnection()
        return new Promise((resolve, reject) => {
            connection.query(` delete
                                          from homestay
                                          where id = ${id}`, (err, homestay) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Delete Success !!!');
                    resolve(homestay);
                }
            });
        })
    }
}

let homeStayService = new HomestayService()
module.exports = homeStayService;
// cay thế nhỉ