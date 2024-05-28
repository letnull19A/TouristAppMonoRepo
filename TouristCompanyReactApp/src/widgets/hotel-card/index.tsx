import { hotelApi, hotelTourApi } from '@api'
import { TTour } from '@entities'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Rating } from 'primereact/rating'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

type HotelCardProps = {
	tourData: TTour
}

export const HotelCard = (props: HotelCardProps) => {
	const { tourData } = props
	const { name, description, country, city, imageUrl } = tourData
	const [stars, setStars] = useState<number>(0)

	const navigate = useNavigate()

	const header = <img className='card__image' alt="Card" src={`${import.meta.env.VITE_API_URI}/bucket/${imageUrl}`} />
	const footer = (
		<>
			<Button outlined onClick={() => navigate(`tour/${tourData.id}/view`)} label="Перейти" style={{ width: '100%' }} />
		</>
	)

	useEffect(() => {
		const hotelTour = hotelTourApi.getAll(tourData.id)
		hotelTour.then((res) => {
			hotelApi.getById(res[0].hotelId).then((res1) => {
				setStars(res1.rating)
			})
		})
	}, [tourData.id])

	return (
		<div className="xl:col-3 lg:col-4 md:col-4 sm:col-6">
			<Card title={name} subTitle={`${country.name}, ${city.name}`} footer={footer} header={header}>
				<Rating value={stars} readOnly cancel={false} />
				<p className="mt-2 card__description">{description}</p>
			</Card>
		</div>
	)
}
