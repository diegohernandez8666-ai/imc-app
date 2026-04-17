const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = []

router.post('/register', async (req, res) => {

    const { email, password } = req.body

    const hashed = await bcrypt.hash(password, 10)

    users.push({ email, password: hashed })

    res.json({ message: 'Usuario registrado' })
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    const user = users.find(u => u.email === email)

    if(!user){
        return res.status(400).json({ error: 'Usuario no existe' })
    }

    const valid = await bcrypt.compare(password, user.password)

    if(!valid){
        return res.status(400).json({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign({ email }, 'secreto')

    res.json({ token })
})

module.exports = router