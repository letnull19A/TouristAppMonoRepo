import 'primeicons/primeicons.css'
import { PrimeReactProvider } from 'primereact/api'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterApp } from './routes'
import '/node_modules/primeflex/primeflex.css'
if (import.meta.env.MODE === 'development') {
	import('primereact/resources/themes/bootstrap4-dark-blue/theme.css')
} else {
	import('primereact/resources/themes/bootstrap4-light-blue/theme.css')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<PrimeReactProvider>
			<RouterApp />
		</PrimeReactProvider>
	</React.StrictMode>
)
