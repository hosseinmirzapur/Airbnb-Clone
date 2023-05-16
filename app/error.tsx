"use client"

import { useEffect } from "react"
import EmptyListing from "./components/EmptyListing"

interface ErrorStateProps {
	error: Error
}

const Error: React.FC<ErrorStateProps> = ({ error }) => {
	useEffect(() => {
		console.log(error)
	}, [])
	return <EmptyListing subtitle="Something went wrong!" title="Uh oh" />
}

export default Error
