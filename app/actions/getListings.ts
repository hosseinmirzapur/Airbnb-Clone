import { Listing } from "@prisma/client"

import prisma from "@/app/libs/prisma-db"

export interface IListingsParams {
	userId?: string
}

export const getListings = async (params: IListingsParams) => {
	try {
		const { userId } = params

		let query: any = {}

		if (userId) {
			query.userId = userId
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
