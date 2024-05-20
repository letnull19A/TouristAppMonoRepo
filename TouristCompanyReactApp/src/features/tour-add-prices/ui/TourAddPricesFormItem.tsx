import { TAddPriceTour } from '@entities'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

type TTourAddPricesFormItemProps = {
	onPriceChange: (id: string, price: number) => void
	onDaysChange: (id: string, days: number) => void
	onDelete: (id: string) => void
	data: TAddPriceTour
	id: string
}

export const TourAddPricesFormItem = (props: TTourAddPricesFormItemProps) => {
	const { onDelete, data, id, onDaysChange, onPriceChange } = props

	return (
		<div className="flex flex-row justify-content-between">
			<InputText
				type="number"
				className="col-5"
				defaultValue={data.price}
				onChange={(e) => {
					onPriceChange(id, Number.parseInt(e.target.value))
				}}
			/>
			<InputText
				type="number"
				className="col-4"
				defaultValue={data.days}
				onChange={(e) => {
					onDaysChange(id, Number.parseInt(e.target.value))
				}}
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
