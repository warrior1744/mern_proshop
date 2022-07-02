import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, screen='home', keyword=''}) => {

  return pages > 1 && (
     <Pagination>
        {[...Array(pages).keys()].map(x => (
            <LinkContainer key={x+1} 
                           to={ screen === 'home'?
                                  keyword ? 
                                    `/search/${keyword}/page/${x+1}` 
                                  : `/page/${x+1}` 
                                : screen === 'productlist' ?
                                  keyword ?
                                    `/admin/productlist/search/${keyword}/page/${x+1}`
                                  : `/admin/productlist/page/${x+1}`
                                : screen === 'orderlist' ?
                                  keyword ?
                                    `/admin/orderlist/search/${keyword}/page/${x+1}`
                                  : `/admin/orderlist/page/${x+1}`
                                : `/`
                              }
            >
              <Pagination.Item active={x+1 === page}>
                {x+1}
              </Pagination.Item>
            </LinkContainer>
        ))}
     </Pagination>
  )
}

export default Paginate