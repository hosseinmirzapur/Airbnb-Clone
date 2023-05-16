import { getCurrentUser } from "../actions/getCurrentUser"
import { getFavoriteListings } from "../actions/getFavoriteListings"
import EmptyListing from "../components/EmptyListing"
import FavoritesClient from "./FavoritesClient"

const FavoritesPage = async () => {
	const currentUser = await getCurrentUser()
	const listings = await getFavoriteListings()

	if (!currentUser) {
		return (
			<EmptyListing
				title="Unauthorized Access"
				subtitle="Login to view favorites"
			/>
		)
	}

	if (listings.length === 0) {
		return (
			<EmptyListing
				title="No Favorites"
				subtitle="Looks like you haven't liked any properties yet"
			/>
		)
	}

	return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default FavoritesPage
