
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ProductProps, getProducts } from '@/services/api'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Products() {

    const [products, setProducts] = useState<ProductProps[]>([])

    useEffect(() => {
        (async () => {
            const products = await getProducts()
            setProducts(products)
        })()
    }, [])


    return (
        <div>
            <Header />
            <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                <div className='flex items-center justify-between flex-row '>
                    <h2 className="mb-4 text-2xl font-semibold leadi">Pedidos</h2>
                    <Link href={'/products/create'} className='w-32 p-2 text-center bg-green-600 h-10 text-white rounded'>
                        Novo Produto
                    </Link>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full text-xs">
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">Descrição</th>
                                <th className="p-3">Preço</th>
                                <th className="p-3">Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 && products.map(product => (
                                <tr key={product.id} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                    <td className="p-3">
                                        <p>{product?.description}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>
                                            {product?.price} AO
                                        </p>
                                    </td>
                                    <td className="p-3">
                                        <p>{product?.category?.description} </p>
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


