import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useEffect, useState } from 'react'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { TUser } from '@entities'
import { userApi } from '@api'
import { AdminPageTitle } from '@widgets'

export const UserList = () => {
	const [users, setUsers] = useState<Array<TUser>>([])
	const [selected, setSelectedProducts] = useState<Array<TUser>>([])

	useEffect(() => {
		userApi.getAll().then(setUsers)
	}, [])

	const confirm2 = () => {
		confirmDialog({
			message: `Вы действительно хотите удалить ${selected.length} записей?`,
			header: 'Подтверждение действий',
			icon: 'pi pi-info-circle',
			defaultFocus: 'reject',
			acceptClassName: 'p-button-danger',
			rejectLabel: 'Нет',
			acceptLabel: 'Да'
		})
	}

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список пользователей" />
			<div className="card p-fluid">
				<DataTable
					value={users}
					editMode="row"
					dataKey="id"
					className="pt-4"
					selectionMode="checkbox"
					emptyMessage="Пользователей не найдено"
					selection={selected}
					onSelectionChange={(e) => setSelectedProducts(e.value)}
					tableStyle={{ minWidth: '50rem' }}
				>
					<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
					<Column field="firstName" header="Имя" style={{ width: '30%' }} />
					<Column field="lastName" header="Фамилия" style={{ width: '30%' }} />
					<Column field="email" header="E-Mail" style={{ width: '30%' }} />
					<Column
						header="Действия"
						rowEditor
						headerStyle={{ width: '10%', minWidth: '8rem' }}
						bodyStyle={{ textAlign: 'center' }}
					></Column>
				</DataTable>
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
