import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config() // Aseguramos que se carguen las variables

const app = express()

// VERIFICACIÓN CRUCIAL:
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: La API Key no se está leyendo de Render!");
}

const genAI = new GoogleGenerativeAI("AIzaSyCfcv9JUygJ5JkWPCc_x0e59cwn8dcS3BU")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

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

const PORT = process.env.PORT || 10000; // Render usa el 10000 por defecto
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor activo en puerto ${PORT}`));