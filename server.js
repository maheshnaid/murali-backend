import express from 'express'
import cors from 'cors'
import loginRoute from './routes/login.js'
import profileRoute from './routes/profile.js'
import registerRoute from './routes/register.js'

const app = express();
app.use(express.json());
app.use(cors());


app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/profile', profileRoute)


app.get('/', (req, res) => {
  res.send("Backend is working")
})

const PORT = process.env.PORT || 7000

app.listen(PORT, "0.0.0.0", () => {
  console.log('server is running on port', PORT)
})