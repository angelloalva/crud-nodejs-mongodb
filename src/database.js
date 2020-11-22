const mongoose = require('mongoose');
const {NOTES_YUKN_MONGODB_HOST,NOTES_YUKN_MONGODB_DATABASE}=process.env

mongoose.connect(`mongodb://${NOTES_YUKN_MONGODB_HOST}/${NOTES_YUKN_MONGODB_DATABASE}`, {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex:true

})
.then (db=>console.log("DB Conected!"))
.catch(err=>console.log(err));