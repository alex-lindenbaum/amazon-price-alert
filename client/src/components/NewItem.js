import React, { useState } from 'react';

// props: addItem
export default props => {
    const [uri, setUri] = useState('');
    const [targetPrice, setTargetPrice] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        props.addItem({ uri, targetPrice });
        setUri('');
        setTargetPrice('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Amazon Link:
                    <input type="text" value={uri} onChange={e => setUri(e.target.value)} />
                </label>

                <label>
                    Your Target Price:
                    <input type="text" value={targetPrice} onChange={e => setTargetPrice(e.target.value)} />
                </label>

                <input type="submit" value="Add Item" />
            </form>
        </div>
    );
};