import { authApi } from '@api'
import { AuthContext } from '@contexts'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type TForm = {
	login: string
	password: string
}

export const Authentication = () => {
	const defaultValues: TForm = {
		login: '',
		password: ''
	}

	const context = useContext(AuthContext)
	const navigation = useNavigate()

	const { control, handleSubmit } = useForm({ defaultValues })

	const onSubmit = (data: TForm) => {
		authApi(data)
			.then((result) => result.json())
			.then((result) => {
				context.setData(result)
				localStorage.setItem('vouyageUserData', JSON.stringify(result))

				context.setIsAuth(true)

				if (result.role === 'Пользователь') {
					console.log(1)

					navigation('/')
				}
				if (result.role === 'Администратор') {
					console.log(2)

					navigation('/tour/list')
				}
			})
	}

	const navigate = useNavigate()

	return (
		<div className="w-full h-screen flex align-items-center flex-column justify-content-center">
			<img onClick={() => navigate('/')} className='m-0-auto mb-4 w-7 sm:w-4 md:w-3 lg:w-2' src="/logo.svg"/>
			<form className="col-12 sm:col-8 md:col-6 lg:col-5 lg:max-w-28rem" onSubmit={handleSubmit(onSubmit)}>
				<Card title="Войти">
					<Controller
						name="login"
						control={control}
						rules={{ required: 'Введите логин' }}
						render={({ field, fieldState }) => (
							<div className="my-3">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваш логин</label>
								</span>
							</div>
						)}
					/>
					<Controller
						name="password"
						control={control}
						rules={{ required: 'Введите логин' }}
						render={({ field, fieldState }) => (
							<div className="mt-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={
											classNames({ 'p-invalid': fieldState.error }) + ' w-12'
										}
										onChange={(e) => field.onChange(e.target.value)}
										type="password"
									/>
									<label htmlFor={field.name}>Ваш пароль</label>
								</span>
							</div>
						)}
					/>
					<Button label="Войти" className="w-12 mt-5" value={'d'} />
				</Card>
			</form>
		</div>
	)
}
