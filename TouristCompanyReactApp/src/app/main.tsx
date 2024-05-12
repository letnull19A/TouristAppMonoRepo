import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import "/node_modules/primeflex/primeflex.css"
import 'primeicons/primeicons.css';
import {RouterApp} from "./routes";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
        <RouterApp/>
    </PrimeReactProvider>
  </React.StrictMode>,
)
