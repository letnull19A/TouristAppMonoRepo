import { TTour } from '@entities'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useNavigate } from 'react-router-dom'

type TTourDataTableProps = {
	selected: Array<TTour>
	setSelected: (value: Array<TTour>) => void
	data: Array<TTour>
}

export const TourDataTable = (props: TTourDataTableProps) => {
	const { selected, setSelected, data } = props

	const navigate = useNavigate()

	return (
		<DataTable
			stripedRows
			showGridlines={false}
			value={data}
			editMode="row"
			dataKey="id"
			className="pt-4"
			selectionMode="checkbox"
			selection={selected}
			onSelectionChange={(e) => setSelected(e.value)}
			tableStyle={{ minWidth: '50rem' }}
		>
			<Column
				selectionMode="multiple"
				headerStyle={{ width: '3rem' }}
			/>
			<Column
				sortable
				field="name"
				header="Название"
				style={{ width: '20%' }}
			/>
			<Column
				sortable
				field="description"
				header="Описание"
				style={{ width: '30%' }}
			/>
			<Column
				sortable
				field="country.name"
				header="Страна"
				style={{ width: '20%' }}
			/>
			<Column
				sortable
				field="city.name"
				header="Город"
				style={{ width: '40%' }}
			/>
			<Column
				header="Действия"
				body={(data) => (
					<Button
						onClick={() => {
							navigate(`/tour/${data.id}/edit`)
						}}
						label="Редактировать"
						link
					/>
				)}
				headerStyle={{ width: '10%', minWidth: '8rem' }}
				bodyStyle={{ textAlign: 'center' }}
			></Column>
		</DataTable>
	)
}
