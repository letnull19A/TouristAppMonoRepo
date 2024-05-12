import { TTour } from '@entities'
import { useEffect, useState } from 'react'
import { CardGrid } from './CardGrid'
import { Filter } from './Filter'
import { Search } from './Search'
import { Title } from './Title'
import { tourApi } from '@api'

export const SearchPage = () => {
	const [tours, setTours] = useState<Array<TTour>>([])

	useEffect(() => {
		tourApi.getAll().then((res) => {
			setTours(res)
		})
	}, [])

	return (
		<div className="">
			<Title content="Поиск туров" />
			<Search />
			<Filter />
			<Title content="Результаты:" />
			<CardGrid tours={tours} />
		</div>
	)
}
