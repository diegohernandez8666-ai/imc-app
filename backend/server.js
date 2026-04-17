import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai' // Cambio aquí

const app = express()

// Configuración de Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }) // Modelo rápido y gratuito

app.use(cors())
app.use(express.json())

// --- RUTA DE IMC (Se queda igual) ---
app.post('/api/salud/imc', (req, res) => {
  const { peso, estatura } = req.body
  if (!peso || !estatura) return res.status(400).json({ msg: 'Faltan datos' })

  const imc = peso / (estatura * estatura)
  let categoria = imc < 18.5 ? 'Bajo peso' : imc < 24.9 ? 'Peso normal' : imc < 29.9 ? 'Sobrepeso' : 'Obesidad'

  res.json({ imc: parseFloat(imc.toFixed(2)), categoria })
})

// --- NUEVA RUTA: RECOMENDACIONES CON GEMINI ---
app.post('/api/salud/recomendaciones', async (req, res) => {
  const { imc, objetivo } = req.body

  try {
    const prompt = `Actúa como un experto en fitness. Mi IMC es de ${imc} y mi objetivo es ${objetivo}. 
    Dame 3 ejercicios breves y consejos de salud de forma motivadora.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    res.json({ recomendaciones: text })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Error con el servicio de Gemini' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`))