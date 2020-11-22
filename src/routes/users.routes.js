const {renderRegisterForm,
       Register,
       renderLoginForm,
       Login,
       Logout,
       Profile,updateUser
        } =require('../controllers/users.controller');
const {Router} = require('express');
const router = Router(); 
const{isAuthenticated} = require('../helpers/auth');


router.get('/users/register',renderRegisterForm);
router.post('/users/register',Register);

router.get('/users/login',renderLoginForm);
router.post('/users/login',Login);

router.get('/users/logout',isAuthenticated,Logout);

router.get('/users/profile/:id',isAuthenticated,Profile);
router.put('/users/profile/:id',isAuthenticated,updateUser);
module.exports=router;
