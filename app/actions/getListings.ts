import { Listing } from "@prisma/client"

import prisma from "@/app/libs/prisma-db"

export interface IListingsParams {
	userId?: string
	guestCount?: number
	roomCount?: number
	bathroomCount?: number
	startDate?: string
	endDate?: string
	locationValue?: string
	category?: string
}

export const getListings = async (params: IListingsParams) => {
	try {
		const {
			userId,
			bathroomCount,
			category,
			endDate,
			guestCount,
			locationValue,
			roomCount,
			startDate,
		} = params

		let query: any = {}

		if (userId) {
			query.userId = userId
		}
		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount,
			}
		}
		if (category) {
			query.category = category
		}

		if (guestCount) {
			query.guestCount = {
				gte: +guestCount,
			}
		}
		if (roomCount) {
			query.roomCount = {
				gte: +roomCount,
			}
		}
		if (locationValue) {
			query.locationValue = locationValue
		}

		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: { gte: startDate },
								startDate: { lte: startDate },
							},
							{
								startDate: { lte: endDate },
								endDate: { gte: endDate },
							},
						],
					},
				},
			}
		}

		const listings: Listing[] = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: "desc",
			},
		})

		const safeListings = listings.map((listing) => {
			return {
				...listing,
				createdAt: listing.createdAt.toISOString(),
			}
		})
		return safeListings
	} catch (error: any) {
		throw new Error(error)
	}
}
