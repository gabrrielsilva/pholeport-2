import { kmz_extracted } from './config/path';
import { convert_kml_to_geojson } from './service/convert-kml-to-geojson';
import { create_pdf } from './service/create-pdf';
import { create_header } from './task/create-header';
import { create_photo_column } from './task/create-photo-column';
import { create_photo_row } from './task/create-photo-row';
import { handle_kmz_file } from './task/handle-kmz-file';
import { rename_photos_to_png } from './task/rename-photos-to-png';
import { verify_numbering_errors } from './task/verify-numbering-errors';

export type Input = {
  id: string,
  titulo: string,
  seguimento: string, 
  localidade: string,
  site_abordagem: string,
  versao: string,
  input_file_path: string,
  left_logo: string,
  right_logo: string
}

type Output = {
  poles_amount: number,
  underground_amount: number,
  photos_amount: number,
  poles_without_photos: number,
  timing: number
}

export async function handle_pholeport({ 
  id, 
  titulo, 
  seguimento, 
  localidade, 
  site_abordagem, 
  versao, 
  input_file_path, 
  left_logo, 
  right_logo, 
}: Input): Promise<Output> {  
  let start_time = Date.now();
  
  await handle_kmz_file(input_file_path);

  const placemark_names: { name: number, index: number }[] = []; // for poles
  const path_names: { name: string, index: number }[] = []; // for ducts

  const geo_json = convert_kml_to_geojson(kmz_extracted + '/doc.kml');

  // filters the markers that will be used
  for await (const element of geo_json.features) {
    if (element?.properties?.name) {
      const element_name = (element?.properties?.name as string).replace(/["​]/g, ''); // this fixes a bug in Google Earth where some placemarks have the character U+200b in the name
      if (Number(element_name) && !/[a-zA-Z]/g.test(element_name)) placemark_names.push({ name: +element_name, index: geo_json.features.indexOf(element) });
      if (element_name.toLowerCase().startsWith('sub')) path_names.push({ name: element_name.toLowerCase(), index: geo_json.features.indexOf(element) });
    }
  }

  const placemark_names_sorted = placemark_names.sort((a, b) => a.name - b.name);
  const path_names_sorted = path_names.sort((a, b) => +a.name - +b.name);

  if (verify_numbering_errors(placemark_names_sorted) && verify_numbering_errors(path_names_sorted)) {
    const photo_columns: any[] = [];
    const photo_rows: any[] = [];
    
    await rename_photos_to_png();
    
    let photos_amount = 0;
    let page_break = '';
    
    if (placemark_names.length > 0) {
      for (let i = 0; i < placemark_names_sorted.length; i++) {        
        const placemark = geo_json.features[placemark_names_sorted[i].index]; // O(1)
        const placemark_photos = placemark?.properties?.com_exlyo_mapmarker_images_with_ext ? 
          JSON.parse(placemark?.properties?.com_exlyo_mapmarker_images_with_ext as string) as { file_rel_path: string, file_extension: string }[]
          : [{ file_rel_path: null, file_extension: null },{ file_rel_path: null, file_extension: null }];
        const placemark_coordinates = (placemark?.geometry as any).coordinates as Array<number>;
        
        photos_amount += placemark_photos.length;
          
        const column = create_photo_column('Poste ' + placemark?.properties?.name, placemark_photos, placemark_coordinates); // create_photo_column is different for ducts
        photo_columns.push(column);
  
        if (photo_columns.length === 2) {
          const row = create_photo_row(photo_columns, page_break);
          photo_rows.push(row);
          photo_columns.length = 0;
  
          if (photo_rows.length > 0 && photo_rows.length % 4 === 0) page_break = 'before';
          else page_break = '';
        }
      }
    }

    if (path_names.length > 0) {
      for (let i = 0; i < path_names_sorted.length; i++) {
        const path = geo_json.features[path_names_sorted[i].index]; // O(1)
        const path_photos = path?.properties?.com_exlyo_mapmarker_images_with_ext ? 
          JSON.parse(path?.properties?.com_exlyo_mapmarker_images_with_ext as string) as { file_rel_path: string, file_extension: string }[]
          : [{ file_rel_path: null, file_extension: null },{ file_rel_path: null, file_extension: null }];

        for (let i = 0; i < path_photos.length; i++) {          
          const column = create_photo_column('Subterrâneo', [path_photos[i], path_photos[i + 1]]);
          photo_columns.push(column);
  
          if (photo_columns.length === 2) {
            const row = create_photo_row(photo_columns, page_break);
            photo_rows.push(row);
            photo_columns.length = 0;
    
            if (photo_rows.length > 0 && photo_rows.length % 4 === 0) page_break = 'before';
            else page_break = '';
          }
        
          i += 2;
        }
      }
    }
    
    const header = create_header(id, titulo, seguimento, localidade, site_abordagem, versao, left_logo, right_logo);
    const output_file_path = input_file_path.split('\\');
    output_file_path.pop(); // remove filename from path
    
    create_pdf(`${output_file_path.join('/')}/TIM_PPIR_ID${id}_RF_R00.pdf`, header, photo_rows);

    return {
      poles_amount: placemark_names.length,
      underground_amount: path_names.length,
      photos_amount: photos_amount,
      poles_without_photos: placemark_names.length * 2 - photos_amount,
      timing: (Date.now() - start_time) / 1000
    }
  }

  throw new Error('Internal server error');
};