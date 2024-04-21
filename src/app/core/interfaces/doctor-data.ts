
export interface DoctorData {
    id: number
    photoPath: string
    fullName: string
    email: string
    phone: string
    specialize: string
    price: number
    gender: string
    appointments: Appointment[]
  }
  
  export interface Appointment {
    day: string
    times: Time[]
  }
  
  export interface Time {
    id: number
    time: string
  }
  
