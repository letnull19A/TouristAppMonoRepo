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
        <div className="mb-3 flex flex-row gap-2">
            <InputText ref={inputRef} placeholder="Введите Ваш запрос" className="w-full"/>
            <Button label="Найти" className="col-1" onClick={() => handleSearch()}/>
        </div>
    )
}