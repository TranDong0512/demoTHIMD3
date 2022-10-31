const fs = require('fs')
const qs = require('qs')
const HomeStayService = require('../../service/homestayService')
const CityService = require('../../service/cityService')

class HomestayRouting {
    static async getHtmlHomestay(homestays, indexHtml) {
        let tbody = '';
        let index = 1;
        for (const homestay of homestays) {
            let city = await CityService.findByIDCity(homestay.idCity)
            tbody += `<tr>
            <th scope="row">${index++}</th>
            <td>${homestay.name}</td>
            <td>${city[0].name}</td>
            <td>${homestay.price}</td>
            <td><a href="homestay/edit/${homestay.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="homestay/delete/${homestay.id}" class="btn btn-danger">Delete</a></td>
             </tr>`
        }
        indexHtml = indexHtml.replace('{homestay}', tbody)
        return indexHtml;
    }

    showHome(req, res) {
        fs.readFile('./views/index.html', "utf-8", async (err, indextHtml) => {
            if (err) {
                console.log(err)
            } else {
                let homestays = await HomeStayService.getHomestay()
                indextHtml = await HomestayRouting.getHtmlHomestay(homestays, indextHtml);
                res.writeHead(200, 'text/html');
                res.write(indextHtml);
                res.end();
            }
        })
    }

    showFormCreate(req, res) {
        if (req.method === "GET") {
            fs.readFile('./views/homestay/create.html', "utf-8", async (err, createHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let city = await CityService.getCity()
                    let optionHtml = '';
                    for (let i = 0; i < city.length; i++) {
                        optionHtml += `<option value="${city[i].id}">${city[i].name}</option>`
                    }
                    createHtml = createHtml.replace('{city}', optionHtml);
                    res.writeHead(200, 'text/html')
                    res.write(createHtml);
                    res.end()
                }
            })
        } else {
            let homestayChunk = '';
            req.on('data', chunk => {
                homestayChunk += chunk;
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let homestay = qs.parse(homestayChunk)
                    await HomeStayService.saveHomestay(homestay)
                    res.writeHead(301, {'location': '/home'});
                    res.end()
                }
            })
        }
    }

    showFormEdit(req, res,id) {
        if (req.method === "GET") {
            fs.readFile('./views/homestay/edit.html',"utf-8",async (err,editHtml)=>{
                if(err){
                    console.log(err)
                }else {
                    let city = await CityService.getCity()
                    let optionHtml = '';
                    for (let i = 0; i < city.length; i++) {
                        optionHtml += `<option value="${city[i].id}">${city[i].name}</option>`
                    }
                    editHtml = editHtml.replace('{city}', optionHtml);
                    res.writeHead(200, 'text/html')
                    res.write(editHtml);
                    res.end()
                }
            })
        }else {
            let homestayChunk = '';
            req.on('data',chunk =>{
                homestayChunk += chunk;
            })
            req.on('end',async (err)=>{
                if(err){
                    console.log(err)
                }else {
                    let homestay = qs.parse(homestayChunk);
                    await HomeStayService.editProduct(homestay,id);
                    res.writeHead(301,{'location':'/home'})
                    res.end();
                }
            })
        }
    }

    showFormDelete(req,res,id){
        if(req.method === "GET"){
            fs.readFile('./views/homestay/delete.html',"utf-8",async (err,deleteHtml)=>{
                if(err){
                    console.log(err)
                }else {
                    let homestay = await HomeStayService.findByID(id)
                    deleteHtml = deleteHtml.replace('{name}',homestay[0].name)
                    res.writeHead(200, 'text/html')
                    res.write(deleteHtml);
                    res.end()
                }
            })
        }else {
            HomeStayService.delete(id).then(r=>{
                res.writeHead(301,{'location': '/home'})
                res.end()
            })
        }
    }
}

let homestayRouting = new HomestayRouting()
module.exports = homestayRouting