import { RouteObject } from 'react-router-dom'
import {
	Authentication,
	OrderList,
	Registration,
	SearchPage,
	TourView
} from '@pages'
import { DefaultLayout } from '@ui'

export const publicRouter: RouteObject[] = [
	{
		path: '/',
		element: (
			<DefaultLayout>
				<SearchPage />
			</DefaultLayout>
		)
	},
	{
		path: '/auth',
		element: <Authentication />
	},
	{
		path: '/registration',
		element: <Registration />
	},
	{
		path: '/search',
		element: (
			<DefaultLayout>
				<SearchPage />
			</DefaultLayout>
		)
	},
	{
		path: '/tour',
		children: [
			{
				path: ':id/view',
				element: (
					<DefaultLayout>
						<TourView />
					</DefaultLayout>
				)
			}
		]
	},
	{
		path: '/order-list',
		children: [
			{
				path: '',
				element: (
					<DefaultLayout>
						<OrderList />
					</DefaultLayout>
				)
			}
		]
	}
]
