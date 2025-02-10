import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './ProductCard.less';


const ProductCard = (props) => {
    const { name, quanlity, country, price, imageSrc, handleEdit, updateStock } = props;
    return (
        <>
        <div className='product-card'>
            <img className="product-image" alt="product image" src={imageSrc}/>

            <div className='product-info'>
                <span className='product-name'>{name}</span>

                <div className='product-detail-item'>
                    <p>Quantity Available : {quanlity}</p>
                    <p>Country Of Origin : {country}</p>
                    <p>Price Per MT : {price}</p>
                </div>

                <div className='product-action'>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={updateStock}>Update Stock</Button>
                </div>
            </div>
        </div>
        </>
        
    )   
}

ProductCard.propTypes = {
    imageSrc : PropTypes.string,
    name: PropTypes.string,
    quanlity: PropTypes.string,
    country: PropTypes.string,
    price: PropTypes.string,
    handleEdit: PropTypes.func,
    updateStock: PropTypes.func

}

ProductCard.defaultProps = {
    imageSrc : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: 'Product Name',
    quanlity: '1000 MT',
    country: 'country',
    price: '$200/MT',
    handleEdit: () => {},
    updateStock: () => {}
}

export default ProductCard;