import EmptyListing from "../components/EmptyListing"

import { getCurrentUser } from "../actions/getCurrentUser"
import { getReservation } from "../actions/getReservations"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return <EmptyListing title="Unauthorized" subtitle="Please Login" />
	}

	const reservations = await getReservation({
		userId: currentUser.id,
	})

	if (reservations.length === 0) {
		return (
			<EmptyListing
				title="No Trips Found"
				subtitle="Looks like there's no reservation here..."
			/>
		)
	}
	return (
		<>
			<TripsClient reservations={reservations} currentUser={currentUser} />
		</>
	)
}

export default TripsPage
