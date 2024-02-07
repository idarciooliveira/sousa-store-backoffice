import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs'

type RequestProps = NextApiRequest & {
    email: string
    password: string
    name: string
    phoneNumber: string
    isAdmin?: boolean
}

export default async function handler(req: RequestProps, res: NextApiResponse<any>) {
    try {

        const { password, email } = req.body

        if (await prisma.user.findFirst({
            where: {
                email
            }
        })) {
            return res.status(400).json({ message: 'Email ja existe' })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                ...req.body,
                password: hashPassword
            }
        })



        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({ message: error })
    }
}