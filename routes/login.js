import express from 'express'
import bcrypt from 'bcrypt'
import database from '../database/databaseconnection.js'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/', async (req, res) => {
    const {name, password} = req.body
    const DB = database()
    try {
        const query = 'SELECT * FROM users WHERE username = ? OR email = ?'
        const [user] = await DB.query(query, [name, name])

        if(user.length === 0){
            return res.status(401).json({error: 'Invalid credantials'})
        }

        const comparePassword = await bcrypt.compare(password, user[0].userpassword)
        const userDetails = { id : user[0].id, name : user[0].username }
        if(comparePassword){
            const jwtToken = jwt.sign(userDetails, 'MY_SECREAT_KEY')
            return res.status(200).json({message : 'login success', jwt_token : jwtToken})
        }else{
            return res.status(401).json({error : 'password did not match'})
        }
        } catch (error) {
            return res.status(500).json({error : 'server error'})
        }

})

export default router