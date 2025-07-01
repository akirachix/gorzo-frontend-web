import React from 'react';
import InputField from '../sharedcomponent/inputField';
import './signUp.css';
import { Button } from '../sharedcomponent/button';
export default function SignUp() {
  return (
    <div className="signup-container">
      <div className='box'>
        <form>
          <h1>Sign Up</h1>
          <InputField
            label="First Name"
            placeholder="Enter your first name"
            name="firstName"
            value=""

          />
          <InputField
            label="Last Name"
            placeholder="Enter your last name"
            name="lastName"
            value=""

          />
          <InputField
            label="Phone Number"
            placeholder="Enter your phone number"
            name="phone"
            value=""

          />
          <InputField
            label="PIN"
            placeholder="Enter your PIN"
            type="password"
            name="pin"
            value=""

          />
          <InputField
            label="Confirm PIN"
            placeholder="Confirm your PIN"
            type="password"
            name="confirmPin"
            value=""

          />
          <Button
            text={'submit'}
            variant={"primary"} />
          <p>Already have an account? <span className='highlight'>Sign in</span></p>
        </form>
      </div>
    </div>
  );
}