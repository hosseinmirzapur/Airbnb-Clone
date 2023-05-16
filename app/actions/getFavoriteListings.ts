import prisma from "@/app/libs/prisma-db"
import { getCurrentUser } from "./getCurrentUser"

export const getFavoriteListings = async () => {
	try {
		const currentUser = await getCurrentUser()
		if (!currentUser) {
			return []
		}

		const favorites = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.favoriteIds || [])],
				},
			},
		})

		const safeFavorites = favorites.map((favorite) => {
			return {
				...favorite,
				createdAt: favorite.createdAt.toISOString(),
			}
		})

		return safeFavorites
	} catch (error: any) {
		throw new Error(error)
	}
}
