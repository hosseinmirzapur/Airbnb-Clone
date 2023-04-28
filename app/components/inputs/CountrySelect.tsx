"use client"

import useCountries from "@/app/hooks/useCountries"

import Select from "react-select"

export type CountrySelectValue = {
	flag: string
	label: string
	latlng: number[]
	region: string
	value: string
}

interface CountrySelectProps {
	value?: CountrySelectValue
	onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
	const countries = useCountries()

	return (
		<div className="z-10">
			<Select
				placeholder="Select a country"
				isClearable
				options={countries.getAll()}
				value={value}
				onChange={(value) => onChange(value as CountrySelectValue)}
				formatOptionLabel={(option) => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.flag}</div>
						<div>
							{option.label},{" "}
							<span className="text-neutral-500 ml-1">{option.region}</span>
						</div>
					</div>
				)}
				classNames={{
					control: () => "p-3 border-2",
					input: () => "text-lg",
					option: () => "text-lg transition",
					menuList: () => "transition",
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: "black",
						primary25: "#ffe4e6",
					},
				})}
			/>
		</div>
	)
}

export default CountrySelect
