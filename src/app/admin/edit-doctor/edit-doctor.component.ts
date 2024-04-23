import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Doctors } from 'src/app/core/interfaces/alldoctors';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
import { ToastrService } from 'ngx-toastr';
import { SpecializationService } from 'src/app/core/services/specialization.service';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,CutTextPipe],
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent implements OnInit{
  
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _AdminService:AdminService,
    private _FormBuilder:FormBuilder,
    private _ToastrService:ToastrService,
    private _SpecializationService:SpecializationService){}


  doctorData:Doctors={} as Doctors
  docId:any;
  specializationsId!:number;
  selectedFile:any;
  imgPath:string='';
  photoPath:string=''
  gender:string='';
  date:any;
  isHideLocalImage:boolean=false
  isHideServerImage:boolean=true
  isDisabled:boolean=true
  pathFlag:boolean=true

  editForm:FormGroup=this._FormBuilder.group({
    doctorId:['',[Validators.required]],
    photoPath:[''],
    firstName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    lastName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    gender:['',[Validators.required]],
    dateOfBirth:['',[Validators.required]],
    specializationId:['',[Validators.required]],
    
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(response)=>{
        this.docId=response.get('id')
        console.log(response.get('id'));
        this._AdminService.getDoctorById(this.docId).subscribe({
          next:(response)=>{
            this.doctorData=response 
            console.log(response);
            this.gender=this.doctorData.gender
            this.date=this.doctorData.dateOfBirth
            
            this.editForm.value.firstName=this.doctorData.fullName.split(' ').slice(0,1).join()
            this.editForm.value.lastName=this.doctorData.fullName.split(' ').slice(1,2).join()
            this.editForm.value.email=this.doctorData.email
            this.editForm.value.phone=this.doctorData.phone
            this.editForm.value.gender=this.doctorData.gender
            this.editForm.value.dateOfBirth=this.doctorData.dateOfBirth
            console.log(this.editForm.value);
            

            this._SpecializationService.getSpecializationByName(this.doctorData.specialize).subscribe({
              next:(response)=>{
                this.specializationsId=response.id
                
              }
            })

            
          },
          error:(err:HttpErrorResponse)=>[
            console.log(err)
          ]
        })
      }
    })
  }

  changeImage(event:any):void
  {
    this.isHideServerImage=false
    this.selectedFile=event.target.files[0]
    console.log(this.selectedFile.name);
    this.pathFlag=false
    const reader=new FileReader()
    reader.readAsDataURL(this.selectedFile)
    reader.onload=(event1)=>{
     this.imgPath=reader.result as string
     
    }
  }

  editDoctor(){
    console.log(this.editForm.value);
    console.log("mahmoud");
    this.editForm.value.specializationId=this.specializationsId
    this.editForm.value.gender=this.gender
    this.editForm.value.dateOfBirth=this.date
    this.editForm.value.doctorId=Number(this.docId)
    this.photoPath=this.selectedFile
    
    if(this.pathFlag==true){
      // if change image used to response current path
      this.editForm.value.photoPath=this.doctorData.photoPath
    }else{
      // if change image used to select file
      this.editForm.value.photoPath=this.selectedFile.name
    }
    console.log(this.editForm.value);
    const form=new FormData()
    form.append('doctorId',this.editForm.value.doctorId),
    form.append('photoPath',this.editForm.value.photoPath),
    form.append('firstName',this.editForm.value.firstName),
    form.append('lastName',this.editForm.value.lastName),
    form.append('email',this.editForm.value.email),
    form.append('phone',this.editForm.value.phone),
    form.append('gender',this.editForm.value.gender),
    form.append('dateOfBirth',this.editForm.value.dateOfBirth),
    form.append('specializationId',this.editForm.value.specializationId)
    if(this.pathFlag!=true){
      // if change image uses this selectedFile but not don't use selectedFile because value of selectedFile equal null
      form.append('image',this.selectedFile,this.selectedFile.name)
    }
    console.log(this.editForm.value);
    
    this._AdminService.editDoctorData(form).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success('doctor Edit successfully')
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
      }
    })
  }



}
