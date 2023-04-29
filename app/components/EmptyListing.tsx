"use client"

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyListingProps {
	title?: string
	subtitle?: string
	showReset?: boolean
}

const EmptyListing: React.FC<EmptyListingProps> = ({
	showReset,
	subtitle = "Try changing or removing some of your filters",
	title = "No exact matches",
}) => {
	const router = useRouter()

	return (
		<div
			className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        ">
			<Heading title={title} subtitle={subtitle} center />

			<div className="w-48 mt-4">
				{showReset && (
					<Button
						label="Remove All Filters"
						onClick={() => router.push("/")}
						outline
					/>
				)}
			</div>
		</div>
	)
}

export default EmptyListing
