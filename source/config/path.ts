import fs from 'node:fs';

const kmz_extracted = 'source/kmz_extracted',
      current_photo_folder_name = fs.readdirSync(kmz_extracted, { withFileTypes: true }).filter(dirent => dirent.isDirectory())[0].name,
      photo_folder = kmz_extracted + '/' + current_photo_folder_name
      
export { kmz_extracted, current_photo_folder_name, photo_folder };

