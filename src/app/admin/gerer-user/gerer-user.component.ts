import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/user.model';
@Component({
  selector: 'app-gerer-user',
  templateUrl: './gerer-user.component.html',
  styleUrls: ['./gerer-user.component.css']
})
export class GererUserComponent {

  dataArrayemploye: any = [];
  dataArray: any = [];
  messageErr: any;
  constructor(private userService: AuthentificationService, private route: Router) {

    this.userService.getemploye().subscribe(data => {
      this.dataArrayemploye = data;
      console.log(this.dataArrayemploye);

    })



    this.userService.getstatic().subscribe(data2 => {
      this.dataArray = data2
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
        this.userService.deleteuser(id).subscribe(response=>{
          this.dataArrayemploye.splice(i,1)   
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }



  user : User ={
    email:'',
    password:'',
  }



  addnewemployee (f:any){
    const data = {
      user :{
        email:this.user.email,
        password:this.user.password,
        role : this.user.role 
      }
    };
   this.userService.createuser(data).subscribe( 
    Response=>{
      console.log(Response)
      Swal.fire('Saved!', '', 'success')
      window.location.reload()
  
    },(err:HttpErrorResponse)=>{
      this.messageErr=err.error      
    }) ;
  }












}
