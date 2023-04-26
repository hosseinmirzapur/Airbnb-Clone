import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/app/libs/prisma-db"

export const getSession = async () => {
	return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {
	try {
		const session = await getSession()
		if (!session?.user?.email) return null

		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
		})
		if (!user) return null
		return {
			...user,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
			emailVerified: user.emailVerified?.toISOString || null,
		}
	} catch (error: any) {
		return null
	}
}
