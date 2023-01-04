import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Listbox } from './components/Listbox';
import { Result } from './components/Result';
import { H1 } from './components/typography/H1';
import { UploadOrDragAndDrop } from './components/UploadOrDragAndDrop';
import getErrorMessage from './util/getErrorMessage';

type FormData = {
  kmz: FileList,
  id: string,
  titulo: string,
  seguimento: string,
  localidade: string,
  site_abordagem: string,
  versao: string,
  left_logo: string, 
  right_logo: string
}

function App() {
  const [logos, setLogos] = useState<string[]>(null);
  const [leftLogo, setLeftLogo] = useState('');
  const [rightLogo, setRightLogo] = useState('');
  const [summary, setSummary] = useState<{ poles_amount: number, photos_amount: number, poles_without_photos: number, timing: number }>();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit } = useForm();

  async function onSubmit({ kmz, id, titulo, seguimento, localidade, site_abordagem, versao, left_logo, right_logo }: FormData) {
    try {
      const summary = await window.pholeport.handle_pholeport({ 
        id, 
        titulo, 
        seguimento, 
        localidade, 
        site_abordagem, 
        versao, 
        input_file_path: kmz[0].path,
        left_logo,
        right_logo
      });
  
      setSummary(summary);
    } catch (e) {      
      setErrorMessage(getErrorMessage(e));
    }
  }

  async function getLogos() {
    setLogos(await window.pholeport.get_logos());
  }

  useEffect(() => {
    getLogos();
  }, []);

  return (
    <div className='w-screen h-screen p-10'>
      <H1 text='Pholeport' extraStyles='text-[#121212] mb-10' />
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} className='grid grid-cols-3 gap-5'>
        <UploadOrDragAndDrop register={register} />
        <Input register={register} field='id' />
        <Input register={register} field='titulo' />
        <Input register={register} field='seguimento' />
        <Input register={register} field='localidade' />
        <Input register={register} field='site_abordagem' label='site/abordagem' />
        <Input register={register} field='versao' label='versão' />
        <Listbox options={logos} selected={leftLogo} setSelected={setLeftLogo} />
        <Listbox options={logos} selected={rightLogo} setSelected={setRightLogo} />
        {/* <Listbox /> */}
        <Button type='submit' text='Gerar relatório' extraStyles='bg-[#3992ff] hover:bg-blue-600 text-white col-span-3 mt-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-blue-200 transition-colors duration-200' />
        {summary ? (<Result poles_amount={summary?.poles_amount} photos_amount={summary?.photos_amount} poles_without_photos={summary?.poles_without_photos} timing={summary?.timing} />) : ''}
        {errorMessage ? <span className='font-sans text-lg font-bold text-red-600'>{errorMessage.includes(': Error:') ? errorMessage.split(': Error:')[1] : errorMessage}</span> : ''}
      </form>
    </div>
  )
}

export default App