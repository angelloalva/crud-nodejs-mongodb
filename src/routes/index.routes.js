
const {renderIndex,renderAbout} =require('../controllers/index.controller');
const {Router} = require('express');
const router = Router();



app.get('/',renderIndex);

app.get('/about',renderAbout);
    
module.exports=router;
