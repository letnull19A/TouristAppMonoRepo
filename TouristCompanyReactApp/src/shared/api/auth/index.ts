import { TAuthForm } from "@entities"

export const authApi = async (data: TAuthForm): Promise<Response> => {
	return await fetch(`${import.meta.env.VITE_API_URI}/api/auth`, {
        method: 'POST',
        body: JSON.stringify({...data}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
