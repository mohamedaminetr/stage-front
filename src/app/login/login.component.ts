import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messageErr =''
  counter:any
  dataArray:any = [] ;
  constructor(private usersService:AuthentificationService,private route:Router  ) {}

  getalluser(){
    this.usersService.getAllusers().subscribe(data=>{
      this.dataArray = data
      console.log(this.dataArray)
      this.counter = this.dataArray.length , (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this user in our database"} 
    }) 

  }





  

}
