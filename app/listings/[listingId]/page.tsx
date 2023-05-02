import { getListingById } from "@/app/actions/getListingById"
import EmptyListing from "@/app/components/EmptyListing"
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import ListingClient from "./ListingClient"

interface IParams {
	listingId: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const listing = await getListingById(params)
	const currentUser = await getCurrentUser()

	if (!listing) {
		return <EmptyListing />
	}

	return (
		<>
			<ListingClient listing={listing} currentUser={currentUser} />
		</>
	)
}

export default ListingPage
