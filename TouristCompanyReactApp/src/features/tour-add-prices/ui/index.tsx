import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type TTourAddPricesFormItemProps = {
	onChange: (index: number, price: number, days: number) => void
	onDelete: (id: string) => void
	data: TTourPrice
	index: number
}

const TourAddPricesFormItem = (props: TTourAddPricesFormItemProps) => {
	const { onDelete, data } = props
	// const [price, setPrice] = useState<number>(0)
	// const [days, setDays] = useState<number>(0)

	return (
		<div className="flex flex-row justify-content-between">
			<InputText
				type="number"
				className="col-5"
				defaultValue={data.price}
				// onChange={(e) => setPrice(Number.parseInt(e.target.value))}
			/>
			<InputText
				type="number"
				className="col-4"
				defaultValue={data.days}
				// onChange={(e) => setDays(Number.parseInt(e.target.value))}
			/>
			<Button
				className="col-2"
				severity="danger"
				label="Удалить"
				onClick={(e) => {
					e.preventDefault()
					onDelete(data.id)
				}}
			/>
		</div>
	)
}

type TTourPrice = {
	id: string
	price: number
	days: number
}

export const TourAddPricesForm = () => {
	const [list, setList] = useState<Array<TTourPrice>>([])

	const hanbleAddToList = () => {
		setList((prev) => [...prev, { id: uuidv4(), price: 0, days: 0 }])
	}

	const handleChange = (index: number, price: number, days: number) => {
		const origin = list
		origin[index].days = days
		origin[index].price = price

		setList(origin)
	}

	const handleDeleteFromList = (id: string) => {
		console.log(id)
		const origin = list
		const result = origin.filter((r) => r.id !== id)

		setList(result)
	}

	return (
		<div className="flex flex-column">
			<p>Добавление цен</p>
			<div className="flex flex-column gap-3 mb-3">
				{list.map((item, index) => (
					<TourAddPricesFormItem
						key={index}
						onChange={handleChange}
						onDelete={() => handleDeleteFromList(item.id)}
						data={item}
						index={index}
					/>
				))}
			</div>
			<Button
				label="Добавить"
				severity="info"
				onClick={(e) => {
					e.preventDefault()
					hanbleAddToList()
				}}
			/>
		</div>
	)
}
