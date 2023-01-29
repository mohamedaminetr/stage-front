import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Demande } from 'src/app/model/demande.model~';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css']
})
export class DashboardEmployeeComponent {
  messageErr: any;

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




  constructor(private userService: AuthentificationService, private route: Router) {


    this.adddemande = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      motif_id: new FormControl('', [Validators.required]),
      commentaire: new FormControl('', [Validators.required]),
      employe_id: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });






    this.userService.getalldemande().subscribe(data=>{
      this.dataArray=data
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
      }
    })
  }




  addnewdemande(f:any){
    const data = {
      demande :{
        start_date:this.demande.start_date,
        end_date:this.demande.end_date,
        motif_id:this.demande.motif_id,
        commentaire:this.demande.commentaire,
        employe_id:this.demande.employe_id,
        status:this.demande.status,
      }
    };
   this.userService.createdemande(data).subscribe( 
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
  
  






  }




