"use client"

import useRentModalModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, useForm } from "react-hook-form"

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
	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldValidate: true,
			shouldTouch: true,
		})
	}

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

	const footerContent = <div></div>

	return (
		<Modal
			onClose={rentModal.onClose}
			title="Airbnb your home"
			isOpen={rentModal.isOpen}
			body={bodyContent}
			footer={footerContent}
			onSubmit={rentModal.onClose}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
		/>
	)
}

export default RentModal
