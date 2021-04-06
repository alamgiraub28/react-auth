import React, { useContext, useState } from 'react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Col, Container, Row, Button } from 'react-bootstrap';


const Login = () => {
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
    });


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }

    // SignIn with Google
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signdInUser = { name: displayName, email }
                setLoggedInUser(signdInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    // validation
    const handleBlur = (event) => {
        console.log(event.target.name, event.target.value);
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (
            event.target.name === 'password' ||
            event.target.name === 'confirmPassword'
        ) {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    // Form Submit
    const handleSubmit = (event) => {
        if (newUser && user.email && (user.password === user.confirmPassword)) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res);
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                })
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res);
                    const newUserInfo = res.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(function (error) {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                })
        }
        event.preventDefault();
    }
    // update user
    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('user update successfully')
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <Container className='p-4 text-center'>
            <Row>
                <Col lg={4} md={6} sm={12} className="m-auto">
                    <form onSubmit={handleSubmit} className='bg-light p-3 rounded'>
                        <legend className="">{newUser ? 'Create an account' : 'Login'}</legend>

                        {user.success && (
                            <p className='text-success'>
                                Account {newUser ? 'created' : 'logged in'}{' '}
                                successfully.
                            </p>
                        )}

                        <p className='text-danger'>{user.error}</p>

                        {newUser && (
                            <input type='text' className='form-control' name='name' onBlur={handleBlur} placeholder='Name' required />
                        )}  <br />

                        <input type='email' className='form-control' name='email' onBlur={handleBlur} placeholder='Enter Email' required />  <br />

                        <input type='password' className='form-control' name='password' onBlur={handleBlur} placeholder='Password' required />  <br />

                        {newUser && (
                            <input type='password' name='confirmPassword' className='form-control' onBlur={handleBlur} placeholder='Confirm Password' required />
                        )}

                        {!newUser && (
                            <div className='form-group form-check text-left'>
                                <input type='checkbox' className='form-check-input' id='exampleCheck1' />
                                <label className='form-check-label' htmlFor='exampleCheck1'> Remember Me </label>
                            </div>
                        )} <br />

                        <input type='submit' className='btn btn-primary form-control' value={newUser ? 'Create an account' : 'Login'} />
                    </form> <br />

                    <h6 className="text-light p-2 rounded">
                        {newUser
                            ? 'Already have an account?'
                            : "Don't have an account?"}{' '}
                        <span
                            className='text-warning'
                            style={{ cursor: 'pointer' }}
                            onClick={() => setNewUser(!newUser)}
                        >
                            {newUser ? 'Login' : 'Create an account'}
                        </span>{' '}
                    </h6>
                    <hr />
                    <Button variant='primary' onClick={handleGoogleSignIn}> <FontAwesomeIcon icon={faGoogle} /> Continue with Google </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;