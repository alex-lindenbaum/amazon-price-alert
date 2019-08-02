import React from 'react';

import '../styles/ItemBar.css';

// props: item, toggleSendAlerts, removeItem
export default props => {
    let { title, uri, targetPrice, currentPrice, lastTimeChecked, sendAlerts } = props.item;
    const anchorTitle = title ? title.slice(0, 20) + '...' : uri.slice(0, 20) + '...';
    const currentPriceTitle = currentPrice ? '$' + currentPrice : '';

    return (
        // <div className="item-bar">
        //     <ul>
        //         <li><a
        //             href={uri}
        //             rel="noopener noreferrer"
        //             target="_blank">
        //             {anchorTitle}
        //         </a></li>
        //         <li>Target: ${targetPrice}</li>
        //         {currentPrice && <li>Current: ${currentPrice}</li>}
        //         {lastTimeChecked && <li>Last Time Checked: {lastTimeChecked}</li>}
        //     </ul>

        //     <div>
        //         <button
        //             className={sendAlerts ? 'tracking' : 'track'}
        //             onClick={() => props.toggleSendAlerts(props.item)}>
        //             {sendAlerts ? 'Tracking' : 'Track'}
        //         </button>
        //         <button className="remove" onClick={() => props.removeItem(props.item)}>Remove</button>
        //     </div>
        // </div>

        <tr className="item-bar">
            <td><a href="uri">{anchorTitle}</a></td>
            <td>{'$' + targetPrice}</td>
            <td>{currentPriceTitle}</td>
            <td>{lastTimeChecked}</td>

            <td className="button-td">
                <button
                    className={sendAlerts ? 'tracking' : 'track'}
                    onClick={() => props.toggleSendAlerts(props.item)}>
                    {sendAlerts ? 'Tracking' : 'Track'}
                </button>
                <button className="remove" onClick={() => props.removeItem(props.item)}>Remove</button>
            </td>
        </tr>
    );
};