"use client"

import Container from "@/app/components/Container"
import ListingHead from "@/app/components/listings/ListingHead"
import ListingInfo from "@/app/components/listings/ListingInfo"
import { categories } from "@/app/components/navbar/Categories"
import useLoginModal from "@/app/hooks/useLoginModal"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingReservsation from "@/app/components/listings/ListingReservsation"
import { Range } from "react-date-range"

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
}

interface ListingClientIProps {
	listing: SafeListing & {
		user: SafeUser
	}
	currentUser?: SafeUser | null
	reservations?: Reservation[]
}

const ListingClient: React.FC<ListingClientIProps> = ({
	listing,
	reservations = [],
	currentUser,
}) => {
	// ** Variables
	const router = useRouter()
	const loginModal = useLoginModal()
	const disabledDates = useMemo(() => {
		let dates: Date[] = []
		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				end: new Date(reservation.endDate),
				start: new Date(reservation.startDate),
			})
			dates = [...dates, ...range]
		})

		return dates
	}, [reservations])

	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category)
	}, [listing.category])

	const [isLoading, setIsLoading] = useState(false)
	const [totalPrice, setTotalPrice] = useState(listing.price)
	const [dateRange, setDateRange] = useState<Range>(initialDateRange)

	// ** Handlers
	const onCreateReservation = useCallback(async () => {
		if (!currentUser) {
			return loginModal.onOpen()
		}
		setIsLoading(true)
		try {
			await axios.post("/api/reservation", {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing?.id,
			})
			toast.success("Listing Reserverd!")
			setDateRange(initialDateRange)
			router.refresh()
		} catch (error) {
			toast.error("Something went wrong!")
		} finally {
			setIsLoading(false)
		}
	}, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])

	useEffect(() => {
		if (dateRange.endDate && dateRange.startDate) {
			const dayCount = differenceInCalendarDays(
				dateRange.endDate,
				dateRange.startDate,
			)
			if (dayCount && listing.price) {
				setTotalPrice(listing.price * dayCount)
			} else {
				setTotalPrice(listing.price)
			}
		}
	}, [dateRange, listing.price])

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div
						className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    ">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							bathroomCount={listing.bathroomCount}
							guestCount={listing.guestCount}
							locationValue={listing.locationValue}
						/>
						<div
							className="
							order-first
							mb-10
							md:order-last
							md:col-span-3
						">
							<ListingReservsation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value: Range) => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabled={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default ListingClient
