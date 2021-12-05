import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(chalk.green(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.redBright(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
