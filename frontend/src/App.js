import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ECPayment from './components/ECPayment'

const App = () => {
  return (
      <Router>
        {/* <Header /> */}
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' exact element = {<HomeScreen />}/>
              <Route path='/page/:pageNumber' exact element = {<HomeScreen />}/>
              <Route path='/search/:keyword/page/:pageNumber' exact element = {<HomeScreen />}/>
              <Route path='/search/:keyword' exact element = {<HomeScreen />}/>
              <Route path='/product/:id' element = {<ProductScreen/>} />
              <Route path='/placeorder' element = {<PlaceOrderScreen/>} />  
              <Route path='/order/:id' element={<OrderScreen />}/>
              <Route path='/login' element = {<LoginScreen/>} />
              <Route path='/register' element = {<RegisterScreen/>} />
              <Route path='/profile' element = {<ProfileScreen/>} />
              <Route path='/shipping' element = {<ShippingScreen/>} />    
              <Route path='/payment' element = {<PaymentScreen/>} />   

              <Route path='/cart' element = {<CartScreen/>} >
                <Route path=":id" element = {<CartScreen/>} />
              </Route>
              <Route path='/admin/userlist' element = {<UserListScreen/>} />
              <Route path='/admin/user/:id/edit' element = {<UserEditScreen/>} />

              <Route path='/admin/productlist' exact element = {<ProductListScreen/>} />
              <Route path='/admin/productlist/page/:pageNumber' exact element = {<ProductListScreen/>} />
              <Route path='/admin/productlist/search/:keyword/page/:pageNumber' exact element = {<ProductListScreen/>} />
              <Route path='/admin/productlist/search/:keyword' exact element = {<ProductListScreen/>} />

              <Route path='/admin/product/:id/edit' element = {<ProductEditScreen/>} />

              <Route path='/admin/orderList' exact element = {<OrderListScreen/>} />
              <Route path='/admin/orderList/page/:pageNumber' exact element = {<OrderListScreen/>} />
              <Route path='/admin/orderList/search/:keyword/page/:pageNumber' exact element = {<OrderListScreen/>} />
              <Route path='/admin/orderList/search/:keyword' exact element = {<OrderListScreen/>} />
              <Route path='/ecpay' exact element = {<ECPayment/>} />
              
            </Routes>
          </Container>
        </main>
        {/* <Footer /> */}
      </Router>
  )
}



export default App;
