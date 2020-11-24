const {format}=require('timeago.js');
const helpers ={};


helpers.timeago=(timestamp)=>{
    return format(timestamp);
    
};
helpers.isAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        
        return next();
    }
    req.flash('error_msg','No autorizado!');
    res.redirect('/users/login');
};

module.exports=helpers;