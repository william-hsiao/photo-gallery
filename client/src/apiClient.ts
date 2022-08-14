import axios from "axios";

export type Photos = string[];

export const getPhotoList = async (): Promise<Photos> => {
  const request = await axios.get<Photos>("/api/photos");
  return request.data;
};
