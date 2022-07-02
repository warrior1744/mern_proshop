import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { //decode using jwt.verify()
        expiresIn: '30d'
    })
}

export default generateToken