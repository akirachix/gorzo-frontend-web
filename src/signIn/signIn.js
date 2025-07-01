import React from "react";
import InputField from "../sharedcomponent/inputField";
import '../signUp/signUp.css';
import { Button } from "../sharedcomponent/button";
export default function SignIn() {
    return (
        <div className="signup-container">
            <div className="box">
              
                <form> 
                       <h1>WELCOME BACK!</h1>
                       <h1>Sign In</h1>
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
                    <p id="forget">Forget PIN?</p>
                    <Button
                        text={'submit'}
                        variant={"primary"} />
                    <p>Don't have an account? <span className='highlight'>Sign Up</span></p>
                </form>
            </div>





        </div>
    )
}
