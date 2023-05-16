import EmptyListing from "../components/EmptyListing"

import { getCurrentUser } from "../actions/getCurrentUser"

import PropertiesClient from "./PropertiesClient"
import { getListings } from "../actions/getListings"

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <EmptyListing title="Unauthorized" subtitle="Please Login" />
	}

	const listings = await getListings({ userId: currentUser.id })

	if (listings.length === 0) {
		return (
			<EmptyListing
				title="No properties Found"
				subtitle="Looks like you have no properties..."
			/>
		)
	}
	return (
		<>
			<PropertiesClient listings={listings} currentUser={currentUser} />
		</>
	)
}

export default PropertiesPage
