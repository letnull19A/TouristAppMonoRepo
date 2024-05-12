import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'

type TAdminPageTitleSearch = {
	title: string
}

export const AdminPageTitleSearch = (props: TAdminPageTitleSearch) => {
	const { title } = props

	return (
		<div className="flex align-items-center pt-3 flex-shrink-0">
			<span className="inline-flex align-items-center gap-2">
				<span className="font-semibold text-2xl text-primary">{title}</span>
			</span>
			<IconField className='ml-6' iconPosition="left">
				<InputIcon className="pi pi-search"></InputIcon>
				<InputText v-model="value1" placeholder="Search" />
			</IconField>
		</div>
	)
}
