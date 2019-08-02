import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import '../styles/App.css';

import Nav from './Nav';
import Footer from './Footer';
import Alert from './Alert';
import Home from '../routes/Home';
import SignUp from '../routes/SignUp';
import SignIn from '../routes/SignIn';
import SignOut from '../routes/SignOut';
import Dashboard from '../routes/Dashboard';

import { validateBody, schemas } from '../helpers/validate';
import { authenticate } from '../helpers/api';

export default () => {
    const [token, setToken] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleAuth = path => {
        return async user => {
            let success = false;
            setAlertMessage('Signing in...');

            if (!user.email)
                setAlertMessage('Please enter an email address.');
            else if (!user.password)
                setAlertMessage('Please enter a password.');
            else if (validateBody(schemas.authSchema)(user).error)
                setAlertMessage('Please enter a valid email adress.');
            else {
                await authenticate(path)(user, newToken => {
                    setToken(newToken);
                    success = true;
                }, (error, message) => {
                    setAlertMessage(message);
                    if (error)
                        console.log(error);
                });
            }

            return success;
        }
    }

    return (
        <div>
            <Nav token={token} />

            <div id="wrapper">
                {alertMessage &&
                    <Alert message={alertMessage} handleClick={() => setAlertMessage(null)} />
                }

                <Route exact path='/' component={Home} />

                <Route
                    exact path='/signup'
                    render={props => <SignUp {...props} handleSubmit={handleAuth('signup')} />}
                />

                <Route
                    exact path='/signin'
                    render={props => <SignIn {...props} handleSubmit={handleAuth('signin')} />}
                />

                <Route
                    exact path='/signout'
                    render={props => <SignOut {...props} setToken={setToken} />}
                />

                <Route
                    exact path='/dashboard'
                    render={props => <Dashboard {...props} token={token} setAlertMessage={setAlertMessage} />}
                />

                <Footer />
            </div>
        </div>
    );
};