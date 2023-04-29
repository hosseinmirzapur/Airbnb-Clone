import { Listing } from "@prisma/client"

import prisma from "@/app/libs/prisma-db"

export const getListings = async () => {
	try {
		const listings: Listing[] = await prisma.listing.findMany({
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
