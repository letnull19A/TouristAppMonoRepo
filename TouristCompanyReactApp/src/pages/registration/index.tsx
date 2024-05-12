import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Controller, useForm } from 'react-hook-form'

type TForm = {
	name: string
	surname: string
	fatherName: string
	email: string
	login: string
	password: string
}

export const Registration = () => {
	const defaultValues: TForm = {
		login: '',
		password: '',
		name: '',
		surname: '',
		fatherName: '',
		email: ''
	}

	const { control } = useForm({ defaultValues })

	return (
		<div className="w-full h-screen flex align-items-center justify-content-center">
			<form className="w-3">
				<Card title="Регистрация">
					<Controller
						name="name"
						control={control}
						rules={{ required: 'Введите имя' }}
						render={({ field, fieldState }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваше имя</label>
								</span>
							</div>
						)}
					/>
					<Controller
						name="surname"
						control={control}
						rules={{ required: 'Введите фамилию' }}
						render={({ field, fieldState }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваша фамилия</label>
								</span>
							</div>
						)}
					/>
					<Controller
						name="fatherName"
						control={control}
						render={({ field }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваше отчество (при наличии)</label>
								</span>
							</div>
						)}
					/>
					<Controller
						name="email"
						control={control}
						rules={{ required: 'Введите E-Mail' }}
						render={({ field, fieldState }) => (
							<div className="my-5">
								<label htmlFor={field.name}></label>
								<span className="p-float-label">
									<InputText
										id={field.name}
										type="email"
										className={classNames({ 'p-invalid': fieldState.error })}
										style={{ width: '100%' }}
										onChange={(e) => field.onChange(e.target.value)}
									/>
									<label htmlFor={field.name}>Ваш E-Mail</label>
								</span>
							</div>
						)}
					/>
					<Controller
						name="login"
						control={control}
						rules={{ required: 'Введите логин' }}
						render={({ field, fieldState }) => (
							<div className="my-5">
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
						rules={{ required: 'Введите пароль' }}
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
					<Controller
						name="password"
						control={control}
						rules={{ required: 'Введите пароль' }}
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
									<label htmlFor={field.name}>Подтвердите пароль</label>
								</span>
							</div>
						)}
					/>
					<Button label="Зарегистрироваться" className="w-12 mt-5" value={'d'} />
				</Card>
			</form>
		</div>
	)
}
