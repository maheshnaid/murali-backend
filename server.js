import express, { json } from 'express'
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express();
app.use(json())
app.use(cors())

let database

const databaseConnection = async () => {
  try {
    database = await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'krishna@12311',
    database:'world'
  })
    app.listen(7000, () => {
    console.log('server is running at port 7000')
  })
  } catch (error) {
    console.log(`Database error ${error}`)
  }
}


databaseConnection();


///User Authentication
const userAuthentication = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  
  try {
    if(token === undefined){
    return res.status(401).json({message : 'No Token Provided'})
  }else{
    const decode = jwt.verify(token, 'MY_SECREAT_KEY')
    req.user = decode
    next();
  }
  } catch (error) {
    return res.status(401).json({message : error})
  }
}

///User Register API
app.post('/register', async (req, res) => {
  const {username, email, password} = req.body
  const userQuery = 'SELECT * FROM users WHERE email = ?'
  const [user] = await database.query(userQuery, email)
  const errors = {email_error:'', password_error: ''}

  if(user.length > 0){
    errors.email_error = 'Email Already Exists'
    return res.status(500).json({errors : errors})
  }


  const isValidEmail = email.includes('@gmail.com')

  if(!isValidEmail){
    errors.email_error = 'Invalid Email'
    return res.status(500).json({errors : errors})
  }else{
    if(password.length < 6){
      errors.password_error = 'Password to short'
      return res.status(500).json({errors : errors})
    }else{
      const cryptedPW = await bcrypt.hash(password, 10)
      const addUser = 'INSERT INTO users(username, email, userpassword) VALUES(?, ?, ?)'
      const values = [username, email, cryptedPW]
      await database.query(addUser, values)
      res.status(200).json({message : 'user registered successfully'})
    }
  }
})


///User Login API
app.post('/login', async (req, res) => {
  const { name, password } = req.body
  const findUser = 'SELECT * FROM users WHERE username = ? OR email = ?'
  const [user] = await database.query(findUser, [ name, name ])
  
  if(user.length === 0){
    return res.status(401).json({error: 'Invalid user credentials'})
  }
  
  const isPasswordCorrect = await bcrypt.compare(password, user[0].userpassword)

  const userDetails = { id : user[0].id, name : user[0].username}
  if(isPasswordCorrect){
    const token = jwt.sign(userDetails, 'MY_SECREAT_KEY')
    return res.status(200).json({message: 'user login success', jwt_token : token})
  }else{
    return res.status(500).json({error: 'password did not match'})
  }
})


///Get User Profile API
app.get('/profile', userAuthentication, async (req, res) => {
  const { user } = req
  const profileDetails = {id : user.id, name : user.name}
  res.status(200).json({userDetails : profileDetails})
})