import { TAuthContext } from '@entities'
import { createContext } from 'react'

export const AuthContext = createContext<TAuthContext>({
	data: undefined,
	setData: () => {},
	logout: () => {},
	isAuth: () => false,
	setIsAuth: () => {}
})
