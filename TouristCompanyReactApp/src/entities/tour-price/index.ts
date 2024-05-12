import { TBase } from '../base'

export type TTourPrice = {
	tourId: string
	price: number
	days: number
} & TBase

export type TAddTourPriceForm = TTourPrice & { id: string }

export type TEditTourPriceForm = TAddTourPriceForm & {
	id: string
}
