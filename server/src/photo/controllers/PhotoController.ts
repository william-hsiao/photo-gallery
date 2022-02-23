import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import { PhotoService } from "../services/PhotoService";

@Controller("/photos")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  getPhotoList() {
    return this.photoService.findAll();
  }
}
