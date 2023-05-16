import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prisma-db"

interface IParams {
	listingId?: string
}

export const DELETE = async (
	request: Request,
	{ params }: { params: IParams },
) => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const { listingId } = params

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID")
	}

	try {
		await prisma.listing.deleteMany({
			where: {
				id: listingId,
				userId: currentUser.id,
			},
		})

		return NextResponse.json({
			success: true,
		})
	} catch (error: any) {
		throw new Error(error)
	}
}
