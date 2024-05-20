export const ticketApi = {
	airports: {
		getAll: async (): Promise<Response> =>
			await fetch(`${import.meta.env.VITE_API_URI}/api/tickets/airports`)
	},
    countries: {
        getAll: async (): Promise<Response> =>
            await fetch(`${import.meta.env.VITE_API_URI}/api/tickets/countries`)
    }
}
