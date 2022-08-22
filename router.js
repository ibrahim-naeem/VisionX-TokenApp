const express = require('express');
const router = express.Router()
const pool = require('./db')
const jwt = require('jsonwebtoken')

//Testing API
router.post('/test', async(req, res)=>{
    try {
        //user_id generated automatically
        const{user_id, name, age, token} = req.body;

const data = await pool.query( "INSERT INTO user_details (name, age, token)VALUES ($1,$2,$3)", [name, age, token]);

res.json({message: 'Data added to database successfully!!'});
    } catch (error) {
        console.error(error)
    }
})

//Sign API
router.post("/signToken", async(req, res)=>{
    try {
        const {name, age} = req.body;
    const token = jwt.sign({name, age},"112233",{expiresIn:'30d'})

    
const data = await pool.query( "INSERT INTO user_details (name, age, token)VALUES ($1,$2,$3)", [name, age, token]);

    res.status(201).json({TaskName: 'Sign', message: 'Data added to database successfully!!', name, age, token})
    } catch (error) {
        console.error(error )
    }
})

//Get all users data
router.get('/getAllUserDetails', async(req, res)=>{
    try {
        const data = await pool.query("SELECT * FROM user_details");
        res.json(data.rows);
    } catch (error) {
        console.error(error)
    }
})

//Verify Token API
router.post("/verifyToken", (req, res)=>{
    const data = req.body.token;
    const decode = jwt.verify(data, "112233")
    res.status(202).json({TaskName : 'Verify', ...decode})
})

module.exports = router;

