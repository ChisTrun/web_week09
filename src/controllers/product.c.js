const Product = require('../models/product.m');

module.exports = {
    getAll: async (req,res,next) => {
        try {
            const data = await Product.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        };
    },
    getAllPaging: async (req,res,next) => {
        try {
            const data = await Product.getAllPaging(req.params.per_page,req.params.page);
            res.json(data);
        } catch (error) {
            next(error);
        };
    },
    getByProID: async (req,res,next) => {
        try {
            const data = await Product.getProByID(req.params.ProID);
            res.json(data);
        } catch (error) {
            next(error);
        };
    },
    getByCatID: async (req,res,next) => {
        try {
            const data = await Product.getProByCatID(req.params.per_page,req.params.page,req.params.CatID);
            res.json(data);
        } catch (error) {
            next(error);
        };
    },
    removeProduct: async (req,res,next) => {
        try {
            const obj = req.body;
            await Product.removeProduct(obj);
            res.redirect('http://localhost:3000/admin');
        } catch (error) {
            next(error);
        }
    },
    updateProduct:  async (req,res,next) => {
        try {
            const obj = req.body;
            await Product.updateProduct(obj);
            res.redirect('http://localhost:3000/admin');
        } catch (error) {
            next(error)
        }
    },
    addProduct: async (req,res,next) => {
        try {
            const obj = req.body;
            await Product.addProduct(obj);
            res.redirect('http://localhost:3000/admin');
        } catch (error) {
            next(error)
        }
    }

}