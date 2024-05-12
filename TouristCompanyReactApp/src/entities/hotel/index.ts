export type THotel = {
	id: string
	name: string
	country: { id: string; name: string }
	city: { id: string; name: string }
	rating: number
	description: string
}

export type TAddHotelForm = {
	name: string
	description: string
	cityId: string
	rating: number
}

export type TEditHotelForm = {
	id: string
	cityId: string
	countryId: string
	name: string
	description: string
	rating: number
}