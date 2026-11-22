import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'
import { ToastContainer } from 'react-toastify'
import Profile from './pages/ProfilePage'
import OrderPage from './pages/OrderPage'
import { CartPage } from './pages/CartPage'
import { FoodMenuPage } from './pages/FoodMenuPage'
import { createContext, useState, type Dispatch, type SetStateAction } from 'react'

type LoggedInUserContextType = {
  loggedInUserStatus: boolean
  setLoggedInUserStatus: Dispatch<SetStateAction<boolean>>
}

export const LoggedInUserStatusContext = createContext<LoggedInUserContextType | undefined>(undefined)

function App() {
  const [loggedInUserStatus, setLoggedInUserStatus] = useState<boolean>(false)

  return (
    <div>
      <LoggedInUserStatusContext value={{ loggedInUserStatus, setLoggedInUserStatus }}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<SigninPage />} />

          <Route path="/home" element={loggedInUserStatus ? <HomePage /> : <Navigate to='/' /> }>
            <Route path="" element={<FoodMenuPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </LoggedInUserStatusContext>
    </div>
  )
}

export default App
