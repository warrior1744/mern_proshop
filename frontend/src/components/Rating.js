import React from 'react'
import PropTypes from 'prop-types' 



export const Rating = ({value, text, color}) => {
  return (
    <div className='rating'>
        <span>
            <i style={value >=4 ? {color} : value <4 && value >=3 ? {'color':'#F3CA6B'} : {'color':'#E11717'}}
              className={
                value >= 1 
                  ? 'fa-solid fa-star'
                  : value >= 0.5
                  ? 'fa-solid fa-star-half-stroke' 
                  : 'far fa-star'
            }
            ></i>
        </span>
        <span>
            <i style={value >=4 ? {color} : value <4 && value >=3 ? {'color':'#F3CA6B'} : {'color':'#E11717'}}
              className={
                value >= 2
                  ? 'fa-solid fa-star'
                  : value >= 1.5
                  ? 'fa-solid fa-star-half-stroke' 
                  : 'far fa-star'
            }
            ></i>
        </span>
        <span>
            <i style={value >=4 ? {color} : value <4 && value >=3 ? {'color':'#F3CA6B'} : {'color':'#E11717'}} 
              className={
                value >= 3
                  ? 'fa-solid fa-star'
                  : value >= 2.5
                  ? 'fa-solid fa-star-half-stroke' 
                  : 'far fa-star'
            }
            ></i>
        </span>
        <span>
            <i style={value >=4 ? {color} : value <4 && value >=3 ? {'color':'#F3CA6B'} : {'color':'#E11717'}} 
              className={
                value >= 4 
                  ? 'fa-solid fa-star'
                  : value >= 3.5
                  ? 'fa-solid fa-star-half-stroke' 
                  : 'far fa-star'
            }
            ></i>
        </span>
        <span>
            <i style={value >=4 ? {color} : value <4 && value >=3 ? {'color':'#F3CA6B'} : {'color':'#E11717'}} 
              className={
                value >= 5
                  ? 'fa-solid fa-star'
                  : value >= 4.5
                  ? 'fa-solid fa-star-half-stroke' 
                  : 'far fa-star'
            }
            ></i>
        </span>
        <span>{text && text}</span>
    </div>
  )
}


Rating.defaultProps = {
  color:'#F4F440'
  
  }


//We imported as PropTypes But while using with a React component. 
//we use it with smaller case propTypes
Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}
export default Rating
