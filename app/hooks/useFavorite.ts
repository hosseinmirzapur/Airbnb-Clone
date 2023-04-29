import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"
import { SafeUser } from "../types"

import useLoginModal from "./useLoginModal"

interface IUseFavorite {
	listingId: string
	currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter()
	const loginModal = useLoginModal()

	const hasFavorited: boolean = useMemo(() => {
		const list = currentUser?.favoriteIds || []
		return list.includes(listingId)
	}, [currentUser, listingId])

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation()
			if (!currentUser) {
				toast.custom("Login to add listing to your favorite.", {
					duration: 3000,
				})
				return loginModal.onOpen()
			}

			try {
				let request

				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${listingId}`)
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`)
				}
				await request()
				router.refresh()
				toast.success(
					hasFavorited ? "Removed from favorites" : "Added to favorites",
				)
			} catch (error) {
				toast.error("Something went wrong")
			}
		},
		[currentUser, listingId, hasFavorited, loginModal, router],
	)

	return {
		hasFavorited,
		toggleFavorite,
	}
}

export default useFavorite
