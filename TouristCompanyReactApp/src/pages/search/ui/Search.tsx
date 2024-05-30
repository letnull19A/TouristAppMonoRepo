import { search } from "@api"
import { SearchContext } from "@contexts"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useContext, useRef } from "react"

export const Search = () => {

    const inputRef = useRef<HTMLInputElement>(null)

    const context = useContext(SearchContext)

    const handleSearch = async () => {
        if (inputRef === null || inputRef.current === null) return

        console.log(context.airport, context.country)
        
        const result = await (await search(inputRef.current?.value, context.airport?.id ?? '')).json()

        if (result) {   
            console.log(result)
            
            context.setData(result)
        }
    }

    return (
        <div className="mb-3 flex flex-row justify-content-between">
            <InputText ref={inputRef} placeholder="Введите Ваш запрос" style={{ width: '90%' }} />
            <Button label="Найти" style={{ width: 100 }} onClick={() => handleSearch()}/>
        </div>
    )
}