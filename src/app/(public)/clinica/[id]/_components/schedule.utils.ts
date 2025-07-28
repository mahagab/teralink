
/**
 * Verificar se determinado já passou
 */

export function isSlotInThePass(slotTime: string){

  const [slotHour, slotMinute] = slotTime.split(":").map(Number)

  const now = new Date
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();


  if(slotHour < currentHour){
    return true
  }else if(slotHour === currentHour &&  slotMinute <= currentMinutes){
    return true
  }

  return false
}

export function isToday(date: Date){
  const now = new Date();
  
  return(
    date.getFullYear() === now.getFullYear()&&
    date.getMonth() === now.getMonth()&&
    date.getDate() === now.getDate()
  )
}

/** Verificar se, a partir do slot inicial, existe uma sequência de requiredSlots disponíveis
 * @example Se um serviço tem dois requiredSlots e começa no time 15h, precisam garantir que 15h e 15:30 não estejam
 * no blockedSlots
 */

export function isSlotSequenceAvailable(
  startSlot: string,
  requiredSlots: number,
  allSlots: string[],
  blockedSlots: string[]){

  const startIndex = allSlots.indexOf(startSlot)

  if(startIndex === -1 || startIndex + requiredSlots > allSlots.length){
    return false;
  }

  for(let i = startIndex; i < startIndex + requiredSlots; i++){
    const slotTime = allSlots[i]

    if(blockedSlots.includes(slotTime)){
      return false;
    }
  }

   return true;
}