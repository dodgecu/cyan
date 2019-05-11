import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { push } from "connected-react-router";

import { updateUser } from "../authorization.action";
import "./user-profile.scss";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";
import Input from "../../../common/components/input/input.component";

import { email } from "../../../common/form-validation";

class UpdateEmail extends Component {
  onSubmit(inputValue) {
    this.props.updateUser(inputValue);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="authorization--form">
        <h2 className="authorization--form__title">Change email</h2>
        <form
          onSubmit={handleSubmit(value =>
            this.onSubmit.bind(this)({ email: value.email })
          )}
        >
          <Field
            name="email"
            type="email"
            component={Input}
            label="Email"
            validate={email}
            initialValues={email}
          />
          <Button title="UPDATE" type="submit" buttonType={TYPES.PRIMARY} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.authReducer.message
});

UpdateEmail = reduxForm({
  form: "update-email"
})(UpdateEmail);

export default connect(
  mapStateToProps,
  { updateUser, push }
)(UpdateEmail);
