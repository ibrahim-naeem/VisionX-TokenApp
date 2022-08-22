const express = require('express');
const router = express.Router()
const pool = require('./db')
const jwt = require('jsonwebtoken')



//Sign API
router.post("/signToken", async(req, res)=>{
    try {
        const {name, age} = req.body;
    const token = jwt.sign({name, age},"112233",{expiresIn:'30d'})

    
const data = await pool.query( "INSERT INTO user_info (token)VALUES ($1)", [token]);

    res.status(201).json({TaskName: 'Sign', message: 'Data added to database successfully!!', token})
    } catch (error) {
        console.error(error )
    }
})

//Get all users data
router.get('/users', async(req, res)=>{
    try {
        const data = await pool.query("SELECT * FROM user_info");
        res.json(data.rows);
    } catch (error) {
        console.error(error)
    }
})

//Get user full details
router.get('/user/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await pool.query("SELECT * FROM user_info WHERE user_id = $1", [id]);
        const token = data.rows[0].token;
        // res.json({token});
        const decode = jwt.verify(token, "112233")
        res.status(202).json({TaskName : 'Verify', ...decode})
    } catch (error) {
        console.error(error)
    }
})

//Verify Token API
// router.post("/verifyToken", (req, res)=>{
//     const data = req.body.token;
//     const decode = jwt.verify(data, "112233")
//     res.status(202).json({TaskName : 'Verify', ...decode})
// })




// //Testing API
// router.post('/test', async(req, res)=>{
//     try {
//         //user_id generated automatically
//         const{user_id, name, age, token} = req.body;

// const data = await pool.query( "INSERT INTO user_info (name, age, token)VALUES ($1,$2,$3)", [name, age, token]);

// res.json({message: 'Data added to database successfully!!'});
//     } catch (error) {
//         console.error(error)
//     }
// })
module.exports = router;

