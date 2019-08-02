import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Nav.css';

// props: token
export default props => {
    const listItems = () => {
        if (!props.token)
            return (
                <ul>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/signin'>Sign In</Link></li>
                </ul>
            );

        return (
            <ul>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><Link to='/signout'>Sign Out</Link></li>
            </ul>
        );
    };

    return (
        <nav>
            <h1><Link to='/'>Amazon Price Alert</Link></h1>

            {listItems()}
        </nav>
    );
};