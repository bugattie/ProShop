import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    data: products,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("No product found with that id");
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});
