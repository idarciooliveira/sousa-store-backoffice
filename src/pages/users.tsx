
import Footer from '@/components/footer'
import Header from '@/components/header'
import { getUsers } from '@/services/api'
import React, { useEffect, useState } from 'react'

export default function Categorias() {

    const [users, setUsers] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            const users = await getUsers()
            setUsers(users)
        })()
    }, [])


    return (
        <div>
            <Header />
            <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                <h2 className="mb-4 text-2xl font-semibold leadi">Usuarios</h2>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full text-xs">
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">Nome</th>
                                <th className="p-3">Contacto</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 && users.map(user => (
                                <tr key={user.id} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                    <td className="p-3">
                                        <p>{user?.name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user?.phoneNumber}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user?.email}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user?.isAdmin ? 'Administrador' : 'Cliente'}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}


