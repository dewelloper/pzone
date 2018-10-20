import React from 'react';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import PZButton from './pzbutton';


const MarkItem = (props) => {
      return(
            <div className="column is-four-fifths is-four-quarters-mobile containerFrame ">
            <div className="columns is-mobile">
                  <div className="column is-three-quarters is-three-quarters-mobile field is-grouped leftFrame">
                        <ul className="leftFrameUl">
                              <li className="button is-success is-medium">Sepete Ekle</li>
                              <li className="button is-warning is-medium">Detaya Git</li>
                        </ul>
                  </div>  
                  <div className="column is-one-quarter is-one-quarters-mobile rightFrame">
                        <ul className="rightFrameUl">
                        {
                              props.marks
                              .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
                              .map((obj, id) => (
                                    <li key={id}>
                                          <button onClick={props.onMarkChange(obj.name+'aa')} key={id}  className="button is-info">{obj.name}</button> 
                                    </li>
                               ))
                        }
                        </ul>
                  </div>
            </div>
            </div>
     );  
};



export default MarkItem;
