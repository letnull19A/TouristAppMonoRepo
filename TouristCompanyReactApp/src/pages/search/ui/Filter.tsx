import { CountryDropdown } from '@ui'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import {
	InputNumber,
	InputNumberValueChangeEvent
} from 'primereact/inputnumber'
import { Nullable } from 'primereact/ts-helpers'
import { useState } from 'react'

export const Filter = () => {
	const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null)
	const [value3, setValue3] = useState<number>(1)
	const [value1, setValue1] = useState<number>(1)

	return (
		<>
			<div className="flex flex-column lg:flex-row justify-content-between gap-3">
				<div className="flex flex-column gap-2 col-12 lg:col-3 p-0">
					<label>Город вылета</label>
					<Dropdown options={['Москва', 'Ульяновск', 'Санкт-Петербург']} />
				</div>
				<div className="flex flex-column gap-2">
					<label>Страна назначения</label>
					<CountryDropdown />
				</div>
				<div className="flex flex-column gap-2">
					<label>Дата вылета</label>
					<Calendar
						value={dates}
						onChange={(e) => setDates(e.value)}
						selectionMode="range"
						readOnlyInput
						hideOnRangeSelection
					/>
				</div>
				<div className='col-12 lg:col-4 p-0 flex flex-row gap-3'>
					<div className="flex flex-column gap-2 col-5 p-0">
						<label>Кол-во человек</label>
						<InputNumber
							value={value3}
							inputStyle={{ width: '100%' }}
							onValueChange={(e: InputNumberValueChangeEvent) =>
								setValue3(e.target.value ?? 0)
							}
							showButtons
							buttonLayout="horizontal"
							step={1}
							min={1}
							decrementButtonClassName="p-button-danger"
							incrementButtonClassName="p-button-success"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							mode="decimal"
							/>
					</div>
					<div className="flex flex-column gap-2 col-5 p-0">
						<label>Кол-во дней</label>
						<InputNumber
							value={value1}
							inputStyle={{ width: '100%' }}
							onValueChange={(e: InputNumberValueChangeEvent) =>
								setValue1(e.target.value ?? 0)
							}
							showButtons
							buttonLayout="horizontal"
							step={1}
							min={1}
							max={21}
							decrementButtonClassName="p-button-danger"
							incrementButtonClassName="p-button-success"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							mode="decimal"
						/>
					</div>
				</div>
			</div>
		</>
	)
}
