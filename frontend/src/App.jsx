import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import { Box } from '@chakra-ui/react';

const TransactionsPage = lazy(() => import('./pages/Transactions'));
const SignupPage = lazy(() => import('./pages/Signup'));
const LoginPage = lazy(() => import('./pages/Login'));
const CreatePaymentPage = lazy(() => import('./pages/CreatePayment'));
const PaymentStatus = lazy(() => import('./pages/PaymentStatus'));

const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/create-payment' element={<CreatePaymentPage />}/>
          <Route path='/payment-status' element={<PaymentStatus />}/>
          <Route path='/transactions' element={<TransactionsPage />}/> {/* this page is useless yet */}
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App;