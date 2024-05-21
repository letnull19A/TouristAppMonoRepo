import { TAddUser } from "@entities"

export const registrationApi = async (data: TAddUser): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/registration`, {
		method: 'POST',
		body: JSON.stringify({ ...data }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}