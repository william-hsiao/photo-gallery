export const config = require("dotenv").config();

export const isProduction = process.env.NODE_ENV === "production";

export const assetsDirPath = process.env.ASSETS_DIR_PATH;
