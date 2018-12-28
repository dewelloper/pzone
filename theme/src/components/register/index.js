import React from 'react';
import { Redirect } from 'react-router-dom';
import { themeSettings, text } from '../../lib/settings';
import Register from './register';

export default class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleContactsSubmit = values => {
		this.props.registerUser({
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
			password: values.password,
			history: this.props.history
		});
	};

	render() {
		const { settings, register } = this.props.state;

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button',
			checkoutEditButtonClass = 'checkout-button-edit'
		} = themeSettings;

		if (register) {
			return (
				<Redirect
					to={{
						pathname: '/login'
					}}
				/>
			);
		} else {
			return (
				<Register
					inputClassName={checkoutInputClass}
					buttonClassName={checkoutButtonClass}
					editButtonClassName={checkoutEditButtonClass}
					settings={settings}
					register={register}
					onSubmit={this.handleContactsSubmit}
				/>
			);
		}
	}
}
