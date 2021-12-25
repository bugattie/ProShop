import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

import connectDB from "../config/DB.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import users from "./users.js";
import products from "./products.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log(chalk.greenBright("Data imported successfully"));
    process.exit();
  } catch (error) {
    console.error(chalk.redBright(`${error}`));
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    console.log(chalk.greenBright("Data deleted successfully"));
    process.exit();
  } catch (error) {
    console.error(chalk.redBright(`${error}`));
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
