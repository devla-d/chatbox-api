import { unlink } from "fs";
import path from "path";
import { CustomError } from "./custom-error.service";

const BASE_DIR = path.join(__dirname, "..");

export const deleteFile = (filepath: string) => {
  console.log(filepath);

  unlink(filepath, (err) => {
    if (err) {
      console.log(err);
      throw new CustomError("An internal error occured");
    }
    console.log("file deleted");
  });
};
