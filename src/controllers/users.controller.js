const userCtrl={};
const User = require('../models/User');
const passport = require('passport');
userCtrl.renderRegisterForm=(req,res)=>{
    res.render('users/register');
}

userCtrl.Register=async (req,res)=>{
    const {name,email,password,confirm_password}=req.body;
    const errors =[];
    if(password!=confirm_password){
        errors.push({text:'Las constraseñas no coinciden'});
        req.flash('error_msg',);

    }
    if(password.length<4){
        errors.push({text:'Las constraseñas deben tener mas de 4 caracteres'});
    }
    if (errors.length>0){
         res.render('users/register',{errors,name,email});
    } else{
        const emailUser= await User.findOne({email:email});
        if(emailUser){
            
            req.flash('error_msg','El correo ya esta en uso');
            res.redirect('/users/register')
        }
        else{
           const newUser=  new User({name,email,password});
           newUser.password= await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','Registrado!');
            res.redirect('/users/login');
        }
        
    }

   
}

userCtrl.renderLoginForm=(req,res)=>{
    res.render('users/login');
}

userCtrl.updateUser= async(req,res)=>{
    const {name,email,password}=req.body;
    pass= await Use.encryptPassword(password);
    await User.findByIdAndUpdate(req.params.id,{name,email,pass});
    req.flash('success_msg','Datos Actualizados!');
    res.redirect('/notes');
    console.log(req.params);
}

userCtrl.Profile=async (req,res)=>{
   
    const user =await User.findById(req.user.id);

  
    res.render('users/profile',user);
}
userCtrl.Login=passport.authenticate('local',{
    failureRedirect:'/users/login',
    successRedirect:'/notes',
    failureFlash:true
})

userCtrl.Logout=(req,res)=>{
    req.logout();
    req.flash('success_msg','Sesion Cerrada');
    res.redirect('/users/login');
}

module.exports = userCtrl;