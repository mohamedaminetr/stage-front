import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public connecte : boolean = false ;

  messageError:any

  registerForm =  new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })

  user : User ={
    email:'',
    password:'',
  }

  constructor(private Auth:AuthentificationService,private route:Router) { }

  ngOnInit(): void {
  }

  login(){

    const data = {
      user :{
        email:this.user.email,
        password:this.user.password,
      }


    };
    
    this.Auth.login(data).subscribe(
      response => {
        console.log(response);
        if(response.status==401){
     
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User Not Found Or invalide Credentialns'
          })
        }else{


       if(response.user.email_confirmed==true) {
        if(response.user.role =="admin"  ){ 
          sessionStorage.setItem( 'admindata', JSON.stringify( response.user ) );
          this.route.navigate(['/dashboard-admin']);
        }
        else if(response.user.role =="employee")
        {
          sessionStorage.setItem( 'employeedata', JSON.stringify( response.user ) );
          this.route.navigate(['/dashboard-employee']);
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email or Password is Incorrect!'
          })
        }
       }else{
     
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'account created but not confirmed!, check Your EMail'
          })
        }
       
      }
     
      },(err:HttpErrorResponse)=>this.messageError=err.error.error);
      
  }

  
}