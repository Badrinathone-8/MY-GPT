import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {ContextProvide} from "./useContext.jsx"
import {ProjectRoutes} from './Routes.jsx'
import { BrowserRouter as Router } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
    <ContextProvide >
      <Router>
{/* <App /> */}
<ProjectRoutes />
      </Router>
    
  </ContextProvide >)
