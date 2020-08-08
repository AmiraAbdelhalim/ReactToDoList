import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          data: {
            username: '',
            password: '',
          },
          formValid: false,
          errorCount: null,
          errors: {
            username: '',
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
          case 'username': 
            // data.fullName = value;
            errors.username = 
              value.length < 5
                ? 'Full Name must be 5 characters long!'
                : '';
                data.username = errors.username == '' ? value : '';          
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
        console.log(this.state.data);

        let data=this.state.data;

        fetch('http://todoapp.ahmedrohym.com/api.php?apicall=login', {
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
  
  
  redirectTodo =(e) =>{
    if (this.state.formValid === true){
        return window.location.href="todo";
    }
  }

    render(){
        const {errors, formValid} = this.state;
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
                <h2>Sign In</h2>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className='form-group'>
                        <label>Full Name</label>
                        <input type='text' name='username' className="form-control" onChange={this.handleChange} noValidate />
                        {errors.username.length > 0 && 
                            <span className='error'>{errors.username}</span>}
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
                   
                    <button className='btn btn-primary' onClick={this.redirectLogin}>Sign In</button>
                </div>
                {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : 'Form not submitted'}
            </form>
            </div>
        </div>
    );
    }
}


export default Login;