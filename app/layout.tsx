import { Nunito } from "next/font/google"
import Navbar from "./components/navbar/Navbar"
import "./globals.css"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./providers/ToasterProvider"
import LoginModal from "./components/modals/LoginModal"
import { getCurrentUser } from "./actions/getCurrentUser"
import RentModal from "./components/modals/RentModal"
import SearchModal from "./components/modals/SearchModal"

export const metadata = {
	title: "AirBnb",
	description:
		"This is an AirBnb clone built with Next.js developed by Hossein Mirzapur",
	keywords: "AirBnb, Hossein Mirzapur, Next.js",
	authors: [
		{
			name: "Hossein Mirzapur",
			url: "https://linkedin.com/in/hossein-mirzapur",
		},
	],
	creator: "Hossein Mirzapur",
	publisher: "Vercel",
	abstract: "This is an AirBnb clone built with the most modern technologies.",
}

const font = Nunito({
	subsets: ["latin"],
})

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const currentUser = await getCurrentUser()
	return (
		<html lang="en">
			<body className={font.className}>
				<ToasterProvider />
				<RegisterModal />
				<LoginModal />
				<RentModal />
				<SearchModal />
				<Navbar currentUser={currentUser} />
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	)
}
