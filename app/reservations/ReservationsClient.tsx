"use client"

import { SafeReservation, SafeUser } from "../types"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import Heading from "../components/Heading"
import Container from "../components/Container"
import ListingCard from "../components/listings/ListingCard"

interface ComponentProps {
	reservations: SafeReservation[]
	currentUser?: SafeUser | null
}

const ReservationsClient: React.FC<ComponentProps> = ({
	reservations,
	currentUser,
}) => {
	// ** Variables
	const router = useRouter()
	const [deletingId, setDeletingId] = useState("")

	// ** Functions
	const onCancel = useCallback(async (id: string) => {
		setDeletingId(id)
		await axios
			.delete(`/api/reservations/${id}`)
			.then(() => {
				toast.success("Reservation canceled")
				router.refresh()
			})
			.catch(() => {
				toast.error("Failed to cancel reservation")
			})
			.finally(() => {
				setDeletingId("")
			})
	}, [])

	return (
		<Container>
			<Heading title="Reservations" subtitle="Bookings on your properties" />
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
				{reservations.map((item, index) => (
					<ListingCard
						data={item.listing}
						key={index}
						reservation={item}
						actionId={item.id}
						onAction={onCancel}
						disabled={deletingId === item.id}
						actionLabel="Cancel guest reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default ReservationsClient
