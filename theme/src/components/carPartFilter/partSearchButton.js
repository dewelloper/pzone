import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const PartSearchButton = ({ partSearchItem }) => {
	let buttonStyle = {};
	buttonStyle.color = themeSettings.button_addtocart_bg;

	let searchPartText = 'Ara';

	return (
		<button
			className="button is-link is-focused is-fullwidth"
			style={buttonStyle}
			onClick={partSearchItem}
		>
			    <span className="icon is-small">
				<i className="fas fa-search"></i>
				</span>
				<span>{searchPartText}</span>		
		</button>
	);
};

export default PartSearchButton;
