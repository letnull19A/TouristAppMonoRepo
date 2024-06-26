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
			<Button outlined onClick={() => navigate(`/tour/${tourData.id}/view`)} label="Перейти" style={{ width: '100%' }} />
		</>
	)

	const subTitle = (<p className='text-primary-400'>{country.name}, {city.name}</p>)

	useEffect(() => {
		const hotelTour = hotelTourApi.getAll(tourData.id)
		hotelTour.then((res) => {
			hotelApi.getById(res[0].hotelId).then((res1) => {
				setStars(res1.rating)
			})
		})
	}, [tourData.id])

	return (
		<div className="xl:col-3 lg:col-4 md:col-4 sm:col-6 p-0">
			<Card className='my-2 mx-2 tour-card text-primary-600' title={name} subTitle={subTitle} footer={footer} header={header}>
				<Rating value={stars} readOnly cancel={false} />
				<p className="mt-2 card__description text-primary-400">{description}</p>
			</Card>
		</div>
	)
}
