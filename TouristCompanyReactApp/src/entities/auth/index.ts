export type TAuthForm = {
	login: string
	password: string
}

export type TUserData = {
	id: string
	firstName: string
	lastName: string
	patronymic: string
	role: string
}

export type TAuthContext = {
	data: TUserData | undefined
	setData: (value: TUserData) => void
	setIsAuth: (value: boolean) => void
	logout: () => void
	isAuth: () => boolean
}