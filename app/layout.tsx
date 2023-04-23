import { Nunito } from "next/font/google"
import Navbar from "./components/navbar/Navbar"
import "./globals.css"

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Navbar />
				{children}
			</body>
		</html>
	)
}
