import fs from "fs";
import { Injectable, Constant } from "@tsed/di";

const ASSETS_PATH = "/assets";

@Injectable()
export class PhotoService {
  @Constant("assetsDirPath")
  assetsDirPath: string;

  async findAll() {
    const photos = fs
      .readdirSync(this.assetsDirPath)
      .map((filename) => `${ASSETS_PATH}/${filename}`);
    return photos;
  }
}
