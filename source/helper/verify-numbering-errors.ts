const placemarks_numbering_errors: number[] = [];

export function verify_numbering_errors(placemark_names: { name: number, index: number }[]): boolean {  
  if (placemark_names[0].name !== 1) throw new Error('Cadê o marcador 1? A numeração deve começar nele');
  placemark_names.filter((value, i) => {
    if (i < placemark_names.length - 1) {
      // [1, 4, 5, 6] -> 4 - 1 -> 3 -> 3 - 1 -> 2 -> [1, 2] -> [ 1 + 1, 1 + 2 ] -> [ 2, 3 ];
      if (placemark_names[i + 1].name - value.name !== 1) {
        placemarks_numbering_errors.push(
          ...Array.from({ length: placemark_names[i + 1].name - value.name - 1 }, (_, i) => i + 1 + value.name) // i + 1 + value -> add 1 to not start at 0
        );
      }
    }
  });
  if (placemarks_numbering_errors.length >= 1) throw new Error(`Cadê o(s) marcador(es): ${placemarks_numbering_errors}?`);
  
  return true;
}
