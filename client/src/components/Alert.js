import React from 'react';

import '../styles/Alert.css';

// props: message, handleClick
export default props => {
    return (
        <div className="alert">
            <p>{props.message}</p>
            <button onClick={props.handleClick}>Dismiss</button>
        </div>
    );
};