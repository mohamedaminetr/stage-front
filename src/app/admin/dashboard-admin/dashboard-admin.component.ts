import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  dataArrayStatic: any;
  constructor(private Auth:AuthentificationService,private route:Router) {
  
    this.Auth.getstatic().subscribe(data2=>{
      this.dataArrayStatic=data2
      console.log(this.dataArrayStatic)
      
    }) 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }

  logout(){
    this.Auth.logout();
  }

}
