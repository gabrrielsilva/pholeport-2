import fs from 'node:fs';
import { kmz_extracted } from '../config/path';

export function rename_photo_folder(placemark_photos: { file_rel_path: string, file_extension: string }[]): void {
  const [_, photo_folder_name] = placemark_photos[0].file_rel_path.match(/(\S+)\//) as RegExpMatchArray;
  const [current_photo_folder_name] = fs.readdirSync(kmz_extracted, { withFileTypes: true }).filter(dirent => dirent.isDirectory());      

  if (current_photo_folder_name.name !== photo_folder_name) {
    fs.renameSync(`${kmz_extracted}/${current_photo_folder_name.name}`, `${kmz_extracted}/${photo_folder_name}`);
  }
}