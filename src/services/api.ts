
const productUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/products`
const orderUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/orders`
const categoryUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/categories`
const userUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/users`


export async function getUsers(): Promise<any[]> {
    const response = await fetch(userUrl)
    const data = await response.json()
    return data
}

export type CategoryProps = {
    id: string
    description: string
}

export async function getCategories(): Promise<CategoryProps[]> {
    const response = await fetch(categoryUrl)
    const data = await response.json()
    return data
}

export async function createCategory(description: string): Promise<CategoryProps> {
    const response = await fetch(`${categoryUrl}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: description
        })
    })
    const data = await response.json()
    return data
}

export type ProductProps = {
    id: string
    price: number
    imageUrl: string
    description: string
    category: {
        description: string
    }
}

export async function getProducts(): Promise<ProductProps[]> {
    const response = await fetch(productUrl)
    const data = await response.json()
    return data
}

export type ProductCreateProps = {
    price: number
    imageUrl: string
    description: string
    categoryId: string
}


export async function createProduct(product: ProductCreateProps): Promise<ProductProps> {
    const response = await fetch(`${productUrl}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    const data = await response.json()
    return data
}

export async function getProductId(id: string): Promise<ProductProps> {
    const response = await fetch(`${productUrl}/${id}`)
    const data = await response.json()
    return data
}

export async function getUserOrders(): Promise<any[]> {
    const response = await fetch(`${orderUrl}/users`)
    const data = await response.json()
    return data
}

export async function getOrders(): Promise<any[]> {
    const response = await fetch(`${orderUrl}`)
    const data = await response.json()
    return data
}

export async function getOrderId(id: string): Promise<any[]> {
    const response = await fetch(`${orderUrl}/${id}`)
    const data = await response.json()
    return data
}