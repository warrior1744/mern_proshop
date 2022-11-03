
import React, { useEffect} from 'react'
import { useParams, Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col} from 'react-bootstrap'
import Header from '../components/Header'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import  Paginate  from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

//route '/'
const HomeScreen = () => {

  const keyword = useParams().keyword
  const pageNumber = useParams().pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)//takes the current state as an argument and returns whatever data you want
  const { loading, error, products, page, pages } =  productList

  // call the fn when app loads and after each DOM updates
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  

  return ( 
    <>
    <Header />
    <Meta />
    {!keyword ? <ProductCarousel/>
     : <Link to='/' className='btn btn-light'>Go Back</Link>}
        <h1>Latest products</h1>
        {loading ? (<Loader />
          ) : error?  (
            <Message variant='danger'>{error}</Message>
            ) : (
              <>
                <Row>
                  {products.map(product => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                          <Product product={product} />
                      </Col>
                  ))}
                </Row>
                <Paginate 
                  pages={pages}
                  page={page} 
                  keyword={keyword ? keyword : ''}/>
              </>
                )  
        }
    </>
  )
}

export default HomeScreen