import { search } from '@api'
import { SearchContext } from '@contexts'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useContext, useRef } from 'react'

export const Search = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	const context = useContext(SearchContext)

	const handleSearch = async () => {
		if (inputRef === null || inputRef.current === null) return

		console.log(context.airport, context.country)

		const result = await (
			await search(inputRef.current?.value, context.airport?.id ?? '')
		).json()

		if (result) {
			console.log(result)

			context.setData(result)
		}
	}

	return (
		<div className="mb-3 grid">
			<div className="col-10">
				<InputText className='w-full' ref={inputRef} placeholder="Введите Ваш запрос" />
			</div>
			<div className="col-2">
				<Button className='w-full' label="Найти" onClick={() => handleSearch()} />
			</div>
		</div>
	)
}
