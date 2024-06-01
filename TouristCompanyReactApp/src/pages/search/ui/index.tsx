import { tourApi } from '@api'
import { SearchContext } from '@contexts'
import { TAirport, TCountry, TTour } from '@entities'
import { useEffect, useState } from 'react'
import { CardGrid } from './CardGrid'
import { Filter } from './Filter'
import { Search } from './Search'
import { Title } from './Title'

export const SearchPage = () => {
	const [tours, setTours] = useState<Array<TTour>>([])
	const [airportId, setAirportId] = useState<TAirport>()
	const [country, setCountry] = useState<TCountry>()
	const [humans, setHumans] = useState<number>(1)
	const [days, setDays] = useState<number>(1)
	const [search, setSearch] = useState<string>()

	useEffect(() => {
		tourApi.getAll().then((res) => {
			setTours(res)
		})
	}, [])

	return (
		<div className="">
			<SearchContext.Provider
				value={{
					data: tours,
					setData: setTours,
					search: search,
					setSearch: setSearch,
					airport: airportId,
					setAirportId: setAirportId,
					country: country,
					setCountry: setCountry,
                    humans: humans,
                    setHumans: setHumans,
                    days: days,
					setDays: setDays
				}}
			>
				<Title content="Поиск туров" />
				<Search />
				<Filter />
				<Title content="Результаты:" />
				<CardGrid />
			</SearchContext.Provider>
		</div>
	)
}
