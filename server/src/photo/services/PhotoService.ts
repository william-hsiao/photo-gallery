import fs from "fs";
import { Injectable, Constant } from "@tsed/di";

@Injectable()
export class PhotoService {
  @Constant("photosDirPath")
  photosDirPath: string;

  @Constant("photoAssetsRoute")
  photoAssetsRoute: string;

  async findAll() {
    const photos = fs
      .readdirSync(this.photosDirPath)
      .map((filename) => `${this.photoAssetsRoute}/${filename}`);
    return photos;
  }
}
