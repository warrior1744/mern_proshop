import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler (async (req, res) => {
    let pageSize
    const OnAdminProductListScreen = req.query.OnAdminProductListScreen
    if(OnAdminProductListScreen === 'true'){
        pageSize = 12
    }else{
        pageSize = 8
    }
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword 
        ? {
         //https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        "$or": [
            {name: { 
                $regex: req.query.keyword,
                $options: 'im'
            }},
            {category:{
                $regex: req.query.keyword,
                $options:'im'
            }}
        ]} 
        : {}
    const count = await Product.countDocuments({ ...keyword}) // query context >>> {"name":{"$regex":"xxx","$options":"i"}}
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page-1))//if page is 1, then skip none and so on

    res.json({products, page, pages: Math.ceil(count / pageSize)})
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler (async (req, res) => {

    const product = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

})

// @desc Delete single product
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProductById = asyncHandler (async (req, res) => {

     const product = await Product.findById(req.params.id)
    if(product){
        const productName = product.name
        await product.remove()
        res.json({message: `The product ${productName} is removed`})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Update a product by ID
// @route POST /api/products/:id
// @access Private/Admin

const createProduct = asyncHandler(async(req, res) =>{
   
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc Update a product by ID
// @route PUT /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    const productName =''
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    if(product){
        product.Name = product.name
        product.name = name 
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json({
            updatedProduct
        })
    }else{
        res.status(404)
        throw new Error(`Failed updating ${productName}`)
    }
})

// @desc create new review
// @route POST /api/products/:id/reviews
// @access public

const createProductReivew = asyncHandler(async (req, res) => {
    const { rating, comment} = req.body
    const products = await Product.findById(req.params.id)
    if (products){
        const alreadyReviewed = products.reviews.find( r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
           throw new Error(`You've already reviewed ${products.name}`)
        }
        const review = {
            name: req.user.name, //logged-in user name
            rating: Number(rating),
            comment,
            user: req.user._id //logged-in user id
        }
        products.reviews.push(review)
        products.numReviews = products.reviews.length
        products.rating = products.reviews.reduce((acc, review) => review.rating + acc, 0) / products.reviews.length
        await products.save()
        res.status(201).json({ message: `Review added to ${products.name}`})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Get top rated products
// @route GET /api/products/top
// @access public

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1}).limit(3)
    res.json(products)
})

// Improvement 2
// @desc Update product qty
// @route POST /api/products/qty/:id
// @access private

const updateProductQty = asyncHandler(async (req, res)=> {
    const order = await Order.findById(req.params.id)
    if(order){
        order.orderItems.forEach(async item => { //iterate each product
            //get the product vault
            const productItem = await Product.findById(item.product)
            if(productItem){
                productItem.countInStock = productItem.countInStock - item.qty
                const updatedProduct = await productItem.save()
            }
        });  
    }else{
        throw new Error('updateProductQty Failed')
    }
})

export {
    getProductById, getProducts, deleteProductById, updateProduct, createProduct, createProductReivew, getTopProducts, updateProductQty
}