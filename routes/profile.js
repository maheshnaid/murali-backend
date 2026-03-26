import express from "express";
import auth from '../middleware/userAuthentication.js'

const router = express.Router()

router.get('/profile', auth, (req, res) => {
    const {user} = req
    const userDetails = {id : user.id, name : user.name}
    res.status(200).json({userDetails : userDetails})
})

export default router