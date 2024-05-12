export type TCity = {
    id: string
    name: string
    country: { id: string, name: string }
    description: string
}

export type TAddCity = Omit<TCity, 'id' | 'country'>

export type TEditCity = TAddCity & { countryId: string, id: string}