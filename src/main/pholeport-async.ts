import { ipcMain } from 'electron';
import { handle_pholeport, Input } from '../core/handle-pholeport';

ipcMain.handle('pholeport', async (_, input: Input) => {
    const { id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path, left_logo, right_logo } = input;
    const output = await handle_pholeport({ id, titulo, seguimento, localidade, site_abordagem, versao, input_file_path, left_logo, right_logo });
    return output;
  }
);