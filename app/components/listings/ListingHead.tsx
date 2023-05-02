import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import Heading from "../Heading"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingHeadProps {
	title: string
	imageSrc: string
	locationValue: string
	id: string
	currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
	id,
	imageSrc,
	locationValue,
	title,
	currentUser,
}) => {
	const { getByValue } = useCountries()

	const location = getByValue(locationValue)

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div
				className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                ">
				<Image
					alt="listing"
					src={imageSrc}
					fill
					className="w-full h-full object-cover"
				/>
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	)
}

export default ListingHead
