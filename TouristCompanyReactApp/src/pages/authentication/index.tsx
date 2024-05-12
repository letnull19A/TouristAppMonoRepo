import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Controller, useForm } from 'react-hook-form'

type TForm = {
	login: string
	password: string
}

export const Authentication = () => {
	const defaultValues: TForm = {
		login: '',
		password: ''
	}

	const { control } = useForm({ defaultValues })

	return (
		<div className='w-full h-screen flex align-items-center justify-content-center'>
			<form className="w-3">
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
										className={classNames({ 'p-invalid': fieldState.error }) + ' w-12'}
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
