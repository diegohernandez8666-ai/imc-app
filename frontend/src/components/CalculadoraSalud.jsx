import { useState } from 'react'

const Salud = () => {
  const [datos, setDatos] = useState({ peso: '', estatura: '', objetivo: '' })
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)

  // URL de tu backend (cámbiala por la de Render cuando despliegues)
  const API_URL = "https://imc-app-3ona.onrender.com/api/salud";

  const handleCalcular = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Obtener IMC y Categoría
      const resImc = await fetch(`${API_URL}/imc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          peso: parseFloat(datos.peso), 
          estatura: parseFloat(datos.estatura) 
        })
      })
      const dataImc = await resImc.json()

      // 2. Obtener Recomendaciones de la IA (Gemini)
      const resAi = await fetch(`${API_URL}/recomendaciones`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
          imc: dataImc.imc,       // El IMC que acabas de calcular
          peso: datos.peso,      // El peso que el backend espera para el prompt
          estatura: datos.estatura, // La estatura para el prompt
          objetivo: datos.objetivo 
      })
})
const dataAi = await resAi.json()

      setResultado({ ...dataImc, ...dataAi })
    } catch (error) {
      alert("Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Calculadora de Salud con IA</h2>
      <form onSubmit={handleCalcular}>
        <input 
          type="number" step="0.1" placeholder="Peso (kg)" 
          onChange={(e) => setDatos({...datos, peso: e.target.value})} required 
        />
        <input 
          type="number" step="0.01" placeholder="Estatura (m)" 
          onChange={(e) => setDatos({...datos, estatura: e.target.value})} required 
        />
        <select onChange={(e) => setDatos({...datos, objetivo: e.target.value})} required>
          <option value="">Selecciona objetivo</option>
          <option value="perder peso">Perder peso</option>
          <option value="ganar masa muscular">Ganar masa muscular</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Consultando IA...' : 'Calcular y Consultar'}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h3>Tu IMC: {resultado.imc}</h3>
          <p><strong>Categoría:</strong> {resultado.categoria}</p>
          <h4>Recomendaciones de Gemini:</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{resultado.recomendaciones}</p>
        </div>
      )}
    </div>
  )
}

export default Salud