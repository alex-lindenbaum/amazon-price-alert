import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import '../styles/AuthPage.css';

import AuthForm from '../components/AuthForm';

// props: handleSubmit
export default props => {
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async user => {
        const result = await props.handleSubmit(user);
        if (result)
            setRedirect(true);
    };

    if (redirect)
        return <Redirect to='/dashboard' />;

    return (
        <div className="auth">
            <p>Please enter your email and password so that we can link you to your items. We won't share your email with anyone else, and your password is securely hashed.</p>

            <AuthForm handleSubmit={handleSubmit} formName="Sign Up" />
        </div>
    );
};