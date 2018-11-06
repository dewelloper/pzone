import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import MarkItem from './item';
import api from '../../lib/api';



export default class MarkSelector extends React.Component {
	_firstLoad = false;
	constructor(props) {
		super(props);
		this.state = {
			mark: {name:"", sku:"", meta_title:""},
			marks: []
		};
	}

	onMarkChange(data) {
		let newState = Object.assign({}, this.state);
		newState.mark = this.state.marks.find(k=> k.attributes[0].value === data.target.innerText.split('/')[0].trim());
		this.setState(newState);
	}

	addToCart() {
		const { addCartItem } = this.props;

		let item = {
			product_id: this.state.mark.id,
			quantity: 1
		};

		addCartItem(item);
	}
	
	render() {
		var uniqs = [];
		function UniqMarks(m) {
			var isFound = 0;
			uniqs.forEach(k=> {
				if(k.attributes[0].value.indexOf(m.attributes[0].value) !== -1)
					isFound = 1
			})
			if(isFound === 0)
				uniqs.push(m);
			return;
		}

		if(!this._firstLoad && this.props.products !== undefined && this.props.products.length > 0){
			let arr = this.props.products;
			this.props.products.filter(UniqMarks);
			
			var bulmaBtnInf = ["button is-fullwidth is-info is-rounded btnMargin","button is-fullwidth is-warning is-rounded btnMargin","button is-fullwidth is-danger is-rounded btnMargin","button is-fullwidth is-success is-rounded btnMargin","button is-fullwidth is-link is-rounded btnMargin"];
			var ind = 0;
			uniqs = uniqs.map(k=> {
				if(ind > 4) ind=0;
				return Object.assign({}, k, {
					backColor : bulmaBtnInf[ind++]
				  });
			})

			let newState = Object.assign({}, this.state);
			newState.marks = uniqs.sort((a, b) => a.regular_price - b.regular_price);
			newState.mark = newState.marks[0];
			this.setState(newState);
			this._firstLoad = true;
		}

		return (
			<div className="columns is-centered is-mobile markControlHeight">
				<MarkItem marks={this.state.marks}
					onMarkChange={() => this.onMarkChange.bind(this)}
					mark={this.state.mark}
					addCartItem={() => this.addToCart.bind(this)}
				/>

			</div>
		);
	}
}
