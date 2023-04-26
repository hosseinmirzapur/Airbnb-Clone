"use client"

import Image from "next/image"
import { SafeUser } from "../types"

interface AvatarProps {
	currentUser?: SafeUser | null
}

const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
	return (
		<Image
			src={currentUser?.image ? currentUser.image : "/images/placeholder.jpg"}
			alt="avatar"
			width={30}
			height={30}
			className="rounded-full"
		/>
	)
}

export default Avatar
