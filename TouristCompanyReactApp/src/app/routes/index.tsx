import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { adminRouter, publicRouter } from '../chains'

export const RouterApp = () => {
	const router = createBrowserRouter([...publicRouter, ...adminRouter])

	return <RouterProvider router={router}></RouterProvider>
}
