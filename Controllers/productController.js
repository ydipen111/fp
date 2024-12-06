import { query } from "express";
import Product from "../Models/Product.js";
import fs from 'fs';
import mongoose from "mongoose";

//getTopProducts
export const getTopProducts = (req, res, next) => {
  req.query.rating = ({ gt: 4.7 })
  req.query.limit = 5;
  next();
}

//getProductById

export const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const product = await Product.findById(id);
      return res.status(200).json({
        message: "id product find",
        product
      })
    } else {
      return res.status(404).json({ message: 'product Not found' })

    }

  } catch (err) {
    return res.status(400).json({ message: `${err}` })

  }
}

//getALlProducts
export const getProducts = async (req, res) => {

  try {


    const excludeFields = ['sort', 'search', 'limit', 'fields', 'skip', 'page'];

    const queryObj = { ...req.query }

    excludeFields.forEach((label) => delete queryObj[label]);

    if (req.query.search) {
      queryObj.title = { $regex: req.query.search, $options: 'i' };
    }

    let qStr = JSON.stringify(queryObj);

    qStr = qStr.replace(/\b(gte|gt|lte|lt|eq)\b/g, match => `$${match}`);

    let query = Product.find(JSON.parse(qStr));

    if (req.query.sort) {
      const filterSorts = req.query.sort?.split(/[\s,]+/).filter(Boolean).join(' ');
      query = query.sort(filterSorts)
    }

    if (req.query.fields) {
      const filterFlelds = req.query.fields?.split(/[\s,]+/).filter(Boolean).join(' ');
      query = query.select(filterFlelds)
    }




    const page = req.page || 1;
    const limit = req.limit || 5;
    const skip = (page - 1) * limit;

    const response = await query.skip(skip).limit(limit);

    // limit(limit).skip(skip);
    return res.status(200).json({
      length: response.length,
      product: response
    })

  } catch (error) {

  }
}

//creatProducts
export const createProducts = async (req, res, next) => {

  const { title,
    description,
    image,
    category,
    brand,
    rating,
    stock,
    price
  } = req.body;

  try {

    await Product.create({
      title,
      description,
      image: req.image,
      category,
      brand,
      rating: Number(rating),
      stock: Number(stock),
      price: Number(price)

    })

    return res.status(200).json({ messae: "creating products" })

  } catch (err) {
    console.log(err);
    fs.unlinkSync(`./Image/${req.image}`);
    return res.status(400).json({ message: `${err}` });


  }
}

//removeProducts
export const removeProducts = async (req, res, next) => {
  const { id } = req.params;


  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invaid id' });

    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ message: 'product not found' });

    await Product.findByIdAndDelete(id);
    fs.unlink(`./Image/${isExist.image}`, (err) => {
      console.log(err);

    })


    return res.status(200).json({ message: "deleted succesfully" })

  } catch (error) {
    console.log(error);
    fs.unlinkSync(`./Image/${req.image}`);
    return res.status(400).json({ message: `${error}` });


  }
}