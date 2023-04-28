"use client"

import useRentModalModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"

enum STEPS {
	CATEGORY,
	LOCATION,
	INFO,
	IMAGES,
	DESCRIPTION,
	PRICE,
}

const RentModal = () => {
	// ** Variables
	const [step, setStep] = useState(STEPS.CATEGORY)
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: "",
			title: "",
			description: "",
		},
	})
	const category = watch("category")
	const location = watch("location")
	const guestCount = watch("guestCount")
	const roomCount = watch("roomCount")
	const bathroomCount = watch("bathroomCount")
	const imageSrc = watch("imageSrc")
	const price = watch("price")
	const title = watch("title")
	const description = watch("description")

	const Map = useMemo(
		() => dynamic(() => import("../Map"), { ssr: false }),
		[location],
	)

	// ** Functions

	// ** Variable Function
	const rentModal = useRentModalModal()

	const onBack = () => {
		setStep((value) => value - 1)
	}
	const onNext = () => {
		setStep((value) => value + 1)
	}

	const actionLabel = useMemo(
		() => (step === STEPS.PRICE ? "Create" : "Next"),
		[step],
	)

	const secondaryActionLabel = useMemo(
		() => (step === STEPS.CATEGORY ? undefined : "Back"),
		[step],
	)
	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldValidate: true,
			shouldTouch: true,
		})
	}

	// ** Modal Components
	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these describes your place the best?"
				subtitle="Pick a category"
			/>
			<div
				className="
				grid
				grid-cols-1
				md:grid-cols-2
				gap-3
				max-h-[50vh]
				overflow-y-auto
			">
				{categories.map((item, index) => (
					<div key={index} className="col-span-1">
						<CategoryInput
							onClick={(selectedCat) => setCustomValue("category", selectedCat)}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	)

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Pick a location"
				/>
				<CountrySelect
					onChange={(value) => setCustomValue("location", value)}
					value={location}
				/>
				<Map center={location?.latlng} />
			</div>
		)
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenities do you have?"
				/>
				<Counter
					title="Guests"
					subtitle="How many guests can you accommodate?"
					value={guestCount}
					onChange={(value) => setCustomValue("guestCount", value)}
				/>
				<hr />
				<Counter
					title="Rooms"
					subtitle="How many rooms do you have?"
					value={roomCount}
					onChange={(value) => setCustomValue("roomCount", value)}
				/>
				<hr />
				<Counter
					title="Bathrooms"
					subtitle="How many bathrooms do you have?"
					value={bathroomCount}
					onChange={(value) => setCustomValue("bathroomCount", value)}
				/>
			</div>
		)
	}
	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add a photo of your place"
					subtitle="Show guests what your place looks like!"
				/>
				<ImageUpload
					onChange={(value) => setCustomValue("imageSrc", value)}
					value={imageSrc}
				/>
			</div>
		)
	}

	return (
		<Modal
			onClose={rentModal.onClose}
			title="Airbnb your home"
			isOpen={rentModal.isOpen}
			body={bodyContent}
			onSubmit={onNext}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
		/>
	)
}

export default RentModal
