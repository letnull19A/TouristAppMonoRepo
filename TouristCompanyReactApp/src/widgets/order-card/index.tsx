import { hotelApi, hotelTourApi } from '@api'
import { TOrder } from '@entities'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating'
import { useEffect, useState } from 'react'
import './style.css'

type HotelCardProps = {
	orderData: TOrder
}

export const OrderCard = (props: HotelCardProps) => {
	const { orderData } = props
	const [stars, setStars] = useState<number>(0)

	const title = (
		<div
			style={{
				height: 70,
				width: '100%',
				textWrap: 'wrap',
				overflow: 'hidden'
			}}
		>
			{orderData.tour.name}
		</div>
	)

	const renderStatus = (status: string) => {
		switch (status) {
			case 'AWAIT':
				return (
					<div className="text-orange-300 font-semibold">
						<i className="pi pi-clock mr-2 font-semibold"></i>
						Заявка на рассмотрении
					</div>
				)
			case 'ACCEPT':
				return (
					<div className="text-green-300 font-semibold">
						<i className="pi pi-check mr-2 font-semibold"></i>Заявка принята
					</div>
				)
			case 'CANCEL':
				return (
					<div className="text-red-300 font-semibold">
						<i className="pi pi-times  mr-2 font-semibold"></i>
						Заявка отклонена
					</div>
				)
			default:
				return 'Неизвестно'
		}
	}

	const header = (
		<img
			className="card__image"
			alt="Card"
			src={`${import.meta.env.VITE_API_URI}/bucket/${orderData.tour.imageUrl}`}
		/>
	)
	const footer = (
		<>
			<span className="mt-3">{renderStatus(orderData.order.status)}</span>
		</>
	)

	useEffect(() => {
		const hotelTour = hotelTourApi.getAll(orderData.tour.id)

		hotelTour.then((res) => {
			hotelApi.getById(res[0].hotelId).then((res1) => {
				setStars(res1.rating)
			})
		})
	}, [orderData.tour.id])

	return (
		<div className="card-item" style={{ width: '100%' }}>
			<Card
				title={title}
				subTitle={`${orderData.country.name}, ${orderData.city.name}`}
				style={{ overflow: 'hidden' }}
				footer={footer}
				header={header}
				className="p-card-order"
			>
				<Rating value={stars} readOnly cancel={false} />
				<p className="mt-2 card__description">{orderData.tour.description}</p>
			</Card>
		</div>
	)
}
