import React from 'react';
import * as helper from '../../lib/helper';
import { themeSettings, text } from '../../lib/settings';

const PartSearchButton = ({ partSearchItem }) => {
	let buttonStyle = {};
	buttonStyle.color = themeSettings.button_addtocart_color;

	let searchPartText = 'Ara';

	return (
		<button
			className="button is-success is-fullwidth"
			style={buttonStyle}
			onClick={ChangeMark}
		>
			{MarkNameText}
		</button>
	);
};

export default PartSearchButton;
