import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { useState } from 'react'
import { Button } from 'primereact/button'
import { TAttraction } from '@entities'
import { AttractionDataTable } from '@features'
import { attractionApi } from '@api'
import { AdminPageTitle } from '@widgets'

export const AttractionList = () => {
	const [selected, setSelectedProducts] = useState<Array<TAttraction>>([])

	const confirm2 = () => {
		confirmDialog({
			message: `Вы действительно хотите удалить ${selected.length} записей?`,
			header: 'Подтверждение действий',
			icon: 'pi pi-info-circle',
			defaultFocus: 'reject',
			acceptClassName: 'p-button-danger',
			rejectLabel: 'Нет',
			acceptLabel: 'Да',
			accept: () =>
				selected.forEach(async (attraction) => {
					attractionApi.delete(attraction.id)
				})
		})
	}

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список достопримечательностей" toMain />
			<div className="card p-fluid">
				<AttractionDataTable
					selected={selected}
					setSelected={setSelectedProducts}
				/>
				<div className="col-2">
					<Button
						label={`Удалить (${selected.length})`}
						severity="danger"
						disabled={selected.length === 0}
						onClick={() => confirm2()}
					/>
				</div>
			</div>
		</div>
	)
}
