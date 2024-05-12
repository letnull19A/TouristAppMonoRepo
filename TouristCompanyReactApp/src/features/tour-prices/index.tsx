import { tourPriceApi } from '@api'
import { Card } from 'primereact/card'
import { useEffect, useState } from 'react'
import { TTourPrice } from '@entities'

type TTourPricesProps = {
	tourId: string
}

export const TourPrices = (props: TTourPricesProps) => {
	const { tourId } = props

	const [prices, setPrices] = useState<Array<TTourPrice>>([])

	useEffect(() => {
		tourPriceApi.getAll(tourId).then(setPrices)
	}, [tourId])

	return (
		<Card title="Расценки на туры">
			<ul className='list-none p-0'>
				{prices.map((price) => (
					<li className='my-3'>Количество дней: {price.days} Стоимость: {price.price} Руб.</li>
				))}
			</ul>
		</Card>
	)
}
