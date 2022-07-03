const UserModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const dcrypt = require('dcryptjs');

module.exports = {
    signUp: async (req, res) => {
        try {
            var isExistEmail = await UserModel.findOne({ email: req.body.email });
            if (isExistEmail) {
                return res.status(403).json({
                    message: 'Email already exist',
                })
            }
            req.body.password = await dcrypt.hash(req.body.password);
            var user = new UserModel(req.body);
            await user.save();
            var token = jwt.sign({ _id: user._id }, '12345', { expiresIn: '30d' });
            return res.status(200).json({
                message: 'Signed up successfully',
                data: { user, token }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error',
            })
        }
    },

    login: async (req, res) => {
        try {
            let user = await UserModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(403).json({
                    message: 'Incorrect email',
                })
            }
            var isMatched = dcrypt.compare(req.body.password, user.password);
            if (!isMatched) {
                return res.status(403).json({
                    message: 'Incorrect password',
                })
            }
            var token = jwt.sign({ _id: user._id }, '12345', { expiresIn: '30d' });
            return res.status(200).json({
                message: 'Log in successfully',
                data: { user, token }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'internal server error',
            })
        }
    }
}