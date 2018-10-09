import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import CarOptions from './carOptions';
import api from '../../lib/api';
import PartSearchButton from './partSearchButton';

export default class CarPartFilter extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
		selectedCarOptions: {},
		marks : 
			[{
				id: '15b84183c6240ba36a00f1580',
				name: 'Marka',
				control: 'select',
				required: false,
				position: 1,
				values: []
			}],
		selectedModelOptions: {},
		models : 
			[{
				id: '15b84183c6240ba36a00f1580',
				name: 'Model',
				control: 'select',
				required: false,
				position: 1,
				values: []
			}],
		selectedYearOptions : {},
		years :
			[{
				id: '15b84183c6240ba36a00f1580',
				name: 'Yıl',
				control: 'select',
				required: false,
				position: 1,
				values: []
			}],
		selectedEngineOptions : {},
		engines : 
			[{
				id: '15b84183c6240ba36a00f1580',
				name: 'Motor Tipi',
				control: 'select',
				required: false,
				position: 1,
				values: []
			}],
		fuels : 
			[{
				id: '15b84183c6240ba36a00f1580',
				name: 'Yakıt',
				control: 'select',
				required: false,
				position: 1,
				values: []
			}]
			
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

	onCarOptionChange = (optionId, valueId) => {
		let { marks } = this.state;
		let { selectedCarOptions } = this.state;
		let { selectedModelOptions } = this.state;
		
		const markName = marks[0].values.find(k=> k.id == valueId).name;

		if (valueId === '') {
			delete selectedCarOptions[valueId];
		} else {
			selectedCarOptions = markName;
		}
		 this.setState({ selectedCarOptions: markName });
		 this.setState({ selectedModelOptions: "Seçiniz..." });

		 this.fetchmodels(markName);
	}
	
	onModelOptionChange = (optionId, valueId) => {
		let { models } = this.state;
		let { selectedCarOptions } = this.state;
		let { selectedModelOptions } = this.state;

		const modelName = models[0].values.find(k=> k.id == valueId).name;

		if (valueId === '') {
			delete selectedModelOptions[valueId];
		} else {
			selectedModelOptions = modelName;
		}
		 this.setState({ selectedModelOptions: modelName });
		 this.fetchyears(selectedCarOptions, modelName);
	}

	onYearOptionChange = (optionId, valueId) => {
		let { years } = this.state;
		let { selectedCarOptions } = this.state;
		let { selectedModelOptions } = this.state;
		let { selectedYearOptions } = this.state;

		const yearValue = years[0].values.find(k=> k.id == valueId).name;

		if (valueId === '') {
			delete selectedYearOptions[valueId];
		} else {
			selectedYearOptions = yearValue;
		}
		 this.setState({ selectedYearOptions: yearValue });
		 this.fetchengines(selectedCarOptions, selectedModelOptions, yearValue);
	}	

	onEngineOptionChange = (optionId, valueId) => {
		let { engines } = this.state;
		let { selectedCarOptions } = this.state;
		let { selectedModelOptions } = this.state;
		let { selectedYearOptions } = this.state;
		let { selectedEngineOptions } = this.state;

		const engineValue = engines[0].values.find(k=> k.id == valueId).name;

		if (valueId === '') {
			delete selectedEngineOptions[valueId];
		} else {
			selectedEngineOptions = engineValue;
		}
		 this.setState({ selectedEngineOptions: engineValue });
		 this.fetchfuels(selectedCarOptions, selectedModelOptions, selectedYearOptions, selectedEngineOptions);
	}	
	
	onFuelOptionChange = (optionId, valueId) => {
		let { fuels } = this.state;
		let { selectedCarOptions } = this.state;
		let { selectedModelOptions } = this.state;
		let { selectedYearOptions } = this.state;
		let { selectedEngineOptions } = this.state;
		let { selectedFuelOptions } = this.state;

		const fuelValue = fuels[0].values.find(k=> k.id == valueId).name;

		if (valueId === '') {
			delete selectedFuelOptions[valueId];
		} else {
			selectedFuelOptions = fuelValue;
		}
		 this.setState({ selectedFuelOptions: fuelValue });

		 var partFilter = {
			 'selectedMark' : selectedCarOptions,
			 'selectedModel' : selectedModelOptions,
			 'selectedYear' : selectedYearOptions,
			 'selectedEngine' : selectedEngineOptions,
			 'selectedFuel' : selectedFuelOptions
		 }
		 this.props.props.setPartFilter(partFilter);
	}	
	
	fetchmarks = ({	}) => {
		const filter = {
		};

		var carComboIndex = 0;
		function increase () {
			return carComboIndex = carComboIndex + 1;
		}

		api.ajax.marks
			.list(filter)
			.then(({ json }) => {
				if(this._isMounted){
					let newState = Object.assign({}, this.state);
					var y = json.map(o => ({id: increase(), name: o}));
					var x = [];
					x.push(...y);
					newState.marks[0].values = x;
					this.setState(newState);
				}
			})
			.catch(() => {});
	};

	fetchmodels = (markName) => {
		const getFilter = (mark, offset = 0) => {
			let filter = {
				marks: mark,
				offset: offset
			};
		
			return filter;
		};
		var carComboIndex = 0;
		function increase () {
			return carComboIndex = carComboIndex + 1;
		}
		let filter =getFilter(markName);
		api.ajax.models
			.list(filter)
			.then(({ json }) => {
				if(this._isMounted){
					let newState = Object.assign({}, this.state);
					var y = json.map(o => ({id: increase(), name: o}));
					var x = [];
					x.push(...y);
					newState.models[0].values = x;
					this.setState(newState);					
				}
			})
			.catch(() => {});
	};	

	fetchyears = (markName, modelName) => {
		const getFilter = (mark, model, offset = 0) => {
			let filter = {
				marks: mark,
				models: model,
				offset: offset
			};
		
			return filter;
		};
		var carComboIndex = 0;
		function increase () {
			return carComboIndex = carComboIndex + 1;
		}
		let filter =getFilter(markName, modelName);
		api.ajax.years
			.list(filter)
			.then(({ json }) => {
				if(this._isMounted){
					let newState = Object.assign({}, this.state);
					var y = json.map(o => ({id: increase(), name: o}));
					var x = [];
					x.push(...y);
					newState.years[0].values = x;
					this.setState(newState);					
				}
			})
			.catch(() => {});
	};
	
	fetchengines = (markName, modelName, year) => {
		const getFilter = (mark, model, offset = 0) => {
			let filter = {
				marks: mark,
				models: model,
				years: year,
				offset: offset,
			};
		
			return filter;
		};
		var carComboIndex = 0;
		function increase () {
			return carComboIndex = carComboIndex + 1;
		}
		let filter =getFilter(markName, modelName, year);
		api.ajax.engines
			.list(filter)
			.then(({ json }) => {
				if(this._isMounted){
					let newState = Object.assign({}, this.state);
					var y = json.map(o => ({id: increase(), name: o}));
					var x = [];
					x.push(...y);
					newState.engines[0].values = x;
					this.setState(newState);					
				}
			})
			.catch(() => {});
	};	

	fetchfuels = (markName, modelName, year, engine) => {
		const getFilter = (mark, model, offset = 0) => {
			let filter = {
				marks: mark,
				models: model,
				years: year,
				engines: engine,
				offset: offset,
			};
		
			return filter;
		};
		var carComboIndex = 0;
		function increase () {
			return carComboIndex = carComboIndex + 1;
		}
		let filter =getFilter(markName, modelName, year, engine);
		api.ajax.fuels
			.list(filter)
			.then(({ json }) => {
				if(this._isMounted){
					let newState = Object.assign({}, this.state);
					var y = json.map(o => ({id: increase(), name: o}));
					var x = [];
					x.push(...y);
					newState.fuels[0].values = x;
					this.setState(newState);					
				}
			})
			.catch(() => {});
	};	

	partSearch = search => {
		let { selectedCarOptions, selectedModelOptions, selectedYearOptions,  selectedEngineOptions, selectedFuelOptions } = this.state;
		search = selectedCarOptions +'-'+ selectedModelOptions +'-'+ selectedYearOptions +'-'+ selectedEngineOptions +'-'+ selectedFuelOptions;

		if (this.props.currentPage.path === '/search') {
			this.props.props.setSearch(search);
		} else {
			if (search && search !== '') {
				this.props.props.setLocation('/search?search=' + search);
				this.props.props.setSearch("");
			}
		}
	};

	render() {
		var {marks}  = this.state;
		var {models}  = this.state;
		var {years}  = this.state;
		var {engines}  = this.state;
		var {fuels}  = this.state;

		return (
			<div className="mini-car">
				<CarOptions options={marks} 
					onChange={this.onCarOptionChange}
				/>
				<CarOptions options={models} 
					onChange={this.onModelOptionChange}
				/>
				<CarOptions options={years} 
					onChange={this.onYearOptionChange}
				/>
				<CarOptions options={engines} 
					onChange={this.onEngineOptionChange}
				/>
				<CarOptions options={fuels} 
					onChange={this.onFuelOptionChange}
				/>
				<PartSearchButton
					partSearchItem={this.partSearch}
				/>
			</div>
		);
	}
}
