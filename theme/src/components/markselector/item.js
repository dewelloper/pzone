import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import AddToCartButton from '../productDetails/addToCartButton';


const MarkItem = (props) => {

      
      return(
            <div className="column is-four-fifths is-four-quarters-mobile containerFrame">
                  <div className="column is-three-quarters is-three-quarters-mobile field is-grouped leftFrame">
                        <div className="column is-four-quarters is-four-quarters-mobile field is-grouped">
                              <div className="column is-one-third">
                                    <figure className="image is-3by2"><img src={props.mark.images ? props.mark.images[0].url: ""}/></figure>
                                    <AddToCartButton className="addToCarButtonTopMargin"
                                    product={props.mark}
                                    addCartItem={props.addCartItem()}/>
                              </div>
                              <div className="column">
                                    <a href="" title={props.mark.name} className="title is-3">{props.mark.name}</a>
                                    <span className="subtitle is-5"> / {props.mark.category_name ? props.mark.category_name : ""}</span>
                                    <br/>
                                    <span className="subtitle is-5">Ürün Kodu: {props.mark.sku}</span>
                                    <br/>
                                    <span className="subtitle-strong-color">Stok Durumu: {props.mark.stock_status ? props.mark.stock_status :""}</span>
                                    <br/>
                                    <span className="subtitle-strong-color">Satışta mı? {props.mark.on_sale ? props.mark.on_sale :""}</span>
                                    <br/>
                                    <span className="subtitle is-4">Fiyat: {props.mark.price ? props.mark.price:""}</span>
                                    <span className="subtitle is-4"> / Satış Fiyatı: {props.mark.regular_price ? props.mark.regular_price:""}</span>
                              </div>                              
                        </div>


                  </div>  
                  <div className="column is-one-quarter is-one-quarters-mobile rightFrame">
                        <div className="">
                        {
                              props.marks? props.marks
                              .map(mark => (
                                          <div onClick={props.onMarkChange(mark)} key={mark.id}  className={mark.backColor}>{mark.attributes[0].value} / {mark.regular_price} TL</div> 
                               )) : null
                        }
                        </div>
                  </div>
            </div>
     );  
};



export default MarkItem;
