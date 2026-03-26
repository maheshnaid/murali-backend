import express from 'express'
import bcrypt from 'bcrypt'
import DB from '../database/databaseconnection.js'

const router = express.Router()

router.post('/', async (req, res) => {
    const { username, email, password } = req.body
    const database = DB()
    const isUserExists = 'SELECT * FROM users WHERE email = ?'
    const [allUsers] = await database.query(isUserExists, [email])
    const errors = {email_error : '', password_error : ''}
    if(allUsers.length > 0){
        errors.email_error = 'Email Already Exist'
        return res.status(500).json({errors : errors})
    }

    const isValidEmail = email.includes('@gmail.com')

    if(!isValidEmail){
        errors.email_error = 'Invalid Emai'
        return res.status(500).json({errors : errors})
    }else{
        if(password.length < 6){
            errors.password_error = 'Password too short'
            return res.status(500).json({errors : errors})
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const inserQuery = 'INSERT INTO users(username, email, userpassword) VALUES(?, ?, ?)'
            await database.query(inserQuery, [username, email, hashedPassword])
            res.status(200).json({message : 'user registered successfully'})
        }
    }
})

export default router