import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

export const Search = () => {
    return (
        <div className="mb-3 flex flex-row gap-2">
            <InputText placeholder="Введите Ваш запрос" className="w-full"/>
            <Button label="Найти" className="col-1"/>
        </div>
    )
}