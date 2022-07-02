import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
    <title>{title}</title>
    <meta name='description' content={description}/>
    <meta name='keywords' constent={keywords}/>
  </Helmet>
  )
}


Meta.defaultProps = {
    title: 'Welcome to Proshop',
    keywords: 'electronics, buy electronics, cheap electronics',
    description:'We sell the best products for cheap'
}

export default Meta