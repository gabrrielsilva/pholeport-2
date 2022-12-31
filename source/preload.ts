import { contextBridge, ipcRenderer } from 'electron';

type Data = {
  id: string,
  titulo: string,
  seguimento: string, 
  localidade: string,
  site_abordagem: string,
  versao: string,
  input_file_path: string
}

contextBridge.exposeInMainWorld('pholeport', {
  handle_pholeport: (data: Data) => ipcRenderer.send('pholeport', data)
});