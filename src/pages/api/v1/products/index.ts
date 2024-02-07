import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            }
        })
        res.status(200).json(products);

    } catch (error) {
        res.status(400).json({ message: error })
    }
}