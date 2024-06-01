import { orderApi } from '@api'
import { TOrder } from '@entities'
import { AdminPageTitle } from '@widgets'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toast } from 'primereact/toast'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Orders = () => {
	const navigate = useNavigate()
	const [orders, setOrders] = useState<Array<TOrder>>()

	const toast = useRef<Toast>(null)

	const renderStatus = (status: string) => {
		switch (status) {
			case 'AWAIT':
				return 'На рассмотрении'
			case 'ACCEPT':
				return 'Принята'
			case 'REJECT':
				return 'Отклонена'
			case 'CANCEL':
				return 'Отменена'
			default:
				return 'Неизвестно'
		}
	}

	const loadData = () => {
		orderApi.getAll().then((res) => {
			setOrders(
				res.map((item) => {
					return {
						...item,
						order: {
							...item.order,
							displayStatus: renderStatus(item.order.status),
							date: new Date(item.order.date).toLocaleDateString()
						},
						user: {
							...item.user,
							label:
								item.user.firstName +
								' ' +
								item.user.lastName +
								' ' +
								item.user.patronymic
						}
					}
				})
			)
		})
	}

	useEffect(() => {
		loadData()
	}, [])

	const handleAccept = (id: string) => {
		orderApi.accept(id).then((res) => {
			console.log(res)
			loadData()
		})
	}

	const handleCancel = (id: string) => {
		orderApi.cancel(id).then((res) => {
			console.log(res)
			loadData()
		})
	}

	const showInfo = () => {
		toast.current?.show({
			severity: 'info',
			summary: 'Инфо',
			detail: 'Изменён статус заявки',
			life: 3000
		})
	}

	return (
		<>
			<Toast position='bottom-right' ref={toast} />
			<AdminPageTitle title="Список заявок" />
			<DataTable
				paginator
				rowsPerPageOptions={[5, 10, 25, 50]}
				value={orders}
				editMode="row"
				rows={10}
				dataKey="id"
				className="pt-4"
				tableStyle={{ minWidth: '50rem' }}
			>
				<Column field="tour.name" header="Название" style={{ width: '20%' }} />
				<Column field="order.date" header="Дата" style={{ width: '10%' }} />
				<Column field="country.name" header="Страна" style={{ width: '10%' }} />
				<Column field="city.name" header="Город" style={{ width: '15%' }} />
				<Column
					field="user.label"
					header="Пользователь"
					style={{ width: '30%' }}
				/>
				<Column
					header="Тур"
					align={'center'}
					body={(data) => {
						return (
							<div className="flex flex-column gap-2">
								<label
									className="text-primary underline"
									style={{ cursor: 'pointer' }}
									onClick={() => {
										navigate(`/tour/${data.tour.id}/view`)
									}}
								>
									Перейти
								</label>
							</div>
						)
					}}
				/>
				<Column field="order.displayStatus" header="Статус" style={{ width: '30%' }} />
				<Column
					header="Действия"
					align={'center'}
					body={(data) => (
						<div className="flex flex-row gap-2">
							<Button
								label="Принять"
								disabled={data.order.status === 'ACCEPT'}
								onClick={() => {
									handleAccept(data.order.id)
									showInfo()
								}}
							/>
							<Button
								label="Отклонить"
								disabled={data.order.status === 'CANCEL'}
								onClick={() => {
									handleCancel(data.order.id)
									showInfo()
								}}
							/>
						</div>
					)}
					headerStyle={{ width: '10%', minWidth: '8rem' }}
					bodyStyle={{ textAlign: 'center' }}
				></Column>
			</DataTable>
		</>
	)
}
