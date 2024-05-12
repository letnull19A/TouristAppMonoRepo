import {
	categoryApi,
	cityApi,
	countryApi,
	hotelApi,
	hotelTourApi,
	tourApi
} from '@api'
import {
	TCategory,
	TCity,
	TCountry,
	TEditTourForm,
	THotel,
	TTour
} from '@entities'
import {
	CountryDropdown,
	CityDropdown,
	CategoryDropdown,
	HotelDropdown
} from '@ui'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

export const TourEditForm = () => {
	const { edit, getById } = tourApi
	const [tourData, setTourData] = useState<TTour>()
	const [category, setCategory] = useState<TCategory>()
	const [country, setCountry] = useState<TCountry>()
	const [city, setCity] = useState<TCity>()
	const [hotel, setHotel] = useState<THotel>()
	const [currentHotel, setCurrentHotel] = useState<THotel>()

	const { id } = useParams()

	useEffect(() => {
		if (id !== undefined) getById(id).then((res: TTour) => setTourData(res))
	}, [getById, id])

	useEffect(() => {
		if (tourData !== undefined && tourData.id !== undefined) {
			categoryApi
				.getById(tourData.category.id)
				.then((res: TCategory) => setCategory(res))

			countryApi
				.getById(tourData.country.id)
				.then((res: TCountry) => setCountry(res))

			cityApi.getById(tourData.city.id).then((res: TCity) => setCity(res))

			hotelTourApi.getAll(tourData.id).then((res) => {
				hotelApi.getById(res[0].hotelId).then((resq: THotel) => {
					setHotel(resq)
					setCurrentHotel(resq)
				})
			})
		}
	}, [id, tourData])

	const defaultValues: Partial<TEditTourForm & { hotel: THotel }> = {
		id,
		name: tourData?.name,
		description: tourData?.description,
		countryId: tourData?.country.id,
		cityId: tourData?.city.id,
		categoryId: tourData?.category.id,
		hotel: currentHotel
	}

	const { control, handleSubmit } = useForm({ defaultValues })

	const onSubmit = (data: Partial<TEditTourForm & { hotel: THotel }>) => {
		if (data === undefined || hotel?.id === undefined || data.id === undefined)
			return

		if (currentHotel === undefined) {
			hotelTourApi.create({
				tourId: data.id,
				hotelId: hotel.id
			})
		} else {
			hotelTourApi.edit({
				hotelId: currentHotel?.id ?? '',
				tourId: data.id,
				newHotelId: data.hotel?.id ?? ''
			})
		}

		edit({
			id: data.id,
			name: data.name ?? '',
			description: data.description ?? '',
			cityId: data.cityId ?? '',
			countryId: data.countryId ?? '',
			categoryId: data.categoryId ?? ''
		})
	}

	return (
		tourData !== undefined && (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-column gap-40 w-12"
			>
				<Controller
					name="name"
					control={control}
					defaultValue={tourData.name}
					rules={{ required: 'Название не введено' }}
					render={({ field, fieldState }) => (
						<>
							<label htmlFor={field.name}></label>
							<span className="p-float-label">
								<InputText
									id={field.name}
									type="text"
									{...field}
									className={classNames({ 'p-invalid': fieldState.error })}
									style={{ width: '100%' }}
									onChange={(e) => field.onChange(e.target.value)}
								/>
								<label htmlFor={field.name}>Название</label>
							</span>
						</>
					)}
				/>
				<Controller
					name="categoryId"
					control={control}
					defaultValue={tourData.category.id}
					render={({ field }) => (
						<div className="mt-4">
							<CategoryDropdown
								defaultValue={category}
								onChange={(e) =>
									field.onChange((e.target.value as TCategory).id)
								}
							/>
						</div>
					)}
				/>
				<Controller
					name="countryId"
					control={control}
					defaultValue={tourData.country.id}
					render={({ field }) => (
						<div className="mt-4">
							<CountryDropdown
								defaultValue={country}
								onChange={(e) =>
									field.onChange((e.target.value as TCountry).id)
								}
							/>
						</div>
					)}
				/>
				<Controller
					name="cityId"
					control={control}
					defaultValue={tourData.city.id}
					render={({ field }) => (
						<div className="mt-4">
							<CityDropdown
								defaultValue={city}
								onChange={(e) => field.onChange((e.target.value as TCity).id)}
							/>
						</div>
					)}
				/>
				<Controller
					name="description"
					control={control}
					defaultValue={tourData.description}
					rules={{ required: 'Описнаие не введено' }}
					render={({ field, fieldState }) => (
						<span className="p-float-label mt-5 mb-4">
							<InputTextarea
								id={field.name}
								{...field}
								rows={4}
								cols={30}
								className={classNames({ 'p-invalid': fieldState.error })}
								style={{ width: '100%' }}
							/>
							<label htmlFor={field.name}>Описание</label>
						</span>
					)}
				/>
				<Controller
					name="hotel"
					control={control}
					defaultValue={currentHotel}
					render={({ field }) => (
						<div className="mb-4">
							<HotelDropdown
								defaultValue={hotel}
								onChange={(e) => {
									field.onChange((e.target.value as THotel))
								}}
							/>
						</div>
					)}
				/>
				<Button label="Подтвердить" type="submit" icon="pi pi-check" />
			</form>
		)
	)
}
