import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-gerer-demande',
  templateUrl: './gerer-demande.component.html',
  styleUrls: ['./gerer-demande.component.css']
})
export class GererDemandeComponent {  
  messageErr =''
  counter:any
  dataArray:any = [] ;
  dataArrayStatic:any = [] ;
  constructor(private demandesService: AuthentificationService,private route:Router  ) {
    this.demandesService.getalldemande().subscribe(data=>{
      this.dataArray=data
      console.log(this.dataArray)
      this.counter = this.dataArray.length , (err:HttpErrorResponse)=>{
      this.messageErr="We dont't found this user in our database"} 
    
    }) 


    this.demandesService.getstatic().subscribe(data2=>{
      this.dataArrayStatic=data2
      console.log(this.dataArrayStatic)
      
    }) 
  





  }
  

  


}
