import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Meta from '../components/Meta'


//route '/login'
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()
    const queryRedirect = useLocation().search //possbile output: ?redirect=shipping  or  
    const redirect = queryRedirect ? queryRedirect.split('=')[1] : '' //possible output: shipping or
    
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo} = userLogin

    const submitHandler = (e) => { //execute when user clicked Sign On
        e.preventDefault()
        dispatch(login(email, password)) //pass to Actions
    }

    useEffect(() => {
        if(userInfo){
            navigate('/'+redirect)
        }
    }, [navigate, userInfo, redirect])

  return (
    <>
    <Header />
    <Meta title='Login'/>
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email"
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='Submit' variant='primary'>
                Sign On
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
            New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register
                          </Link>
            </Col>
        </Row>
    </FormContainer>
    </>
  )
}

export default LoginScreen