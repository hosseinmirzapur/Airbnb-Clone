import { getCurrentUser } from "../actions/getCurrentUser"
import { getReservation } from "../actions/getReservations"
import EmptyListing from "../components/EmptyListing"
import ReservationsClient from "./ReservationsClient"

const ReservationPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return (
			<EmptyListing
				title="Unauthorized Access"
				subtitle="Please login to view your reservations"
			/>
		)
	}

	const reservations = await getReservation({
		authorId: currentUser.id,
	})

	if (reservations.length === 0) {
		return (
			<EmptyListing
				title="No Reservations"
				subtitle="Looks like you don't have any reservations yet"
			/>
		)
	}

	return (
		<ReservationsClient reservations={reservations} currentUser={currentUser} />
	)
}

export default ReservationPage
