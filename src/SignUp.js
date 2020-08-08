import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (count = count+1)
  );
  return count;
}

class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {
          username: '',
          email: '',
          password: '',
          gender: 'female'
        },
        formValid: false,
        errorCount: null,
        errors: {
          fullName: '',
          email: '',
          password: '',
        }
      };
    }

    handleChange = (event) => {
        event.preventDefault();
        
        const { name, value } = event.target;
        console.log(value);

        let errors = this.state.errors;
        let data= this.state.data;

        switch (name) {
          case 'fullName': 
            // data.fullName = value;
            errors.fullName = 
              value.length < 5
                ? 'Full Name must be 5 characters long!'
                : '';
                data.username = errors.fullName == '' ? value : '';          
            break;
          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
              data.email = errors.email == '' ? value : ''; 

            break;
          case 'password': 
              errors.password =
              value.length < 8
                ? 'Password must be 8 characters long!'
                : '';
                data.password= errors.password == '' ? value : ''; 
            break;
          default:
            break;
        }
        this.setState({data, [name]: value})
        this.setState({errors, [name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({formValid: validateForm(this.state.errors)});
        this.setState({errorCount: countErrors(this.state.errors)});
        // console.log(this.state.data);
        let data=this.state.data;
        fetch('http://todoapp.ahmedrohym.com/api.php?apicall=signup', {
          method: 'POST', // or 'PUT'
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',


          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

   
    redirectLogin =() =>{
      if (this.state.formValid === true)
        return window.location.href="sign-in";

    }



    

    render() {
        const {errors, formValid} = this.state;
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className='form-group'>
                        <label>Full Name</label>
                        <input type='text' name='fullName' className="form-control" onChange={this.handleChange} noValidate />
                        {errors.fullName.length > 0 && 
                            <span className='error'>{errors.fullName}</span>}
                    </div>

                    <div className='form-group'>
                        <label>Email</label>
                        <input type='email' name='email' className="form-control" onChange={this.handleChange} noValidate />
                        {errors.email.length > 0 && 
                            <span className='error'>{errors.email}</span>}
                    </div>

                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' name='password' className="form-control" onChange={this.handleChange} noValidate />
                        {errors.password.length > 0 && 
                            <span className='error'>{errors.password}</span>}
                    </div>

            
                <div className='info'>
                <small>Password must be eight characters in length.</small>
                </div>
                <div >
                   
                    <button className='btn btn-primary' onClick={this.redirectLogin}>Sign Up</button>
                </div>
                {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : 'Form not submitted'}
            </form>
            </div>
        </div>
    );
  }
}

export default SignUp;