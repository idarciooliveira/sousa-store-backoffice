import Footer from '@/components/footer'
import Header from '@/components/header'
import { CategoryProps, createProduct, getCategories } from '@/services/api'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Input = {
    description: string
    categoryId: string
    imageUrl: string
    price: number
}
export default function Product() {

    const { register, reset, handleSubmit } = useForm<Input>()

    const [categories, setCategory] = useState<CategoryProps[]>([])

    useEffect(() => {
        (async () => {
            const categories = await getCategories()
            setCategory(categories)
        })()
    }, [])

    async function handleOnSubmit(values: Input) {
        const response = await createProduct(values)
        if (!response) return toast.error('Ocorreu um erro')
        reset()
        return toast.success('Produto Cadastrado')
    }

    return (
        <>
            <Header />
            <div className="flex flex-col container mx-auto mt-4 p-6 rounded-md bg-gray-100 text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-xl font-bold">Cadastrar Produto</h1>
                </div>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Descrição</label>
                            <input required {...register('description')} type="text" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="price" className="text-sm">Preço</label>
                            </div>
                            <input required {...register('price')} type="number" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="category" className="text-sm">Category</label>
                            </div>
                            <select required {...register('categoryId')} className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" >
                                {categories.length > 0 && categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.description}
                                    </option>

                                )
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm">URL da Imagem</label>
                            <input required {...register('imageUrl')} type="text" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-amber-600 text-gray-50">
                                Cadastrar
                            </button>
                        </div>
                        <div>
                            <Link href={'/products'} className="w-full px-8 py-3 font-semibold rounded-md bg-white text-green-600 border-green-600">
                                Cancelar
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}
