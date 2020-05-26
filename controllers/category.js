const Category = require('../models/category')
const { httpCodes } = require('../utils/constant');
const { Exception } = require('../utils');

const addCategory = async (req, res, next) =>  {
    try {
        const { name } = req.body
        if(name) throw new Exception('invalid name')
        const category = new Category({name})
        await category.save()
        res.status(httpCodes.OK).send({category})
    } catch (error) {
        next(error)
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({})
        if(!categories) throw new Exception('categories not found', httpCodes.NOT_FOUND)
        res.status(httpCodes.OK).send({categories})        
    } catch(error) {
        next(error)
    }
}

module.exports = {
    addCategory,
    getAllCategories
}