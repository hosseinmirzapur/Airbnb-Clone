"use client"
import { Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"

import useCountries from "@/app/hooks/useCountries"
import { SafeListing, SafeUser } from "@/app/types"
import { useCallback, useMemo, useState } from "react"
import { format } from "date-fns"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingCardProps {
	data: SafeListing
	currentUser?: SafeUser | null
	reservation?: Reservation
	onAction?: (id: string) => void
	disabled?: boolean
	actionLabel?: string
	actionId?: string
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	currentUser,
	actionId = "",
	actionLabel,
	onAction,
	disabled,
	reservation,
}) => {
	// ** Variables
	const router = useRouter()
	const countries = useCountries()
	const location = countries.getByValue(data.locationValue)
	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice
		}
		return data.price
	}, [data.price, reservation])
	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null
		}
		const start = new Date(reservation.startDate)
		const end = new Date(reservation.endDate)

		return `${format(start, "PP")} - ${format(end, "PP")}`
	}, [reservation])

	// ** Function
	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()

			if (disabled) return

			onAction?.(actionId)
		},
		[onAction, actionId, disabled],
	)

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className={`
			col-span-1
			cursor-pointer
			group
		`}>
			<div className="flex flex-col gap-2 w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						fill
						src={data.imageSrc}
						alt={data.title}
						className="
							object-cover
							h-full
							w-full
							group-hover:scale-110
							transition
						"
					/>
					<div className="absolute top-3 right-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<div className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</div>
				<div className="font-white text-neutral-500">
					{reservationDate || data.category}
				</div>
				<div className="flex flex-row items-center gap-1">
					<div className="font-semibold">$ {price} </div>
					{!reservation && <div className="font-light">Per Night</div>}
				</div>
				{/* {onAction && actionLabel && <Button label={actionLabel} onClick={} disabled={disabled} small />} */}
			</div>
		</div>
	)
}

export default ListingCard
