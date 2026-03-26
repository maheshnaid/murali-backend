import express from 'express'
import cors from 'cors'
import loginRoute from './routes/login.js'
import profileRoute from './routes/profile.js'
import registerRoute from './routes/register.js'

const app = express();

app.use(express.json());
app.use(cors());


// app.post('/register', registerRoute)


// app.post('/login', loginRoute)


// app.get('/profile', profileRoute)


const PORT = process.env.PORT || 7000

app.get('/', (req, res) => {
  console.log("Root route hit")
  res.send("Backend is working")
})

app.listen(PORT, () => {
  console.log('server is running on port', PORT)
})