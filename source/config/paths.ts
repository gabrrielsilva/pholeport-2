import fs from 'node:fs';

const input_path = 'input',
      kmz_extracted = 'source/kmz_extracted',
      kmz_copy_path = kmz_extracted + '/' + fs.readdirSync(input_path).find(file => file.endsWith('.kmz'));
      
export { input_path, kmz_extracted, kmz_copy_path };

