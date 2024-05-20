import { TTour } from '@entities'
import { createContext } from 'react'

type TContext = {
	data: Array<TTour>
	setData: (value: Array<TTour>) => void
}

export const SearchContext = createContext<TContext>({
	data: [],
	setData: () => {}
})
