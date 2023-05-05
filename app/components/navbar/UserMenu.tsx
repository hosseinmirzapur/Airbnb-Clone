"use client"

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { signOut } from "next-auth/react"
import { SafeUser } from "@/app/types"
import useRentModalModal from "@/app/hooks/useRentModal"
import { useRouter } from "next/navigation"

interface UserMenuProps {
	currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const rentModal = useRentModalModal()
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()

	const toggleOpen = () => setIsOpen(!isOpen)
	const onRent = () => {
		if (!currentUser) {
			loginModal.onOpen()
			return false
		}
		rentModal.onOpen()
	}

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRent}
					className={`
						hidden
						md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                `}>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                     ">
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar currentUser={currentUser} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div
					className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm 
                    ">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									label="My Trips"
									onClick={() => router.push("/trips")}
								/>
								<MenuItem label="My Favorites" onClick={() => {}} />
								<MenuItem label="My Reservations" onClick={() => {}} />
								<MenuItem label="My Properties" onClick={() => {}} />
								<MenuItem label="Airbnb My Home" onClick={rentModal.onOpen} />
								<hr />
								<MenuItem label="Logout" onClick={signOut} />
							</>
						) : (
							<>
								<MenuItem label="Login" onClick={loginModal.onOpen} />
								<MenuItem label="Sign Up" onClick={registerModal.onOpen} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default UserMenu
