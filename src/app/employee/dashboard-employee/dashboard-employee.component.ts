import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/model/demande.model~';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css']
})
export class DashboardEmployeeComponent {




  updateuser:any;
  messageErr: any;
demandedata:any;
  employeedata:any;
  updatedemandeForm:any;
  adddemande! :  FormGroup;
  demande : Demande ={
    start_date: new Date(),
    end_date: new Date(),
    motif_id: 0,
    commentaire: '',
    employe_id: 0, 
    status: 0
  }
  dataArray: any;
  dataArrayyy: any;

  motifs: any;


  constructor(private userService: AuthentificationService, private route: Router,activatedRoute:ActivatedRoute ) {



    this.updateuser=new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      datenaissance:new FormControl('', Validators.required)
      })


      this.updatedemandeForm=new FormGroup({
        start_date: new FormControl('', Validators.required),
        end_date: new FormControl('', Validators.required),
        reason: new FormControl('', Validators.required),
        commentaire:new FormControl('', Validators.required),
        employe_id: new FormControl('', [Validators.required]),
        
        })


    this.employeedata = JSON.parse( sessionStorage.getItem('employeedata')!);
    console.log(this.employeedata); 
    this.adddemande = new FormGroup({
      email: new FormControl('', Validators.required),
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      motif_id: new FormControl('', [Validators.required]),
      commentaire: new FormControl('', [Validators.required]),
      employe_id: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });


    this.userService.getdemande(this.employeedata.id).subscribe(data=>{
      console.log(data)   
      this.dataArrayyy=data,
  
      (err:HttpErrorResponse)=>{
        console.log(err)
      this.messageErr="We dont't found this category in our database"}
    }) 



    this.userService.getallreasons().subscribe(data=>{
      this.motifs=data
      console.log(this.dataArray)
      
    }) 
  







  }

  delete(id:any  , i :number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleterequest(id).subscribe(response=>{
          this.dataArray.splice(i,1)   
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        window.location.reload()
      }
    })
  }




  addnewdemande(f:any){

    const formData = new FormData();
    
    formData.append('start_date', this.adddemande.value.start_date);
    formData.append('end_date', this.adddemande.value.end_date);
    formData.append('description', this.adddemande.value.description);
    formData.append('motif_id', this.adddemande.value.motif_id);
    formData.append('employe_id', this.employeedata.id);

  let data=f.value

   this.userService.createdemande(formData).subscribe( 
    Response=>{
      console.log(Response)
      Swal.fire('Saved!', '', 'success')
      window.location.reload()
  
    },(err:HttpErrorResponse)=>{
      this.messageErr=err.error      
    }) ;
  }





















  logout()
  {
  this.userService.logout();
  }
  
  updateemploye(f:any)
  {
  
    const formData = new FormData();

    formData.append('nom', this.updateuser.value.nom);
    formData.append('prenom', this.updateuser.value.prenom);
    formData.append('cin', this.updateuser.value.cin);
    formData.append('datenaissance', this.updateuser.value.datenaissance);

let data =f.value

this.userService.updateuser(this.employeedata.id,formData).subscribe(

  Response => {
    console.log(Response)
    Swal.fire('Saved!', '', 'success')
    window.location.reload()

  }, (err: HttpErrorResponse) => {
    this.messageErr = err.error

  })
}


updatedemande(f:any)
  {
  
    const formData = new FormData();

    formData.append('start_date', this.updatedemandeForm.value.start_date);
    formData.append('end_date', this.updatedemandeForm.value.end_date);
    formData.append('reason', this.updatedemandeForm.value.motif_id.reason);
    formData.append('commentaire', this.updatedemandeForm.value.commentaire);
    formData.append('employe_id', this.updatedemandeForm.id);
let data =f.value

this.userService.updatedemande(this.dataArrayyy.id,formData).subscribe(

  Response => {
    console.log(Response)
    Swal.fire('Saved!', '', 'success')
    window.location.reload()

  }, (err: HttpErrorResponse) => {
    this.messageErr = err.error

  })
}










  }




