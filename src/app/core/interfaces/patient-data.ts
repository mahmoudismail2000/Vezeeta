export interface PatientData {
    details: Details
    bookings: Booking[]
  }
  
  export interface Details {
    id: number
    photoPath: any
    fullName: string
    email: string
    phone: string
    gender: string
    dateOfBirth: string
  }
  
  export interface Booking {
    id: number
    photoPath: string
    doctorName: string
    specialize: string
    day: string
    time: string
    appointmentRealTime: string
    price: number
    discountCode: string
    finalPrice: number
    bookingStatus: string
  }
  