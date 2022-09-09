import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'



const Inicio = () => {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = 'http://localhost:4000/clientes'
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                
                setClientes(resultado)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerClientesAPI()
    }, [])

    const handleEliminar = async id => {
        const confirmar = confirm('¿Deseas eliminar este cliente?')

        if (confirmar) {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url, {
                    method: 'DELETE'
                })

                await respuesta.json()

                const arrayClientes = clientes.filter(cliente => cliente.id !== id)
                setClientes(arrayClientes)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3 text-xl text-pink-700 font-bold">Administra tus clientes</p>

            <table className='w-full mt-5 table-auto shadow bh-white'>

                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2 text-2xl'>Nombre</th>
                        <th className='p-2 text-2xl'>Contacto</th>
                        <th className='p-2 text-2xl'>Empresa</th>
                        <th className='p-2 text-2xl'>Acciones</th>
                    </tr>
                </thead>

                
                <tbody>
                    {clientes.map(cliente => (
                        <Cliente
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>

            </table>
           
        </>
  )
}

export default Inicio