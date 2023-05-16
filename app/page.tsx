import Container from "./components/Container"
import EmptyListing from "./components/EmptyListing"
import { IListingsParams, getListings } from "./actions/getListings"
import ListingCard from "./components/listings/ListingCard"
import { getCurrentUser } from "./actions/getCurrentUser"
import { SafeListing } from "./types"

const Home = async (searchParams: IListingsParams) => {
	const listings: SafeListing[] = await getListings(searchParams)

	const currentUser = await getCurrentUser()

	let isEmpty = listings.length === 0

	if (isEmpty) {
		return <EmptyListing showReset={isEmpty} />
	}

	return (
		<Container>
			<div
				className="
				pt-24
				grid
				grid-cols-1
				sm:grid-cols-2
				md:grid-cols-3
				lg:grid-cols-4
				xl:grid-cols-5
				2xl:grid-cols-6
				gap-8
			">
				{listings.map((listing, index) => (
					<ListingCard key={index} data={listing} currentUser={currentUser} />
				))}
			</div>
		</Container>
	)
}

export default Home
