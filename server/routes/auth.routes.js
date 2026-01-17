const express = require('express')
const { signUp, login, logout, updateUser, verifyEmail, getAllUsers } = require('../controllers/auth.controller')
const { protect, restrictTo } = require('../middleware/auth.middleware')
const { get } = require('mongoose')
const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.get('/', protect, restrictTo('admin'), getAllUsers)
authRouter.patch('/update/:id', protect, restrictTo('admin'), updateUser)
authRouter.get('/verify/:token', verifyEmail)


authRouter.get('/me', protect, (req, res) => {
    res.json({
        loggedIn: true,
        user: req.user
    });
});

// ეს არის route, გამოიყენება მომხმარებლის დასადგენად, დალოგინებულია თუ არა
// router.get('/me', protect, (req, res) => {
//     // protect middleware აწმყობს request-ს, გადაამოწმებს token-ს cookie-ში
//     // თუ token ვალიდურია, protect დაამატებს req.user-ს (DB-დან მომხმარებლის მონაცემები)
//     res.json({
//         loggedIn: true,  // მომხმარებელი დალოგინებულია
//         user: req.user   // req.user შეიცავს მომხმარებლის ობიექტს
//     })
// });

// 

module.exports = authRouter