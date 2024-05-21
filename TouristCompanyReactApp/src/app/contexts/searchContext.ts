import { TAirport, TCountry, TTour } from '@entities'
import { createContext } from 'react'

type TContext = {
	data: Array<TTour>
	setData: (value: Array<TTour>) => void
	airport: TAirport | undefined
	setAirportId: (value: TAirport) => void
	country: TCountry | undefined
	setCountry: (value: TCountry) => void
}

export const SearchContext = createContext<TContext>({
	data: [],
	setData: () => {},
	airport: undefined,
	setAirportId: () => {},
	country: undefined,
	setCountry: () => {}
})
