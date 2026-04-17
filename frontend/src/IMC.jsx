import { useState } from 'react'
import axios from 'axios'

function IMC(){

    const [peso, setPeso] = useState('')
    const [estatura, setEstatura] = useState('')
    const [resultado, setResultado] = useState(null)

    const calcular = async () => {

        const token = localStorage.getItem('token')

        const res = await axios.post(
            'http://localhost:3001/api/imc',
            {
                peso: parseFloat(peso),
                estatura: parseFloat(estatura)
            },
            {
                headers: {
                    Authorization: token
                }
            }
        )

        setResultado(res.data)
    }

    return(
        <div>
            <h2>Calculadora IMC</h2>

            <input
                placeholder="Peso"
                onChange={(e)=> setPeso(e.target.value)}
            />

            <input
                placeholder="Estatura"
                onChange={(e)=> setEstatura(e.target.value)}
            />

            <button onClick={calcular}>Calcular</button>

            {resultado && (
                <div>
                    <h3>IMC: {resultado.imc}</h3>
                    <p>{resultado.clasificacion}</p>
                </div>
            )}
        </div>
    )
}

export default IMC