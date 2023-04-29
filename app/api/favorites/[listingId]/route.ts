import prisma from "@/app/libs/prisma-db"
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { NextResponse, NextRequest } from "next/server"

interface IParams {
	listingId?: string
}

export const POST = async (
	request: Request,
	{ params }: { params: IParams },
) => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}
	const { listingId } = params

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid Id")
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])]

	favoriteIds.push(listingId)

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	})

	return NextResponse.json(user)
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

	if (!listingId) {
		throw new Error("Invalid Id")
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])]

	favoriteIds = favoriteIds.filter((id) => id !== listingId)

	const user = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	})

	return NextResponse.json(user)
}
