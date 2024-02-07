import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestProps = NextApiRequest & {
    description: string
    imageUrl: string
    price: number
    categoryId: string
}

export default async function handler(req: RequestProps, res: NextApiResponse<any>) {
    try {

        const products = await prisma.product.create({
            data: {
                ...req.body,
                price: Number(req.body.price)
            }
        })
        res.status(200).json(products);

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error })
    }
}