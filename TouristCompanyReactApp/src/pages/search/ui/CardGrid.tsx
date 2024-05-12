import { TTour } from '@entities'
import { HotelCard } from '@widgets'

type TCardProps = {
	tours: Array<TTour>
}

export const CardGrid = (props: TCardProps) => {
	const { tours } = props

	return (
		<div className="col-12 p-0 flex flex-wrap">
			{tours !== undefined && tours.length > 0 ? (
				tours.map((tour) => <HotelCard key={tour.id} tourData={tour} />)
			) : (
				<>Туры отсутствуют</>
			)}
		</div>
	)
}
