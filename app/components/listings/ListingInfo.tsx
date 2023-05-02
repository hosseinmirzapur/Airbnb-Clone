"use client"

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import Avatar from "../Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("../Map"), { ssr: false })

interface ListingInfoProps {
	user: SafeUser
	category?: {
		icon: IconType
		label: string
		description: string
	}
	description: string
	roomCount: number
	bathroomCount: number
	guestCount: number
	locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
	bathroomCount,
	category,
	description,
	guestCount,
	locationValue,
	roomCount,
	user,
}) => {
	const countries = useCountries()

	const coordinates = countries.getByValue(locationValue)?.latlng

	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<div className="text-xl font-semibold flex flex-row items-center gap-2">
					<div>Hosted by {user?.name}</div>
					<Avatar currentUser={user} />
				</div>
				<div
					className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    font-light
                    text-neutral-500
                ">
					<div>
						{guestCount} {guestCount === 1 ? "guest" : "guests"}
					</div>
					<div>
						{roomCount} {roomCount === 1 ? "room" : "rooms"}
					</div>
					<div>
						{bathroomCount} {bathroomCount === 1 ? "bathroom" : "bathrooms"}
					</div>
				</div>
			</div>

			<hr />

			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}
			<hr />
			<div className="text-lg font-light text-neutral-500">{description}</div>
			<hr />
			<Map center={coordinates} />
		</div>
	)
}

export default ListingInfo
