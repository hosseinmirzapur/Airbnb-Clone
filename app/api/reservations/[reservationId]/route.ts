import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prisma-db"

interface IParams {
	reservationId?: string
}

export const DELETE = async (
	request: Request,
	{ params }: { params: IParams },
) => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return NextResponse.error()
	}

	const { reservationId } = params

	if (!reservationId || typeof reservationId !== "string") {
		throw new Error("Invalid reservation")
	}

	prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			AND: {
				userId: currentUser.id,
			},
		},
	})

	return NextResponse.json({ ok: true })
}
