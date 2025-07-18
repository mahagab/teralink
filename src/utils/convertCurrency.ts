

/**
 * Converte um valor monetário de reais para centavos
 * @param {string} amount - passa um valor no tipo texto a ser convertido 
 * @returns {number} - retorna um valor convertido em centavos
 * 
 * @example convertRealToCents("300,00"); Retorna 30000
 */
export function convertRealToCents(amount: string){
  const numericPrice = parseFloat(amount.replace(/\./g,'')
  .replace(',', '.'))

  const parseInCents = Math.round(numericPrice * 100)

  return parseInCents;
}