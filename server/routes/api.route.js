/* This is importing the required modules. */
const express = require('express');
const router=express.Router();
const {register,updateUser,deleteUser}=require('../controller/users.controller')
const {readUsers,getUserById}=require('../view/users.view')
const {migrateDB}=require('../utils/db.migration')

router.get('/migrate-db',migrateDB);

router.post('/register',register);

router.get('/user/:user_id',getUserById);

router.post('/update-user',updateUser);

router.post('/delete-user',deleteUser);

router.get('/users',readUsers);


/* This is a middleware that is used to handle 404 errors. */
router.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        message: "Oops! URL not found, try something different!" + req.path
    })
});

/* Exporting the router module. */
module.exports=router;