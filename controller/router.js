const HomestayRouting = require('./handle/homestayRouting')

const router = {
    'home' : HomestayRouting.showHome,
    'homestay/create': HomestayRouting.showFormCreate,
    'homestay/edit' : HomestayRouting.showFormEdit,
    'homestay/delete' : HomestayRouting.showFormDelete
}
module.exports = router;