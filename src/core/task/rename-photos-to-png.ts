import fs from 'node:fs';
import { kmz_extracted } from '../config/path';

export async function rename_photos_to_png(): Promise<void> {
  const [photo_folder_name] = fs.readdirSync(kmz_extracted, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
    
  for await (const photo of fs.readdirSync(kmz_extracted + '/' + photo_folder_name.name)) {
    const photo_path = kmz_extracted + '/' + photo_folder_name.name + '/' + photo;
    if (!photo.endsWith('.png') && !photo.endsWith('.jpg')) {
      fs.renameSync(photo_path, photo_path + '.png');
    }
  }
}