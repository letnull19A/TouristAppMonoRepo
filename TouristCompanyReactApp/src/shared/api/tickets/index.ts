import { TAirport } from '@entities'

export const ticketApi = {
	airports: {
		getAll: async (): Promise<Array<TAirport>> =>
			(
				await fetch(`${import.meta.env.VITE_API_URI}/api/tickets/airports`)
			).json(),
	},
	countries: {
		getAll: async (): Promise<Response> =>
			await fetch(`${import.meta.env.VITE_API_URI}/api/tickets/countries`)
	}
}
