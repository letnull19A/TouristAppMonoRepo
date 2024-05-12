import { TCategory } from '@entities'
import { useEffect, useState } from 'react'
import { categoryApi } from '@api'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

type TCategoryDropdownProps = {
	defaultValue?: TCategory
	onChange?: (e: DropdownChangeEvent) => void
}

export const CategoryDropdown = (props: TCategoryDropdownProps) => {
	const { onChange, defaultValue } = props

	const [countries, setCountries] = useState<Array<TCategory>>([])
	const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
		null
	)

	useEffect(() => {
		categoryApi.getAll().then((res) => setCountries(res))
		setSelectedCategory(defaultValue ?? null)
	}, [defaultValue])

	return (
		<Dropdown
			value={selectedCategory}
			onChange={(e) => {
				setSelectedCategory(e.value as TCategory)
				onChange?.(e)
			}}
			options={countries}
			optionLabel="name"
			placeholder="Выберете категорию"
			className="w-12"
		/>
	)
}
