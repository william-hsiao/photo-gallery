import axios from "axios";

type Photos = string[];

export const getPhotoList = async (): Promise<Photos> => {
  const request = await axios.get<Photos>("/api/photos");
  return request.data;
};
