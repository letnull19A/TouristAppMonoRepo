import { SearchContext } from '@contexts'
import { HotelCard } from '@widgets'
import { useContext } from 'react'

export const CardGrid = () => {
	const context = useContext(SearchContext)

	return (
		<div className="col-12 p-0 flex flex-wrap">
			{context.data !== undefined && context.data.length > 0 ? (
				context.data.map((tour) => <HotelCard key={tour.id} tourData={tour} />)
			) : (
				<>Туры отсутствуют</>
			)}
		</div>
	)
}
