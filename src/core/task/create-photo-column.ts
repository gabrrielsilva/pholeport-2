import fs from 'node:fs';
import path from 'node:path';
import { kmz_extracted } from '../config/path';
import { photo_header_height, photo_height, photo_width } from '../config/pdf-layout';
import '../config/pdf-style';

const no_photo_path = path.join(__dirname, '../public/image/no-photo-infinitel.png');

export function create_photo_column(
  element_name: string, 
  element_photos: { file_rel_path: string | null, file_extension: string | null }[],
  element_coordinates?: number[]
  ) {
  const current_photo_folder_name = fs.readdirSync(kmz_extracted, { withFileTypes: true }).filter(dirent => dirent.isDirectory())[0].name;
  const left_photo_name = element_photos[0]?.file_rel_path?.split('/').pop();
  const right_photo_name = element_photos[1]?.file_rel_path?.split('/').pop();
  const photo_folder_path = `${kmz_extracted}/${current_photo_folder_name}/`;
  const left_photo_path = left_photo_name ? 
                          (left_photo_name.endsWith('.jpg') || left_photo_name.endsWith('.png') ? (photo_folder_path + left_photo_name) : (photo_folder_path + left_photo_name + '.png'))
                          : no_photo_path;
  const right_photo_path = right_photo_name ? 
                          (right_photo_name.endsWith('.jpg') || right_photo_name.endsWith('.png') ? (photo_folder_path + right_photo_name) : (photo_folder_path + right_photo_name + '.png'))
                          : no_photo_path;

  return {
    width: '50%',
    table: {
      widths: [photo_width, photo_width],
      heights: [photo_header_height, photo_height],
      body: [
        [
          {
            style: 'title_photo_table',
            colSpan: 2,
            text: element_name + `${element_coordinates ? ' ' + `| Lat. ${element_coordinates[1]?.toString().substring(0,8)} Lon. ${element_coordinates[0]?.toString().substring(0,8)}` : ''}`
          },
          '',
        ],
        [
          { image: left_photo_path, width: photo_width, height: photo_height },
          { image: right_photo_path, width: photo_width, height: photo_height },
        ],
      ],
    },
  };
}