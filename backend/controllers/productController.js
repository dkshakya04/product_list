const FavouriteModel = require("../model/FavouriteModel");
const ProductModel = require("../model/ProductModel");
const ObjectId = require('mongoose').Types.ObjectId;
module.exports = {

    productList: async (req, res) => {
        try {
            var { page, limit } = req.query;
            limit = parseInt(limit) || 3;
            skip = (page - 1) * limit || 0;

            let productList = await ProductModel.find()
                .skip(skip)
                .limit(limit)
            let total = await ProductModel.countDocuments();
            return res.status(200).json({
                message: 'Product list',
                data: { productList, total }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error',
            })
        }
    },

    productListFavourite: async (req, res) => {
        try {
            var { page, limit } = req.query;
            limit = parseInt(limit) || 3;
            skip = (page - 1) * limit || 0;

            let productList = await FavouriteModel.aggregate([
                { $match: { userId: ObjectId(req.user._id) } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                { $unwind: '$product' },
                {
                    $project: {
                        _id: '$product._id',
                        name: '$product.name',
                        price: '$product.price',
                        imgUrl: '$product.imgUrl'
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ])
            let total = await FavouriteModel.countDocuments({ userId: req.user._id });
            return res.status(200).json({
                message: 'Favourite product list',
                data: { productList, total }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal server error',
            })
        }
    },

    addToFavourite: async (req, res) => {
        try {
            let data = {
                userId: req.user._id,
                productId: req.body._id
            }
            let isExist = await FavouriteModel.findOne(data);
            if (isExist) {
                return res.status(422).json({
                    message: 'Product already in favourite list',
                })
            }
            let favouriteProduct = new FavouriteModel(data);
            await favouriteProduct.save();
            return res.status(200).json({
                message: 'Product added successfully',
                data: { favouriteProduct }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error',
            })
        }
    },

    removeFromFavourite: async (req, res) => {
        try {
            let data = {
                userId: req.user._id,
                productId: req.body._id
            }
            let favouriteProduct = await FavouriteModel.deleteOne(data);
            return res.status(200).json({
                message: 'Product removed successfully',
                data: { favouriteProduct }
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error',
            })
        }
    }
}