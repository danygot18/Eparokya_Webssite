const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { registerUser, LoginUser, Logout, ForgotPassword, ResetPassword, Profile, updatePassword, UpdateProfile,
    AllUsers, getUserDetails, deleteUser, updateUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', LoginUser);
router.get('/logout', Logout);
router.get('/profile', isAuthenticatedUser, Profile);

router.post('/password/forgot', ForgotPassword);
router.put('/password/reset/:token', ResetPassword);
router.put('/password/update', isAuthenticatedUser, updatePassword);
router.put('/profile/update', upload.single("avatar"), isAuthenticatedUser, UpdateProfile)

router.get('/admin/users', isAuthenticatedUser, authorizeRoles("admin"), AllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails).delete(isAuthenticatedUser,authorizeRoles("admin"), deleteUser).put(isAuthenticatedUser,authorizeRoles("admin"), updateUser)

// router.put('/profile/update', UpdateProfile);



module.exports = router;