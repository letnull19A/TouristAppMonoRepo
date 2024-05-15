import { THotel } from '@entities'
import { useEffect, useState } from 'react'
import { hotelApi } from '@api'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

type THotelDropdownProps = {
	defaultValue?: THotel
	onChange?: (e: DropdownChangeEvent) => void
}

export const HotelDropdown = (props: THotelDropdownProps) => {
	const { onChange, defaultValue } = props

	const [hotels, setHotels] = useState<Array<THotel>>([])
	const [selectedHotel, setSelectedHotel] = useState<THotel | null>(null)

	useEffect(() => {
		hotelApi.getAll().then(setHotels)
		setSelectedHotel(defaultValue ?? null)
	}, [defaultValue])

	return (
		<Dropdown
			value={selectedHotel}
			onChange={(e) => {
				setSelectedHotel(e.value as THotel)
				onChange?.(e)
			}}
			options={hotels}
			optionLabel="name"
			placeholder="Выберете отель"
			className="w-12"
		/>
	)
}
