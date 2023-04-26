"use client"

import axios from "axios"
import { signIn } from "next-auth/react"
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
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"

const LoginModal = () => {
	// ** Variables
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true)
		try {
			const response = await signIn("credentials", {
				...data,
				redirect: false,
			})
			if (response?.ok) {
				toast.success("Login successful")
				router.refresh()
				loginModal.onClose()
			}
			if (response?.error) {
				toast.error(response.error)
			}
		} catch (error) {
			toast.error("Something went wrong, please try again")
		}
		setIsLoading(false)
	}

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subtitle="Login to your account" />
			<Input
				id="email"
				label="Email"
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
				disabled={isLoading}
			/>
			<Button
				label="Continue with Github"
				icon={AiFillGithub}
				outline
				onClick={async () => {
					setIsLoading(true)
					await signIn("github")
				}}
				disabled={isLoading}
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
			title="Login"
			isOpen={loginModal.isOpen}
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModal
