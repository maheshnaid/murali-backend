import express, { json } from 'express'
import cors from 'cors'
import loginRoute from './routes/login.js'
import profileRoute from './routes/profile.js'
import registerRoute from './routes/register.js'



const app = express();
app.use(express.json())
app.use(cors())


///User Register API
app.post('/register', registerRoute)


///User Login API
app.post('/login', loginRoute)


///Get User Profile API
app.get('/profile', profileRoute)


///Serever Running PORT
app.listen(7000, () => {
  console.log('server is running on port 7000')
})