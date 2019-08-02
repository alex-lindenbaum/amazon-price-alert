import React from 'react';
import { Redirect } from 'react-router-dom';

//props: setToken
export default props => {
    props.setToken(null);

    return <Redirect to='/' />;
};