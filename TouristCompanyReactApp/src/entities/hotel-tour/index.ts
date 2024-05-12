export type THotelTour = {
	tourId: string
	hotelId: string
}

export type TAddHotelTourForm = THotelTour
export type TEditHotelTourForm = TAddHotelTourForm & { newHotelId: string }
