import { getListingById } from "@/app/actions/getListingById"
import EmptyListing from "@/app/components/EmptyListing"
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import ListingClient from "./ListingClient"
import { getReservation } from "@/app/actions/getReservations"

interface IParams {
	listingId: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params)
	const currentUser = await getCurrentUser()
	const reservations = await getReservation(params)

	if (!listing) {
		return <EmptyListing />
	}

	return (
		<>
			<ListingClient
				listing={listing}
				currentUser={currentUser}
				reservations={reservations}
			/>
		</>
	)
}

export default ListingPage
