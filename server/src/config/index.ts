import { join } from "path";
import { loggerConfig } from "./logger";
import { photosDirPath } from "./env";

const { version } = require("../../package.json");
const rootDir = join(__dirname, "..");
const photoAssetsRoute = "/photos";

export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  photosDirPath,
  photoAssetsRoute,
  logger: loggerConfig,
};
