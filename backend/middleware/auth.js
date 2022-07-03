const { json } = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');

module.exports = {
    userVerify: async (req, res, next) => {
        try {
            let auth = req.headers.authorization;
            console.log(auth);
            if (!auth) {
                return res.status(401).json({
                    message: 'Token not found'
                })
            }
            let token = auth.split(" ")[1];
            let decodedData = jwt.decode(token, '12345');
            if (decodedData.exp < Date.now() / 1000) {
                return res.status(401).json({
                    message: 'Token expired'
                })
            }
            console.log(decodedData);
            var user = await UserModel.findById(decodedData._id)
            if (!user) {
                return res.status(422).json({
                    message: 'Token invalid'
                })
            }
            req.user = user
            next();
        } catch (error) {
            console.error(error);
            return res.status().json({
                message: 'Internal server error'
            })
        }
    },
}