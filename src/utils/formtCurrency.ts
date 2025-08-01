const CURRENCY_FORMARTTER = new Intl.NumberFormat("pt-BR",
  {
    currency: 'BRL',
    style: "currency",
    minimumFractionDigits: 0
  })

  export function formatCurrency(number: number){
    return CURRENCY_FORMARTTER.format(number)
  }