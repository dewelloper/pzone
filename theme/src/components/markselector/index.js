import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import MarkItem from './item';
import api from '../../lib/api';


export default class MarkSelector extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
        SelectedMarkName: "",
		marks  : [
			{id:1, name: 'Dave',age:50},
			{id:2,name: 'Kellie',age:42},
			{id:3,name: 'Max',age:12},
			{id:4,name: 'Jack',age:12}
		]
	};
	}

	componentDidMount() {
		this._isMounted = true;
		this.fetchmarks(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.fetchmarks(nextProps);
	}


	componentWillUnmount() {
		this._isMounted = false;
	}

	onMarkChange(params) {
		console.log('clicked' + params)
		// let { marks } = this.state;
		// let { selectedCarOptions } = this.state;
		// let { selectedModelOptions } = this.state;
		
		// const markName = marks[0].values.find(k=> k.id == valueId).name;

		// if (valueId === '') {
		// 	delete selectedCarOptions[valueId];
		// } else {
		// 	selectedCarOptions = markName;
		// }
		//  this.setState({ selectedCarOptions: markName });
		//  this.setState({ selectedModelOptions: "Seçiniz..." });

		//  this.fetchmodels(markName);
	}
	
	fetchmarks = ({	}) => {
		// const filter = {
		// };

		// var carComboIndex = 0;
		// function increase () {
		// 	return carComboIndex = carComboIndex + 1;
		// }

		// api.ajax.marks
		// 	.list(filter)
		// 	.then(({ json }) => {
		// 		if(this._isMounted){
		// 			let newState = Object.assign({}, this.state);
		// 			var y = json.map(o => ({id: increase(), name: o}));
		// 			var x = [];
		// 			x.push(...y);
		// 			newState.marks[0].values = x;
		// 			this.setState(newState);
		// 		}
		// 	})
		// 	.catch(() => {});
	};


	partSearch = search => {
		// let { selectedCarOptions, selectedModelOptions, selectedYearOptions,  selectedEngineOptions, selectedFuelOptions } = this.state;
		// search = selectedCarOptions +'-'+ selectedModelOptions +'-'+ selectedYearOptions +'-'+ selectedEngineOptions +'-'+ selectedFuelOptions;

		// if (this.props.currentPage.path === '/search') {
		// 	this.props.props.setSearch(search);
		// } else {
		// 	if (search && search !== '') {
		// 		this.props.props.setLocation('/search?search=' + search);
		// 		this.props.props.setSearch("");
		// 	}
		// }
	};

	render() {

		var {marks}  = this.state;
		var {SelectedMarkName} = this.state;

		return (
			<div className="columns is-centered is-mobile">
				<MarkItem marks={marks} 
                    onMarkChange={() => this.onMarkChange.bind(this)}
				/>
				
			</div>
		);
	}
}
