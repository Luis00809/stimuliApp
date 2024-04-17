import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { validateEmail, checkPassword } from '../utils/helpers';
import AuthService from '../API/auth';

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'email') {
            setEmail(inputValue);
        } else if(inputType === 'password'){
            setPassword(inputValue);
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setErrMsg('invalid email');
            return;
        }

        if(!checkPassword(password)){
            setErrMsg('invalid password')
            return;
        }
        try {
            // Call the login method from AuthService with the email and password
            await AuthService.login(email, password);
            // Redirect the user to the home page or another appropriate page after successful login
            window.location.href = '/';
        } catch (error) {
            // Handle login errors, such as incorrect email or password
            setErrMsg('Login failed. Please check your email and password.');
            console.error('Login failed:', error);
        }
       
        setEmail('');
        setPassword('');
    };
   

    return (
        <div>
            <div>
                <h3>login:</h3>
            </div>
            <div>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} name='email' onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} name='password' onChange={handleInputChange} />
                    </Form.Group>
                    
                    <Button type='submit' variant="info">login</Button>{' '}
             </Form>
             {errMsg && (
                    <div>
                    <p className="error-text">{errMsg}</p>
                    </div>
                )}
            </div>
            
        </div>
    )
}