import { ReactNode } from 'react'

export const DefaultLayout = (props: { children: ReactNode }) => {
	const { children } = props

	return (
		<div className='flex justify-content-center' style={{  width: '100%'}}>
			<div className="col-12 xl:col-9">{children}</div>
		</div>
	)
}
