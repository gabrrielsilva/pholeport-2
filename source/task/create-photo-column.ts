import { photo_folder } from '../config/path';
import { photo_header_height, photo_height, photo_width } from '../config/pdf-layout';
import '../config/pdf-style';

const no_photo_path = 'public/image/no-photo-infinitel.png';

export function create_photo_column(
  element_name: string, 
  element_photos: { file_rel_path: string, file_extension: string }[],
  element_coordinates?: number[]
) {
  const left_photo_name = element_photos[0]?.file_rel_path?.split('/').pop();
  const right_photo_name = element_photos[1]?.file_rel_path?.split('/').pop();
  const left_photo_path = left_photo_name ? `${photo_folder}/${left_photo_name}.png` : no_photo_path;
  const right_photo_path = right_photo_name ? `${photo_folder}/${right_photo_name}.png` : no_photo_path;

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
            text: element_name + `${element_coordinates ? ' ' + `| Lat. ${element_coordinates[1].toFixed(4)} Lon. ${element_coordinates[0].toFixed(4)}` : ''}`
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