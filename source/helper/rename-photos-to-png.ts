import fs from 'fs';
import { kmz_extracted } from '../config/paths';

export function rename_photos_to_png() {
  try {
    fs.readdirSync(kmz_extracted, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(async dirent => {
        const photos_folder = dirent.name;
  
        for await (const photo of fs.readdirSync(kmz_extracted + '/' + photos_folder)) {
          const photo_path = kmz_extracted + '/' + photos_folder + '/' + photo;
          fs.renameSync(photo_path, photo_path + '.png');
        }
      });
  } catch (e) {
    throw(e);
  }
}