import { join } from "path";
import { loggerConfig } from "./logger";
import { assetsDirPath } from './env';

const { version } = require("../../package.json");
const rootDir = join(__dirname, "..");
const assetsRoute = '/assets';

export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  assetsDirPath,
  assetsRoute,
  logger: loggerConfig,
};
