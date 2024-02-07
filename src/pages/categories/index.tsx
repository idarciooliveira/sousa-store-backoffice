
import Footer from '@/components/footer'
import Header from '@/components/header'
import { CategoryProps, getCategories } from '@/services/api'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Categorias() {

    const [categories, setCategories] = useState<CategoryProps[]>([])

    useEffect(() => {
        (async () => {
            const categories = await getCategories()
            setCategories(categories)
        })()
    }, [])


    return (
        <div>
            <Header />
            <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                <div className='flex items-center justify-between flex-row '>
                    <h2 className="mb-4 text-2xl font-semibold leadi">Categorias</h2>
                    <Link href={'/categories/create'} className='w-32 p-2 text-center bg-green-600 h-10 text-white rounded'>
                        Nova Categoria
                    </Link>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full text-xs">
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 && categories.map(product => (
                                <tr key={product.id} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                    <td className="p-3">
                                        <p>{product?.description}</p>
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


