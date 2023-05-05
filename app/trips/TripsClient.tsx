"use client"

import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface TripsClientProps {
	reservations: SafeReservation[]
	currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
	reservations,
	currentUser,
}) => {
	// ** Variables
	const router = useRouter()
	const [deletingId, setDeletingId] = useState("")

	// ** Handlers
	const onCancel = useCallback(
		async (id: string) => {
			setDeletingId(id)

			await axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					router.refresh()
					toast.success("Reservation cancelled!")
				})
				.catch(() => {
					toast.error("Something went wrong")
				})
				.finally(() => {
					setDeletingId("")
				})
		},
		[router],
	)
	return (
		<Container>
			<Heading
				title="Trips"
				subtitle="Where you've been and where you're going"
			/>

			<div
				className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
				{reservations.map((rsv, index) => (
					<ListingCard
						key={index}
						data={rsv.listing}
						reservation={rsv}
						actionId={rsv.id}
						onAction={onCancel}
						disabled={deletingId === rsv.id}
						actionLabel="Cancel reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default TripsClient
