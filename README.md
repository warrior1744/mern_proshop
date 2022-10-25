Tip: using npm to install react boilerplate codes

1. switch to your working directory for react (ex. ./frontend)
2. run 'npx create-react-app frontend'
3. after completed install, run 'npm start'

   Using ES7 React/Redux extension shortcut

4. 'rafce' React Arrow Function Components Export
5. CSS link added to index.html

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />

3. added bootstrap.css file from https://bootswatch.com/
4. install React-Bootstrap
   npm install react-bootstrap
5. import react-bootstrap and using Container, Navbar and Nav
6. using Font Awesome Style to implement icon

HomeScreen Product Listing

1. built HomeScreen
2. build products model
3. import the model to Homescreen
4. use the components to App.js
5. built Product component
6. receiving props from HomeScreen
7. using Card styling to Product components

Rating Component

1. built Rating Component and styling

Implementing React Router

1. 'npm install react-router-dom
2. 'npm install react-router-bootstrap
3. import react-router-dom react-router-boostrap on App.js
   ex: import { BrowserRouter as Router} from 'react-router-dom'
4. import Routes, Route
5. created routes and router for HomeScreen
6. created ProductScreen Component
7. created router for ProductScreen Component
8. implement Link from 'react-router-dom' and using Link component
   on Product.js

Product Detail Screen 9. Modify Links using LinkContainer on Header.js, removing href 10. use useParams() to obtain params from the component 11. ProductScreen component, show product details

======================Backend: Express=========================
Serving Product - Back-end Routes

1. Create backend folder and take on initialization
2. Create express server with port 5000
3. using products.js data
4. Create routes for res.json with api request

Fetching Products from React (useEffect)

