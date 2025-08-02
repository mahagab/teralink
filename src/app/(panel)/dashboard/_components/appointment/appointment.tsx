import { getTimesClinic } from "../_data-access/get-time-clinic"
import { AppointmentList } from "./appointment-list"


export async function Appointments({userId}: {userId: string}) {

  const {times} = await getTimesClinic({userId: userId})

  console.log(times)

  return(
    <AppointmentList times={times}/>
  )
}