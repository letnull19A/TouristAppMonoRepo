import { TCity } from '@entities'
import { useEffect, useState } from 'react'
import { cityApi } from '@api'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

type TCityDropdownProps = {
	defaultValue?: TCity
	onChange?: (e: DropdownChangeEvent) => void
}

export const CityDropdown = (props: TCityDropdownProps) => {
	const { onChange, defaultValue } = props
	const [cities, setCities] = useState<Array<TCity>>([])
	const [selectedCity, setSelectedCity] = useState<TCity | null>(null)

	useEffect(() => {
		cityApi.getAll().then((res) => setCities(res))
		setSelectedCity(defaultValue ?? null)
	}, [defaultValue])

	return (
		<Dropdown
			value={selectedCity}
			onChange={(e) => {
				setSelectedCity(e.value)
				onChange?.(e)
			}}
			options={cities}
			optionLabel="name"
			placeholder="Выберете город"
			className="w-12"
		/>
	)
}
