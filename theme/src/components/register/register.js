import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { themeSettings, text } from '../../lib/settings';

const validateRequired = value =>
	value && value.length > 0 ? undefined : text.required;

const validateEmail = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
		? text.emailInvalid
		: undefined;

const ReadOnlyField = ({ name, value }) => {
	return (
		<div className="checkout-field-preview">
			<div className="name">{name}</div>
			<div className="value">{value}</div>
		</div>
	);
};

const InputField = field => (
	<div className={field.className}>
		<label htmlFor={field.id}>
			{field.label}
			{field.meta.touched && field.meta.error && (
				<span className="error">{field.meta.error}</span>
			)}
		</label>
		<input
			{...field.input}
			placeholder={field.placeholder}
			type={field.type}
			id={field.id}
			className={field.meta.touched && field.meta.error ? 'invalid' : ''}
		/>
	</div>
);

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			comparePassword: ''
		};
	}

	passwordTemp = value => {
		this.setState({ comparePassword: value.currentTarget.defaultValue });
	};

	getField = fieldName => {
		const fields = this.props.checkoutFields || [];
		const field = fields.find(item => item.name === fieldName);
		return field;
	};

	getFieldStatus = fieldName => {
		const field = this.getField(fieldName);
		return field && field.status ? field.status : 'required';
	};

	isFieldOptional = fieldName => {
		return this.getFieldStatus(fieldName) === 'optional';
	};

	isFieldHidden = fieldName => {
		return this.getFieldStatus(fieldName) === 'hidden';
	};

	getFieldValidators = fieldName => {
		const isOptional = this.isFieldOptional(fieldName);
		let validatorsArray = [];
		if (!isOptional) {
			validatorsArray.push(validateRequired);
		}
		if (fieldName === 'email') {
			validatorsArray.push(validateEmail);
		}
		if (fieldName === 'password_verify') {
			validatorsArray.push(this.confirmPassword);
		}

		return validatorsArray;
	};

	confirmPassword = value => {
		if (value !== this.state.comparePassword) {
			return text.password_verify_failed;
		}
		return undefined;
	};

	getFieldPlaceholder = fieldName => {
		const field = this.getField(fieldName);
		return field && field.placeholder && field.placeholder.length > 0
			? field.placeholder
			: '';
	};

	getFieldLabelText = fieldName => {
		const field = this.getField(fieldName);
		if (field && field.label && field.label.length > 0) {
			return field.label;
		} else {
			switch (fieldName) {
				case 'first_name':
					return text.first_name;
					break;
				case 'last_name':
					return text.last_name;
					break;
				case 'email':
					return text.email;
					break;
				case 'password':
					return text.password;
					break;
				case 'password_verify':
					return text.password_verify;
					break;
				default:
					return 'Unnamed field';
			}
		}
	};

	getFieldLabel = fieldName => {
		const labelText = this.getFieldLabelText(fieldName);
		return this.isFieldOptional(fieldName)
			? `${labelText} (${text.optional})`
			: labelText;
	};

	render() {
		const { handleSubmit, register } = this.props;

		const registerButtonClassName = 'account-button button';
		const inputClassName = 'login-input-field';
		const titleClassName = 'login-title';
		const errorAlertText = 'error-alert-text';
		return (
			<div className="login-container">
				<form onSubmit={handleSubmit} className="login-form">
					<div className="register-section">
						<h2 className={titleClassName}>{text.register_title}</h2>

						{!register && register !== undefined ? (
							<p className={errorAlertText}>{text.registry_failed}</p>
						) : (
							''
						)}
						{!this.isFieldHidden('first_name') && (
							<Field
								className={inputClassName}
								name="first_name"
								id="customer.first_name"
								component={InputField}
								type="text"
								label={this.getFieldLabel('first_name')}
								validate={this.getFieldValidators('first_name')}
								placeholder={this.getFieldPlaceholder('first_name')}
							/>
						)}

						{!this.isFieldHidden('last_name') && (
							<Field
								className={inputClassName}
								name="last_name"
								id="customer.last_name"
								component={InputField}
								type="text"
								label={this.getFieldLabel('last_name')}
								validate={this.getFieldValidators('last_name')}
								placeholder={this.getFieldPlaceholder('last_name')}
							/>
						)}

						{!this.isFieldHidden('email') && (
							<Field
								className={inputClassName}
								name="email"
								id="customer.reg_email"
								component={InputField}
								type="email"
								label={this.getFieldLabel('email')}
								validate={this.getFieldValidators('email')}
								placeholder={this.getFieldPlaceholder('email')}
							/>
						)}

						{!this.isFieldHidden('password') && (
							<Field
								className={inputClassName}
								name="password"
								id="customer.reg_password"
								component={InputField}
								type="password"
								label={this.getFieldLabel('password')}
								onBlur={this.passwordTemp}
								validate={this.getFieldValidators('password')}
								placeholder={this.getFieldPlaceholder('password')}
							/>
						)}

						{!this.isFieldHidden('password_verify') && (
							<Field
								className={inputClassName}
								name="password_verify"
								id="customer.reg_password_verify"
								component={InputField}
								type="password"
								label={this.getFieldLabel('password_verify')}
								validate={this.getFieldValidators('password_verify')}
								placeholder={this.getFieldPlaceholder('password_verify')}
							/>
						)}

						<div className="login-button-wrap">
							<button type="submit" className={registerButtonClassName}>
								{text.register}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'Register'
})(Register);
