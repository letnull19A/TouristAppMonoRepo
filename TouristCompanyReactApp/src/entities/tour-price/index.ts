import { TBase } from '../base'

export type TTourPrice = {
	tourId: string
	price: number
	days: number
} & TBase

export type TAddTourPriceForm = TTourPrice

export type TEditTourPriceForm = TAddTourPriceForm & {
	id: string
}

export type TAddPriceTour = Omit<TTourPrice, 'tourId'>
