import express from "express";
import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      results: products,
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("No product found with that id");
    }

    res.status(200).json({
      status: "success",
      results: product,
    });
  })
);

export default router;
