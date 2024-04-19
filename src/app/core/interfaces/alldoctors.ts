
export interface AllDoctors {
    totalCount:  number;
    totalPages:  number;
    currentPage: number;
    pageSize:    number;
    data:        Doctors[];
}

export interface Doctors {
    dateOfBirth?:string;
    id:         number;
    photoPath:  string;
    firstName:   string;
    fullName?:string;
    lastName: string;
    email:      string;
    phone:      string;
    specialize: string;
    gender:     string;
}