1. switch to frontend (leave backend server running)
2. npm install axios
3. HomeScreen component, import useState, useEffect from 'react'
4. using axios to fetch data
5. important >>> (to read data from backend server to avoid CORS,
   you'll need proxy)
   edit frontend/package.json, add "proxy": "http://127.0.0.1:5000",
   restart the react

Nodemon and Concurrently Setup

1. npm install nodemon concurrently
2. edit package.json in the root folder
3. use the following setup
   "scripts": {
   "start": "node backend/server",
   "server": "nodemon backend/server",
   "client": "npm start --prefix frontend",
   "dev": "concurrently \"npm run server\" \"npm run client\""
   }

   npm run dev

Environment Variables

1. npm install dotenv
2. using dotenv.config()
3. create .env file on the root folder

ECMAScript (ES) Modules in Node.js

1. add "type":"module" to package.json of the root folder
2. changing package implementation using ES style

MongoDB Atlas and Compass Setup

1. download and install MongoDB Compass
2. connect the Database with connect string using Compass
3. edit .env with MONGO_URI (application connect)

Connecting to the Database

1. npm install mongoose
2. proshop > backend > create config folder, inside the folder, create db.js
   ( proshop > backend > config > db.js)
3. writing connection code on db.js
4. import connection code on server.js
5. npm install color (make console prettier)

Modeling our Data

1. create models folder; create orderModel.js, productModel.js and userModel.js
2. build schemas for Order, Product, and User

Preparing Sample Data

1. create users.js data in data folder
2. npm install bcriptjs
3. using bcriptjs on users.js password field

Data Seed Script

1. create seeder.js and create methods for import and destroy data

Fetching Products from the Database

1. npm install express-async-handler
2. wrap async/await in express-async-handler method
3. create productRoutes.js, fetching data from db
4. export the routes and app.use on server.js

Getting Started with Postman

1. Install Postman Desktop Agent
2. Examine on Postman GET and environment variable settings
3. add middleware for error handling message

Custome Error Handling

1. added errorMiddleware to handle error messages

An Overview of Redux, Creating a Redux Store

1. install Redux DevTools Chrome extension
2. npm install redux (in frontend directory)
3. npm install react-redux (in frontend directory)
4. npm install redux-thunk (in frontend directory)
5. npm install redux-devtools-extension (in frontend directory)
6. create store.js for Redux Store file, connect reducer, thunk middleware and other
7. import Provider from 'react-redux
8. import store.js
9. render Provider with store states

Product List Reducer and Action

1. create productReducers.js, productActions.js

Bringing Redux State into HomeScreen - useDispatch and useSelector

1. using Dispatch and useSelector methods

Message and Loader Components

1. create Loader.js and Message.js Components
2. use Spinner for Loader and Alert for Message
3. import the Components in the HomeScreen for replacement

Product Details Reducer and Action

1. create productDetail Action, Reducer consts and use Dispatch ProductScreen Component
2. add productDetails key on the reducer
3. use Selector on ProductScreen Component

Quantity Select and Add to Cart Button

1. create cartReducers.js, create cartConstants.js, create cartActions.js
2. use Dispatch, Selector methods on ProductScreen Components
3. use useParams to retrieve query, useNavigate to route link
4. create CartScreen Components

Add to Cart Functionality

1. create routes for CartScreen components
2. apply useParams, useLocation, useDispatch, useSelector

Cart Screen

1. create layout for shopping cart list using react-bootstrap
2. create two more functions for checkout and remove cart items

Remove Items from the Cart

1. create CART_REMOVE_ITEM case on CartReducers.js
2. create removeFromCart function on cartActions.js
3. dispatch removeFromCart action on CartScreen component

Clean up using Controllers (backend)

1. create productControolers.js
2. migrate the method to the new js file
3. clean up productRoutes.js

User Authentication Endpoint (backend)

1. create userRoutes and userController for user auth
2. apply the routes on server.js
3. use bcrypt on userModel.js

Generate a JSON Web Token (JWT) (backend)

1. npm install jsonwebtoken
2. create utils folder and create generateToken.js
3. edit .env and implement generateToken method on userController.js

Custom Authentication Middleware (backend)

1. create authMiddleware.js, implement it with getUserProfile method
2. create routes for authMiddleware (checking the Token from the Headers) and getUserProfile on userRoutes.js

- This is to create middleware for authenticate the users but haven't yet save the Token
  anywhere else for acquiring the access to certain protected routes.
  We need to save the Token for the protected route use

Saving the Token in Postman (backend)

1. use environment variable on Postman test setup

User Registration and Password Encryption (backend)

1. create registerUser method on userController.js
2. create a method for pre encrypt password for registering a new user on userModel.js

User Login Reducer and Action (frontend)

1. create userConstants.js and userReducers.js
2. import userReducers.js to store.js
3. create userActions.js
4. write userInfoFromStorage method to store userInfo into localStorage

User Login Screen and Functionality

1. create a submit event handler on LoginScreen component
2. create redirect page when userInfo is arrived
3. create email and password submit form using react bootstrap

Show the User in Navbar and Logout

1. create logout function on component
2. create logout nav and submit on Header component
3. update userActions with new logout function

User Register Reducer, Action, and Screen

1. create register function on userActions.js
2. create userRegisterReducer function on userReducers.js
3. create userRegister object on store.js
4. create RegisterScreen component

Update Profile Endpoint

1. create updateUserProfile function on userControllers.js
2. add route to userRoutes to update (PUT) the data

Profile Screen and Getting User Details

1. create ProfileScreen components and view
2. create getUserDetails function on userActions.js (right now the parameter only set to arbitray data 'profile')
3. create userDetailsReducer function on userReducers.js
4. import userDeatilsReducer function on store.js
5. create routes on App.js (this needs to be changed to user route in the next section)

Updating User Profile

1. create updateUserProfile function on userActions.js
2. create userUpdateProfileReducer function on userReducers.js
3. import userUpdateProfileReducer function on store.js
4. create submit for dispatch and useSelector on ProfileScreen component

Shipping Screen and Save Address

1. create ShippingScreen component
2. create saveShippingAddress method on carActions.js
3. create a new type on cartReducers.js
4. create ShippingScreen routes and new cart object on store.js

Checkout Steps Component

1. create CheckoutSteps component
2. create PaymentScreen component
3. use CheckoutSteps component on ShippingScreen component

Payment Screen and Save Payment Method

1. create savePaymentMethod method on cartActions.js
2. create CART_SAVE_PAYMENT_METHOD case on cartReducers

Place Order Screen

1. create PlaceOrderScreen Component
2. import CheckoutSteps Component as Items on PlaceOrderScreen

Order Controller and Route (Backend)

1. create orderController.js
2. create orderRoutes.js
3. add the route to server.js

Creating an Order

1. create orderConstants.js
2. create orderReducer.js
3. create orderActions.js
4. create view and clickhandler on PlaceOrderScreen component

Getting an Order by ID Endpoint (Backend)

1. create getOrderById method on orderController.js
2. create a new route /api/routes/:id

Order Details Reducer and Action

1. create new Constants to orderConstants.js
2. create orderDetailsReducer method on orderReducer.js
3. add orderDetailsReducer to store.js
4. create getOrderDetails method to orderActions.js

Order Screen

1. create OrderScreen component
2. create OrderScreen route on store.js

Updating the Paid Endpoint (Backend)

1. create updateOrderToPaid method to orderController.js
2. add route updateOrderToPaid to orderRoutes.js

Order Pay Reducer and Action

1. create getOrderDetails, payOrder methods to orderActions.js
2. create orderPayReducer method to orderReducers.js
3. add orderPayReducer to store.js

Adding PayPal Payments 2022/06/14

1. Register account on Paypal
2. Copy the ClientID to backend env file and add the api route for the ClientID
3. integrate the SDK by using the script from https://developer.paypal.com/sdk/js/configuration/
4. create addPayPalScript method for scripting resource to OrderScreen Component
5. create conditional statement for using the SDK script frontend
6. npm install react-paypal-button-v2 --legacy-peer-deps
7. use PayPalButton from react-paypal-button-v2, (video 12:23)
8. create successPaymentHandler method for PayPalButton and dispatch orderId and paymentResult to payOrder in orderActions.js

Showing Orders on the Profile 2022/06/15

1. On Backend, create getMyOrders controller method and create an order route '/myorders'
2. create order list constants to orderConstants.js
3. create orderListMyReducer method to orderReducers.js
4. import orderListMyReducer and create orderMyList reducer to store.js
5. create listMyOrders method to orderActions.js
6. import listMyOrders method to ProfileScreen Component
7. create orderMyList selector and orders view

Admin Middleware and Getting Users Endpoint (backend)

1. add admin method to authMiddleware.js and use it in userRoutes.js

Admin User List

1. create userListReducer method to userReducers.js
2. add userListReducer to reducer in store.js
3. create listUsers method to userActions.js
4. create UserListScreen component and import listUsers action
5. create a new NavDropdown to Header Component
6. create Links to show userlist, product list and order list as admin login in the NavDropdown to Header Component
7. create '/admin/userlist' route in App.js

Admin Screen Access Security (Bug fix)

1. Add USER_DETAILS_RESET and USER_LIST_RESET constants
2. Add the constants to userReducers.js
3. Add dispatch USER_LIST_RESET to logout in userActions.js
4. Add a condition to useEffect for check isAdmin in UserListScreen Component

Deleting the Admin User

1. create deleteUserById function to userController.js
2. add delete route to userRoutes.js
3. add userDeleteReducer function to userReducers.js
4. add deleteUser function to userActions.js
5. import deleteUser and dispatch it

Getting a User by ID and Updating User Endpoints

1. create getUserById GET api method to userController.js
2. create updateUser PUT api method to userController.js
3. create getUserById, updateUser routes in userRoutes.js

User Edit Screen and Getting User Details

1. create USER*UPDATE*... constants to userConstants.js
2. create updateUser action method to userActions.js
3. create UserEditScreen Component and create Form for user details

Updating the User Functionality

1. create userUpdateReducer method to userReducers.js
2. create userUpdate selector
3. useEffect to dispatch data

Admin Product List

1. create ProductListScreen Component
2. useSelector productList for products to create the view in ProductListScreen Component

Deleting Admin Products

1. create deleteProductById function to productController.js
2. add delete route to productRoutes.js
3. add productDeleteReducer function to productReducers.js
4. add deleteProduct function to productActions.js
5. import deleteProduct and dispatch it

Creating and Updating Product Endpoints

1. create createProduct and updateProduct Endpoint api methods
2. create POST and PUT routes for each points

Creating an Admin Product

1. create createProduct action to productActions.js
2. create productCreateReducer reducer to productReducers.js
3. use Selector productCreate reducer
4. create navigation to product/:id/edit if success created

Editing the Product Screen

1. create updateProduct action to productActions.js
2. create productUpdateReducer reducer to productReducers.js
3. use Selector productUpdate reducer
4. create navigation to /admin/productlist if success created

Image Upload Config and Endpoint

1. npm install multer
2. create uploadRoutes.js using multer
3. create uploadController.js with the route
4. add uploadRoutes meddleware

Front-end Image Upload

1. create <Form.Control for 'file' type
2. create uploadFileHandler function to ProductEditScreen Component

Admin Order List

1. create getOrders method and routes on backend
2. create ORDER*LIST*... Constants to orderCanstants.js
3. create listOrders function to orderActions.js
4. create ordersListReducer function to orderReducers.js
5. import ordersListReducer to store.js
6. create OrdersListScreen Component
7. import listOrders action to the Component and add the route to App.js
8. create view

Chapter 12
Marking an Order as Delivered

1. create updateOrderToDelivered function to orderController.js
2. add updateOrderToDelivered route to orderRoutes.js
3. create ORDER*DELIVER*... constants to orderConstants.js
4. create deliverOrder function to orderActions.js
5. create orderDeliverReducer function to orderReducers.js
6. add orderDeliverReducer to store.js
7. use Select orderDeliver to OrderScreen Component
8. create deliverHandler button to dispatch deliverOrder on OrderScreen Component

Chapter 13
Morgan and Creating Review Endpoint

1. npm install morgan
2. create createProductReivew function to productController.js
3. add to route 'api/products/:id/reviews'

Chapter 13
Front-end Product reviews

1. create PRODUCT*CREATE_REVIEW*... constants to productConstants.js
2. create productReviewCreateReducer function to productReducers.js
3. add productReviewCreateReducer to store.js
4. create createProductReview function to productActions.js
5. add review element to ProductScreen

Chapter 13
Product Search

1. modify getProducts function for returning pages and pages data inproductController.js
2. modify listProducts function, axio api able to query pageNumber productActions.js
3. modify productListReducer function to save page and pages data in productReducers.js
4. create Paginate Component
5. import Paginate Componet to HomeScreen Component

Chapter 13
Product Pagination

1. add pageSize and page variables and keyword to getProducts function on productController.js (backend)
2. add a db query for the counting the query items according to the keyword (backend)
3. add limit and skip db query for the product query (backend)
4. add pageNumber as new parameter to listProducts on productActions.js
5. modify axios GET method to pass pageNumber query string
6. add pages and page data to productListReducer.js
7. add routes for /page/:pageNumber and /search/:keyword/page/:pageNumber
8. create Paginate Component
9. add Paginate Component to HomeScreen Component and ProrductListScreen Component

Chapter 13
Creating a Products Carousel

1. create getTopProducts function to productController.js
2. create '/api/products/top' route
3. create listTopProducts function to productionAction.js
4. create productTopRatedReducer function to productReducers.js
5. create ProductCarousel Component
6. use the carousel component on HomeScreen Component
7. modify index.css for carousel css

Chapter 13
Custom Page titles and Meta

1. npm install react-helmet
2. create Meta Component for Screen Components

Chapter 14
Preparing for Deployment

1. stop the server and switch to frontend folder
2. npm run build
3. create route for the index.html in the static folder (build folder)

Chapter 15
Deploying to Heroku

1. check .env in gitignore, and /build folder
2. # register to Heroku and install Heroku Cli (type "heroku --version" to check, upgrading to latest version, type heroku upgrade )
3. go to the project root folder, type "heroku login"
4. "heroku create [unique app name]" to create an app in your heroku account
5. add Procfile in the root folder (ex. Procfile >> "web:node backend/server.js")
6. add environment variables to heroku before the deployment
   execute the following commands

   $ heroku config:set USE_NPM_INSTALL=true -a <Your app name>
   $ heroku config:set NODE_MODULES_CACHE=false -a <Your app name>

7. modify package.json with engine version

important: node version must meet npm version on package.json

"engines": {
"npm": "8.3.1",
"node": "^16.14.0"
},

8. modify package.json script key
   "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
9. "git add ." then "git commit" and "git push" to your own repository
10. "heroku git:remote -a [your app name]"
11. "git push heroku master"
12. finally add the .dev variables to heroku in the app -> settings -> Config Vars
13. # "heroku logs --tail" to check the status

Improvements 1: Cancel Order function

1. Backend: add cancel models in orderModel.js done
2. add cancelOrder function in orderController.js done
3. orderRoutes.js, add PUT /api/orders/:id/cancel and use tokens done
4. Frontend: create orderConstants ORDER*CANCEL*... done
5. orderReducer.js, create orderCancelReducer reducer
6. orderAction.js, create cancelOrder action
7. create CancelOrderScreen.js in screens folder done
8. App.js, import CancelOrderScreen component and add it to route
   '/cancel/:id'
9. CancelOrderScreen.js,
   import stats from the store
   import cancelOrder() and emptyCart() from the actions
   render the order status (to be removed)
10. auto redirect to other page if success or failed

Improvements 2: Modify product quantity when its delivered

11. Backend: create updateProductQty function in productController.js
12. create POST /api/products/qtyi/:id route
13. Frontend: create update updateProductQtyByOrder function in productActions.js
14. OrderScreen.js, import updateProductQtyByOrder and apply in deliverHandler

Improvements 3: ProductScreen.js AddToCart issue 15. use dispatch addToCart instead of passing params to CartScreen component 16. Dont navigate to CartScreen when user added any product to the cart 17. add a span on the Cart icon in Header component and
show the quantity of the cart items
(Header component needs cart stats)
(index.css added the cart indicator badge style)

Bug 1: file uploading to heroku issue
context:
The issue with the photo uploading to Heroku is only bad because when they run dynos on your server their "cycle" cleans the uploaded files. The solution I am proposing will allow you to upload your photos to Cloudinary and then use that url for your photos return path.

You actually don't have to change anything in your files, you actually want to follow the tutorial until you are successfully uploading images.

Once you can upload imagees you will want to open a developer Cloudinary account (free) Cloudinay Dev account register.

1. In your env file you want to add these properties
   CLOUD_NAME = use-your-bucket-name-here-when-creating-bucket
   CLOUD_API_KEY = api-key-from-cloudinary
   CLOUD_API_SECRET = api-secret-from-cloudinary

2. npm i cloudinary
3. server.js, import pkg from 'cloudinary'
   config cloudinary with name, api_key and api_secret
4. uploadRoute.js, import asyncHandler
   import cloudinary as server.js
   in the router.post, use cloud.uploader.upload to upload the req.file.path to Cloudinary and res.send the url

Bug2: ProductListScreen refresh not consistent

1.

ECpay html string include script tag

"<form id="_form_aiochk" action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5" method="post"><input type="hidden" name="MerchantTradeNo" id="MerchantTradeNo" value="8b99c9a780ea8a78b8a8" /><input type="hidden" name="MerchantTradeDate" id="MerchantTradeDate" value="2022/07/01 10:57:16" /><input type="hidden" name="TotalAmount" id="TotalAmount" value="2222" /><input type="hidden" name="TradeDesc" id="TradeDesc" value="tradedesc" /><input type="hidden" name="ItemName" id="ItemName" value="xyzz" /><input type="hidden" name="ReturnURL" id="ReturnURL" value="https://meadowlark1984.herokuapp.com/REST/ecpay/returnResult" /><input type="hidden" name="ClientBackURL" id="ClientBackURL" value="https://meadowlark1984.herokuapp.com" /><input type="hidden" name="ChoosePayment" id="ChoosePayment" value="ALL" /><input type="hidden" name="PlatformID" id="PlatformID" value="" /><input type="hidden" name="MerchantID" id="MerchantID" value="2000132" /><input type="hidden" name="InvoiceMark" id="InvoiceMark" value="N" /><input type="hidden" name="IgnorePayment" id="IgnorePayment" value="" /><input type="hidden" name="DeviceSource" id="DeviceSource" value="" /><input type="hidden" name="EncryptType" id="EncryptType" value="1" /><input type="hidden" name="PaymentType" id="PaymentType" value="aio" /><input type="hidden" name="CheckMacValue" id="CheckMacValue" value="84499E54AE44AD3936DBA0E8DD90F84DE63EA9CEAB41B25859BE6A13D7B5F1EB" /><script type="text/javascript">document.getElementById("\_form_aiochk").submit();</script></form>"

<!-- ECpayment callback result
 {
   "CustomField1":"baoan road",
   "CustomField2":"taoyan",
   "CustomField3":"2324",
   "CustomField4":"Taiwan",
   "MerchantID":"2000132",
   "MerchantTradeNo":"b9869819ba049c992858",
   "PaymentDate":"2022/07/06 16:56:06",
   "PaymentType":"Credit_CreditCard",
   "PaymentTypeChargeFee":"5",
   "RtnCode":"1",
   "RtnMsg":"交易成功",
   "SimulatePaid":"0",
   "StoreID":"",
   "TradeAmt":"122",
   "TradeDate":"2022/07/06 16:53:56",
   "TradeNo":"2207061653564471",
   "CheckMacValue":"4C1D2C4E52465D3F51D946C47B2ECBE3A09827583533A280FFA736C34ECC058B"
 } -->

<!-- PayPal returned message

        // {
        // create_time: "2022-06-22T08:21:27Z"
        // id: "9G347725GY476814C"
        // intent: "CAPTURE"
        // links: [{…}]
        // payer:
        // address: {country_code: 'US'}
        // email_address: "sb-bze6217163584@personal.example.com"
        // name: {given_name: 'John', surname: 'Doe'}
        // payer_id: "J2HB3MJVQJT4Q"
        // [[Prototype]]: Object
        // purchase_units: Array(1)
        // 0: {reference_id: 'default', amount: {…}, payee: {…}, shipping: {…}, payments: {…}}
        // length: 1
        // [[Prototype]]: Array(0)
        // status: "COMPLETED"
        // update_time: "2022-06-22T08:22:33Z" } -->
