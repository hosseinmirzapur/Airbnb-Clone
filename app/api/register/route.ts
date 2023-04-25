import bcrypt from "bcrypt"
import prisma from "@/app/libs/prisma-db"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
	const body = await request.json()
	const { email, password, name } = body

	const hashedPassword = await bcrypt.hash(password, 12)

	const user = await prisma.user.create({
		data: {
			email,
			hashedPassword,
			name,
		},
	})

	return NextResponse.json(user)
}
