export function verify_numbering_errors(element_names: { name: number | string, index: number }[]): boolean {
  const elements_numbering_errors: number[] = [];
  
  // if (parseInt(element_names[0].name as string) !== 1) throw new Error('Cadê o marcador/caminho 1? A numeração deve começar nele');
  element_names.filter((value, i) => {
    if (i < element_names.length - 1) {
      // [1, 4, 5, 6] -> 4 - 1 -> 3 -> 3 - 1 -> 2 -> [1, 2] -> [ 1 + 1, 1 + 2 ] -> [ 2, 3 ];
      if (+element_names[i + 1].name - +value.name !== 1) {
        elements_numbering_errors.push(
          ...Array.from({ length: +element_names[i + 1].name - +value.name - 1 }, (_, i) => i + 1 + +value.name) // i + 1 + value -> add 1 to not start at 0
        );
      }
    }
  });
  if (elements_numbering_errors.length >= 1) throw new Error(`Cadê o(s) marcador(es)/caminho(s): ${elements_numbering_errors}?`);
    
  return true;
}
