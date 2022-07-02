import React, { useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, createProduct  } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


//route '/admin/productList'
const ProductListScreen = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const pageNumber = useParams().pageNumber || 1

   const productList = useSelector(state => state.productList)
   const { loading, error, products, pages, page} = productList

   const productDelete = useSelector(state => state.productDelete)
   const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const productCreate = useSelector(state => state.productCreate)
   const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

   const OnAdminProductListScreen = true

   useEffect(() => {
      dispatch({ type: PRODUCT_CREATE_RESET })
      if(!userInfo.isAdmin){
        navigate('/login')
      }
      
      if(successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
      }else{
        dispatch(listProducts('', pageNumber, OnAdminProductListScreen))
      }

   }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageNumber, OnAdminProductListScreen])

   const deleteHandler = (id, name) => {
     if( window.confirm(`Are you sure to delete ${name} ?`)){
       dispatch(deleteProduct(id))
       dispatch(listProducts('', pageNumber, OnAdminProductListScreen))
     }
   }

   const createProductHandler = () => {
      dispatch(createProduct())
   }


   return (

    <>
      <Header/>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader /> 
      ): error ? (<Message variant='danger'>{error}</Message> 
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id, product.name)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate 
            pages={pages}
            page={page}
            screen='productlist'/>
        </>
      )}
    </>
   )

}

export default ProductListScreen