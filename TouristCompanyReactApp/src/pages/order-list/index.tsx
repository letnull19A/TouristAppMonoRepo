import { orderApi } from '@api'
import { AuthContext } from '@contexts'
import { TOrder } from '@entities'
import { useContext, useEffect, useState } from 'react'
import { CardOrderGrid } from './CardGrid'

export const OrderList = () => {
	const context = useContext(AuthContext)

	const [favs, setFavs] = useState<Array<TOrder>>([])

	useEffect(() => {

		console.log(context.data);

		if (context.data === undefined) return

		console.log(context.data?.id);

		orderApi.getUserOrders(context.data?.id).then((res) => {
			console.log(res)
			setFavs(res)
		})
	}, [context.data])

	return (
		<div className="flex flex-row">
			<div className="ml-5" style={{ width: '100%' }}>
					<h1 className="p-0 my-4">Заявки</h1>
					<CardOrderGrid orders={favs} />
			</div>
		</div>
	)
}
