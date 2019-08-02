const Item = require('../models/item');
const ItemHelper = require('../helpers/itemhelper');

module.exports = {
    getItems: async (req, res, next) => {
        const items = await ItemHelper.getUserItems(req.user);
        if (!items)
            return res.status(500).json({ error: 'Server could not find item.' });

        // Redact all user information
        let filtered = [];

        for (const item of items)
            for (const user of item.users)
                if (user.email === req.user.email)
                    filtered.push({
                        uri: item.uri,
                        targetPrice: user.targetPrice,
                        sendAlerts: user.sendAlerts,
                        title: item.title,
                        currentPrice: item.currentPrice,
                        lastTimeChecked: item.lastTimeChecked
                    });

        res.status(200).json({ userItems: filtered });
    },

    saveItems: async (req, res, next) => {
        let user = req.user;
        const entries = req.value.body.items;

        let newIds = [];
        let deleteIds = user.itemIds;

        for (const entry of entries) {
            let entryId;
            const queriedItem = await Item.findOne({ uri: entry.uri });

            if (queriedItem) {
                // If item exists in collection, then update data
                await ItemHelper.updateUsersItem(queriedItem, entry, user);
                entryId = queriedItem.id;
            }
            else {
                // Otherwise, add new item
                const newItem = await ItemHelper.addNewItem(entry, user);
                entryId = newItem.id;
            }

            // Algorithm is to remove entry's id from to-be-deleted array
            const index = deleteIds.indexOf(entryId);

            // Old user.itemIds might not have item
            if (index > -1)
                deleteIds.splice(index, 1);

            newIds.push(entryId);
        }

        // Passing deleteIds only for aesthetic
        // (let deleteIds = user.itemIds)
        await ItemHelper.removeUsersfromItems(deleteIds, user);
        user.itemIds = [...newIds];

        await user.save();

        res.status(200).json({ message: 'Items successfully saved.' });
    }
}; 