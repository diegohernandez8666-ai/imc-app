const express = require('express')
const router = express.Router()
const verificarToken = require('../middleware')

router.post('/', verificarToken, (req, res) => {

    const { peso, estatura } = req.body

    const imc = peso / (estatura * estatura)

    let clasificacion = ''

    if(imc < 18.5) clasificacion = 'Bajo peso'
    else if(imc < 25) clasificacion = 'Normal'
    else if(imc < 30) clasificacion = 'Sobrepeso'
    else clasificacion = 'Obesidad'

    res.json({
        imc: imc.toFixed(2),
        clasificacion
    })
})

module.exports = router