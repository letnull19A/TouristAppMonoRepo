import { ticketApi } from '@api'
import { SearchContext } from '@contexts'
import { TAirport } from '@entities'
import { CountryDropdown } from '@ui'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import {
	InputNumber,
	InputNumberValueChangeEvent
} from 'primereact/inputnumber'
import { Nullable } from 'primereact/ts-helpers'
import { useContext, useEffect, useState } from 'react'

type TAirportsDropdownProps = {
	defaultValue?: TAirport
	onChange?: (e: DropdownChangeEvent) => void
}

const AirportsDropdown = (props: TAirportsDropdownProps) => {
	const { onChange, defaultValue } = props

	const [airports, setAirports] = useState<Array<TAirport>>([])
	const [selected, setSelected] = useState<TAirport | null>(null)

	useEffect(() => {
		ticketApi.airports.getAll().then(setAirports)
		setSelected(defaultValue ?? null)
	}, [defaultValue])

	return (
		<Dropdown
			value={selected}
			onChange={(e) => {
				setSelected(e.target.value)
				onChange?.(e)
			}}
			options={airports}
			optionLabel="city"
			placeholder="Выберете аэропорт"
		/>
	)
}

export const Filter = () => {
	const [dates, setDates] = useState<Nullable<Date | null>>(null)
	const [humans, setHumans] = useState<number>(1)
	const [days, setDays] = useState<number>(1)

	const context = useContext(SearchContext)

	return (
		<div className="flex flex-column lg:flex-row align-items-end grid">
			<div className="flex flex-column gap-2 col-12 lg:col-2">
				<label>Город вылета</label>
				<AirportsDropdown
					onChange={(e) => {
						context.setAirportId(e.target.value)
					}}
				/>
			</div>
			<div className="flex flex-column gap-2 col-12 lg:col-2">
				<label>Страна</label>
				<CountryDropdown
					onChange={(e) => {
						context.setCountry(e.target.value)
					}}
				/>
			</div>
			<div className="flex flex-column gap-2 col-12 lg:col-2">
				<label>Дата вылета</label>
				<Calendar
					value={dates}
					onChange={(e) => setDates(e.value)}
					selectionMode="single"
					readOnlyInput
					hideOnRangeSelection
				/>
			</div>
			<div className="flex flex-column gap-2 col-12 lg:col-2">
				<label>Кол-во человек</label>
				<InputNumber
					value={humans}
					inputStyle={{ width: '100%' }}
					onValueChange={(e: InputNumberValueChangeEvent) =>
						setHumans(e.target.value ?? 0)
					}
					showButtons
					buttonLayout="horizontal"
					step={1}
					min={1}
					inputClassName="text-center"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
					mode="decimal"
				/>
			</div>
			<div className="flex flex-column gap-2 col-12 lg:col-2">
				<label>Кол-во дней</label>
				<InputNumber
					value={days}
					inputStyle={{ width: '100%' }}
					onValueChange={(e: InputNumberValueChangeEvent) =>
						setDays(e.target.value ?? 0)
					}
					showButtons
					buttonLayout="horizontal"
					step={1}
					min={1}
					max={90}
					inputClassName="text-center"
					incrementButtonIcon="pi pi-plus"
					decrementButtonIcon="pi pi-minus"
					mode="decimal"
				/>
			</div>
			<div className="col-12 lg:col-2">
				<Button className='w-full' label="Применить фильтр" />
			</div>
		</div>
	)
}
