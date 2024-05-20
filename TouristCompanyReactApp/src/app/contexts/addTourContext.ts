import { TAddPriceTour } from '@entities'
import { createContext } from 'react'

type TContext = {
	fields: Array<TAddPriceTour>
	setFields: (value: Array<TAddPriceTour>) => void
}

export const AddPriceTourContext = createContext<TContext>({
	fields: [],
	setFields: () => {}
})
