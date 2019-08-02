export const authenticate = path => {
    return async (user, onSuccess, onFail) => {
        try {
            const res = await fetch('http://localhost:8000/auth/' + path, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            if (res.status === 403)
                onFail(null, 'This email is already connected to an account.');
            else if (res.status === 401)
                onFail(null, 'Sorry, we could not find your account.');
            else {
                const data = await res.json();
                onSuccess(data.token);
            }
        } catch (error) {
            onFail(error, 'Sorry, we could not connect to the server.');
        }
    }
};

export const fetchItems = async (token, onSuccess, onFail) => {
    try {
        const res = await fetch('http://localhost:8000/items/all', {
            method: 'GET',
            headers: {
                Authorization: token
            }
        });
        const data = await res.json();

        onSuccess(data.userItems);
    } catch (error) {
        onFail(error, 'Failed to retrieve your items.');
    }
};

export const postItems = async (token, items) => {
    const preparedItems = items.map(item => {
        return { uri: item.uri, targetPrice: item.targetPrice, sendAlerts: item.sendAlerts };
    });

    try {
        const res = await fetch('http://localhost:8000/items/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({ items: preparedItems })
        });

        if (res.status === 200)
            return true;

        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}