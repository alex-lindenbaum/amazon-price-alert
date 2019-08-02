const jwt = require('jsonwebtoken');
const User = require('../models/user');

signToken = user => {
    return jwt.sign({
        iss: 'AmazonWebScraper',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setHours(new Date().getHours() + 1)
    }, process.env.JWT_SECRET);
};

module.exports = {
    signUp: async (req, res, next) => {
        const { email, password } = req.value.body;

        const foundUser = await User.findOne({ email });
        if (foundUser)
            return res.status(403).json({ error: 'Email is already in use' });

        const newUser = new User({ email, password });
        await newUser.hashPassword();
        await newUser.save();

        const token = signToken(newUser);

        res.status(200).json({ token });
    },

    signIn: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    }
};