import { kmz_extracted } from '../config/path';
import { photo_header_height, photo_height, photo_width } from '../config/pdf-layout';
import '../config/pdf-style';

const no_photo_path = 'source/static/images/no-photo-infinitel.png';

export function create_photo_column(
  placemark_name: number, 
  placemark_photos: { file_rel_path: string, file_extension: string }[],
  placemark_coordinates: number[]
) {
  const left_photo_path = placemark_photos[0]?.file_rel_path ? `${kmz_extracted}/${placemark_photos[0]?.file_rel_path}.png` : no_photo_path;
  const right_photo_path = placemark_photos[1]?.file_rel_path ? `${kmz_extracted}/${placemark_photos[1]?.file_rel_path}.png` : no_photo_path;

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
            text: `Poste ${placemark_name} | Lat. ${placemark_coordinates[1].toFixed(4)} Lon. ${placemark_coordinates[0].toFixed(4)}`
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