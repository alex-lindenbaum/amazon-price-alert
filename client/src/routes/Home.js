import React from 'react';

import '../styles/Home.css';

export default () => {
    return (
        <div id="home">
            <p><i><b>Amazon Price Alert</b></i> is a tool meant to optimize your experience with Amazon. Keeping track of your shopping cart is difficult, and you need to know when prices change.</p>

            <p>This application manages any items that you want to track. Add the link to the product's page and your target price, and we will email you when the current price falls below.</p>

            <p>While this app stores your items, python code runs in the background to constantly look for updates. You can count on our code to notify you when the price drops to what you want.</p>

            <p>To get started, click "Sign Up" at the top of the page.</p>

            <p>***INSERT PROPS TO DEVS HERE***</p>
        </div>
    );
};