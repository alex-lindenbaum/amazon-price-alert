const Item = require('../models/item');

module.exports = {
    getUserItems: async user => {
        let items = [];

        // Using for..of loop to handle async calls
        for (const itemId of user.itemIds) {
            const item = await Item.findById(itemId);
            if (!item)
                return null;

            items.push(item);
        }

        return items;
    },

    addNewItem: async (entry, user) => {
        const newItem = new Item({
            uri: entry.uri,
            users: [{
                email: user.email,
                targetPrice: entry.targetPrice,
                sendAlerts: entry.sendAlerts
            }]
        });

        await newItem.save();

        return newItem;
    },

    updateUsersItem: async (item, entry, user) => {
        const { targetPrice, sendAlerts } = entry;

        let userData = item.users.find(u => u.email === user.email);

        if (!userData) {
            // Item in collection, but not connected to this user
            item.users.push({
                email: user.email,
                targetPrice,
                sendAlerts
            });
        } else {
            // Item holds user
            userData.targetPrice = targetPrice;
            userData.sendAlerts = sendAlerts;
        }

        await item.save();
    },

    removeUsersfromItems: async (deleteIds, user) => {
        for (const id of deleteIds) {
            let item = await Item.findById(id);

            // We know that item is connected to user
            let index = 0;
            let userData = item.users[0];

            while (userData.email !== user.email) {
                index++;
                userData = item.users[index];
            }

            // Remove user data
            item.users.splice(index, 1);

            await item.save();
        }
    }
};