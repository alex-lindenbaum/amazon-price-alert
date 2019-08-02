import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import '../styles/Dashboard.css';

import ItemBar from '../components/ItemBar';
import NewItem from '../components/NewItem';

import { fetchItems, postItems } from '../helpers/api';
import { validateBody, schemas } from '../helpers/validate';

// props: token, setAlertMessage
export default props => {
    if (!props.token)
        return <Redirect to='/signup' />;

    const { token, setAlertMessage } = props;
    const [items, setItems] = useState(null);

    // null means no changes have been made before save
    const [initItems, setInitItems] = useState(null);

    useEffect(() => {
        setAlertMessage('Successfully signed in.');

        fetchItems(token, userItems => {
            setItems(userItems);
        }, (error, message) => {
            setAlertMessage(message);
            console.log(error);
        });
    }, [token, setAlertMessage]);

    const addInitItemsConditionally = () => {
        if (!initItems)
            setInitItems(items);
    }

    const removeItem = deleteItem => {
        addInitItemsConditionally();

        const newItems = items.filter(item => item.uri !== deleteItem.uri);
        setItems(newItems);
    };

    const toggleSendAlerts = index => {
        return item => {
            addInitItemsConditionally();

            let newItems = [...items];
            newItems.splice(index, 1, { ...item, sendAlerts: !item.sendAlerts });
            setItems(newItems);
        }
    }

    const addItem = item => {
        const newItem = { ...item, sendAlerts: true };

        if (!validateBody(schemas.newItemSchema)(newItem).error) {
            addInitItemsConditionally();
            setItems([...items, newItem]);
        }
        else
            setAlertMessage('Please enter a valid URL and target price.');
    }

    const saveItems = async () => {
        const result = await postItems(token, items);

        if (result) {
            setAlertMessage('Items successfully saved.');
            setInitItems(null);
        }
        else
            setAlertMessage('Sorry, an error occurred.');
    };

    const undo = () => {
        setItems(initItems);
        setInitItems(null);
    }

    const removeAllItems = () => {
        addInitItemsConditionally();
        setItems([]);
    };

    if (items)
        return (
            <div id="dashboard">
                <table>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Target Price</th>
                            <th>Current Price</th>
                            <th>Last Time Checked</th>
                            <th></th>
                        </tr>
                        {items.map((item, index) => {
                            return <ItemBar
                                key={item.uri}
                                item={item}
                                removeItem={removeItem}
                                toggleSendAlerts={toggleSendAlerts(index)}
                            />;
                        })}
                    </tbody>
                </table>

                <NewItem addItem={addItem} />

                <div id="dashboard-buttons">
                    <button id="save" onClick={saveItems}>Save</button>
                    {initItems && <button id="undo" onClick={undo}>Undo</button>}
                    <button id="remove-all" onClick={removeAllItems}>Remove All</button>
                </div>
            </div>
        );

    return <p>Loading</p>;
};