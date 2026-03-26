import jwt from 'jsonwebtoken'

const userAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    try {
        if(token === undefined){
            return res.status(401).json({error : 'No Token Provided'})
        }else{
            const decode = jwt.verify(token, 'MY_SECREAT_KEY')
            req.user = decode
            next()
        }
    } catch (error) {
        return res.status(401).json({error : error})
    }
}

export default userAuth