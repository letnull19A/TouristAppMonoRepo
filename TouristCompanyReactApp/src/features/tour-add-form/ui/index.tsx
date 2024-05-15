import { tourApi } from '@api'
import { TAddTourForm, TCategory, TCity, TCountry } from '@entities'
import { TourAddPricesForm } from '@features'
import { CountryDropdown, CityDropdown, CategoryDropdown } from '@ui'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import { Controller, useForm } from 'react-hook-form'

export const TourAddForm = () => {
	const { create } = tourApi

	const defaultValues: TAddTourForm = {
		name: '',
		description: '',
		countryId: '',
		cityId: '',
		categoryId: ''
	}

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({ defaultValues })

	const onSubmit = (data: TAddTourForm) => {
		create({
			name: data.name,
			categoryId: data.categoryId,
			description: data.description,
			countryId: data.countryId,
			cityId: data.cityId
		})
	}

	const getFormErrorMessage = (name: keyof TAddTourForm) =>
		errors[name] ? (
			<small className="p-error">{errors[name]?.message}</small>
		) : null

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-column gap-40 w-12"
		>
			<Controller
				name="name"
				control={control}
				rules={{ required: 'Название не введено' }}
				render={({ field, fieldState }) => (
					<>
						<label htmlFor={field.name}></label>
						<span className="p-float-label">
							<InputText
								id={field.name}
								className={classNames({ 'p-invalid': fieldState.error })}
								style={{ width: '100%' }}
								onChange={(e) => field.onChange(e.target.value)}
							/>
							<label htmlFor={field.name}>Название</label>
						</span>
						{getFormErrorMessage(field.name)}
					</>
				)}
			/>
			<Controller
				name="categoryId"
				control={control}
				render={({ field }) => (
					<div className="mt-4">
						<CategoryDropdown
							onChange={(e) => field.onChange((e.target.value as TCategory).id)}
						/>
					</div>
				)}
			/>
			<Controller
				name="countryId"
				control={control}
				render={({ field }) => (
					<div className="mt-4">
						<CountryDropdown
							onChange={(e) => field.onChange((e.target.value as TCountry).id)}
						/>
					</div>
				)}
			/>
			<Controller
				name="cityId"
				control={control}
				render={({ field }) => (
					<div className="mt-4">
						<CityDropdown
							onChange={(e) => field.onChange((e.target.value as TCity).id)}
						/>
					</div>
				)}
			/>
			<Controller
				name="description"
				control={control}
				rules={{ required: 'Описнаие не введено' }}
				render={({ field, fieldState }) => (
					<span className="p-float-label my-4">
						<InputTextarea
							id={field.name}
							{...field}
							rows={4}
							cols={30}
							className={classNames({ 'p-invalid': fieldState.error })}
							style={{ width: '100%' }}
						/>
						<label htmlFor={field.name}>Описание</label>
						{getFormErrorMessage(field.name)}
					</span>
				)}
			/>
			<TourAddPricesForm />
			<Button
				label="Подтвердить"
				type="submit"
				icon="pi pi-check"
				className="mt-4"
			/>
		</form>
	)
}
