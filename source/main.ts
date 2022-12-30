import { kmz_extracted } from './config/paths';
import { create_pdf } from './create-pdf';
import { ask_questions } from './helper/ask-questions';
import { convert_kml_to_geojson } from './helper/convert-kml-to-geojson';
import { create_header } from './helper/create-header';
import { create_photo_column } from './helper/create-photo-column';
import { create_photo_row } from './helper/create-photo-row';
import { handle_kmz_file } from './helper/handle-kmz-file';
import { rename_photo_folder } from './helper/rename-photo-folder';
import { rename_photos_to_png } from './helper/rename-photos-to-png';
import { show_summary } from './helper/show-summary';
import { verify_numbering_errors } from './helper/verify-numbering-errors';

let start_time = Date.now();

(async () => {
  await handle_kmz_file();

  const placemark_names: { name: number, index: number }[] = []; // for poles
  const path_names: { name: string, index: number }[] = []; // for ducts

  const geo_json = convert_kml_to_geojson(kmz_extracted + '/doc.kml');

  // filters the markers that will be used
  for (const element of geo_json.features) {
    if (element?.properties?.name) {
      const element_name = (element?.properties?.name as string).replace(/["​]/g, ''); // this fixes a bug in Google Earth where some placemarks have the character U+200b in the name
      if (Number(element_name) && !/[a-zA-Z]/g.test(element_name)) placemark_names.push({ name: +element_name, index: geo_json.features.indexOf(element) });
      if (element_name.toLowerCase().startsWith('sub')) path_names.push({ name: element_name.toLowerCase(), index: geo_json.features.indexOf(element) });
    }
  }

  const placemark_names_sorted = placemark_names.sort((a, b) => a.name - b.name);
  const path_names_sorted = path_names.sort((a, b) => +a.name - +b.name);

  if (verify_numbering_errors(placemark_names_sorted)) {
    const photo_columns = [];
    const photo_rows = [];
    
    await rename_photos_to_png();
    
    let photos_amount = 0;
    let page_break = '';
    
    for (let i = 0; i < placemark_names_sorted.length; i++) {
      const placemark = geo_json.features[placemark_names_sorted[i].index]; // O(1)
      const placemark_photos = JSON.parse(placemark?.properties?.com_exlyo_mapmarker_images_with_ext as string) as { file_rel_path: string, file_extension: string }[];
      const placemark_coordinates = (placemark?.geometry as any).coordinates as Array<number>;
      
      photos_amount += placemark_photos.length;
      
      rename_photo_folder(placemark_photos);

      const column = create_photo_column(placemark?.properties?.name, placemark_photos, placemark_coordinates); // create_photo_column is different for ducts
      photo_columns.push(column);

      if (photo_columns.length === 2) {
        const row = create_photo_row(photo_columns, page_break);
        photo_rows.push(row);
        photo_columns.length = 0;

        if (photo_rows.length > 0 && photo_rows.length % 4 === 0) page_break = 'before';
        else page_break = '';
      }
      
      const elapsed_time = (Date.now() - start_time) / 1000;
      
      // last placemark
      if (i === placemark_names_sorted.length - 1) {
        const answer = await ask_questions();
        const { id, titulo, seguimento, localidade, site_abordagem, versao, left_logo, right_logo } = answer;
        const header = create_header(id, titulo, seguimento, localidade, site_abordagem, versao, left_logo, right_logo);
        create_pdf(`TIM_PPIR_ID${id}_RF_R00`, header, photo_rows);
        show_summary(placemark_names_sorted.length, photos_amount, placemark_names_sorted.length * 2 - photos_amount, elapsed_time);
      };
    }
  };
})()
