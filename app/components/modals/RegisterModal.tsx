"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"

const RegisterModal = () => {
	// ** Variables
	const registerModal = useRegisterModal()
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true)
		try {
			await axios.post("/api/register", data)
			registerModal.onClose()
		} catch (error) {
			toast.error("Something went wrong")
		}
		setIsLoading(false)
	}

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to Airbnb" subtitle="Create an account" />
			<Input
				id="email"
				label="Email"
				register={register}
				disabled={isLoading}
				errors={errors}
				required
			/>
			<Input
				id="name"
				label="Name"
				register={register}
				disabled={isLoading}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				register={register}
				disabled={isLoading}
				errors={errors}
				required
			/>
		</div>
	)

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				label="Continue with Google"
				outline
				icon={FcGoogle}
				onClick={async () => {
					setIsLoading(true)
					await signIn("google")
				}}
			/>
			<Button
				label="Continue with Github"
				icon={AiFillGithub}
				outline
				onClick={async () => {
					setIsLoading(true)
					await signIn("github")
				}}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row justify-center items-center gap-2">
					<div>Already have an account?</div>
					<div
						onClick={registerModal.onClose}
						className="
							text-neutral-800
							cursor-pointer
							hover:underline
						">
						Log in
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			title="Register"
			isOpen={registerModal.isOpen}
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModal
