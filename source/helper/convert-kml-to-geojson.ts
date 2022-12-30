import { kml } from '@tmcw/togeojson';
import { FeatureCollection, Geometry } from 'geojson';
import fs from 'node:fs';
import xmldom from 'xmldom';

const DOMParser = xmldom.DOMParser;

export function convert_kml_to_geojson (kml_path: string): FeatureCollection<Geometry | null> {
  try {
    const kml_as_dom = new DOMParser().parseFromString(fs.readFileSync(kml_path, 'utf-8'), 'text/xml');
    const geojson = kml(kml_as_dom);

    return geojson;
  } catch (e) {
    throw(e);
  }
}