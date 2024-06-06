import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { useEffect, useState } from 'react'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { Button } from 'primereact/button'
import { TUser } from '@entities'
import { userApi } from '@api'
import { AdminPageTitle } from '@widgets'
import { InputText } from 'primereact/inputtext'

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

	const textEditor = (options: ColumnEditorOptions) => {
		return (
			<InputText
				type="text"
				value={options.value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					options.editorCallback!(e.target.value)
				}
			/>
		)
	}

	const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const { newData } = e;

		console.log(newData);

		userApi.edit(newData as TUser).then(() => {
			console.log('Updated');
		})
		
    };

	return (
		<div className="px-4">
			<ConfirmDialog />
			<AdminPageTitle title="Список пользователей" toMain />
			<div className="card p-fluid">
				<DataTable
					value={users}
					editMode="row"
					dataKey="id"
					className="pt-4"
					selectionMode="checkbox"
					emptyMessage="Пользователей не найдено"
					selection={selected}
					onRowEditComplete={onRowEditComplete}
					onSelectionChange={(e) => setSelectedProducts(e.value)}
					tableStyle={{ minWidth: '50rem' }}
				>
					<Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
					<Column editor={textEditor} field="firstName" header="Имя" style={{ width: '30%' }} />
					<Column editor={textEditor} field="lastName" header="Фамилия" style={{ width: '30%' }} />
					<Column
						editor={textEditor}
						field="patronymic"
						header="Отчество"
						style={{ width: '30%' }}
					/>
					<Column editor={textEditor} field="email" header="E-Mail" style={{ width: '30%' }} />
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
