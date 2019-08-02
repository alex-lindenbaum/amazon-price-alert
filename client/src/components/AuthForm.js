import React, { useState } from 'react';

// props: handleSubmit, formName
export default props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        await props.handleSubmit({ email, password });
    };

    return (
        <form id="auth-form" onSubmit={handleSubmit}>
            <label>
                Email:
                <br />
                <input type="text" onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <br />
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>

            <input type="submit" value={props.formName} />
        </form>
    );
};