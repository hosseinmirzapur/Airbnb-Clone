"use client"

import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeListing, SafeUser } from "../types"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface PropertiesClientProps {
	listings: SafeListing[]
	currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
	listings,
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
				.delete(`/api/listings/${id}`)
				.then(() => {
					router.refresh()
					toast.success("Listing deleted!")
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
			<Heading title="Properties" subtitle="List of your properties" />

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
				{listings.map((listing, index) => (
					<ListingCard
						key={index}
						data={listing}
						actionId={listing.id}
						onAction={onCancel}
						disabled={deletingId === listing.id}
						actionLabel="Delete Property"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}

export default PropertiesClient
