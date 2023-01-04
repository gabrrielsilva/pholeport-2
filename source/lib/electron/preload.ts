import { contextBridge, ipcRenderer } from 'electron';

type Data = {
  id: string;
  titulo: string;
  seguimento: string;
  localidade: string;
  site_abordagem: string;
  versao: string;
  input_file_path: string;
  left_logo: string;
  right_logo: string;
};

contextBridge.exposeInMainWorld('pholeport', {
  handle_pholeport: (data: Data) => ipcRenderer.invoke('pholeport', data),
  get_logos: () => ipcRenderer.invoke('logos'),
});
