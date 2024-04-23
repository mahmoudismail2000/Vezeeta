
export interface AllDoctors {
    totalCount:  number;
    totalPages:  number;
    currentPage: number;
    pageSize:    number;
    data:        Doctors[];
}

export interface Doctors {
    dateOfBirth:string;
    id:         number;
    photoPath:  string;
    fullName:string;
    email:      string;
    phone:      string;
    specialize: string;
    gender:     string;
}
