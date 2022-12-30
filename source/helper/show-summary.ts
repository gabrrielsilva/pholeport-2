import boxen from 'boxen';

export function show_summary(poles_amount: number, photos_amount: number, poles_without_photos: number, timing: number) {
  console.log('');
  console.log(
    boxen(
      `Postes: ${poles_amount}\n Fotos: ${photos_amount}\n Fotos faltantes: ${poles_without_photos}`,
      {
        title: `RELATÓRIO GERADO - [${timing}s]`,
        titleAlignment: 'center',
        textAlignment: 'center',
        borderColor: 'greenBright',
        padding: 2
      }
    )
  )
}