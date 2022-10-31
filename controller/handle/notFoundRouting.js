const fs = require('fs');

class NotFoundRouting {
    showNotFound(req,res){
        fs.readFile('./views/error/notfound.html',"utf-8",(err, dadaHtml)=>{
            if(err){
                console.log(err)
            }else {
                res.writeHead(200, 'text/html');
                res.write(dadaHtml);
                res.end();
            }
        })
    }
}
let notFoundRouting = new NotFoundRouting();
module.exports = notFoundRouting;