const http = require('http');
const url = require('url');
const router = require('./controller/router')
const notFoundRouting = require('./controller/handle/notFoundRouting')
function getUrl (req){
    const urlParse = url.parse(req.url,true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}
const sever = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    let trimPath = '';
    if(arrPath.length >2){
        trimPath = arrPath[1] + '/' + arrPath[2]
    }else {
        trimPath = arrPath[arrPath.length - 1];
    }
    let chosenRouter;
    if(typeof router[trimPath] === 'undefined'){
        chosenRouter = notFoundRouting.showNotFound
    }else {
        chosenRouter = router[trimPath]
    }
    chosenRouter(req,res, +arrPath[3]);
});
sever.listen(8080,()=>{
    console.log('sever running')
});