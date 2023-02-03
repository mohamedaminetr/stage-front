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
  countAllClientt:any
  admindata:any
  clientdata: any;
  dataArray: any;
  messageErr: any;
  chartType:any;
  chartOptions: any 
  chartDatasets:any = []; 
  result:any = [];
  chartLabels:any = [];
  chartColors:any = [];
  chartReady = false;
data: any;
  constructor(private Auth:AuthentificationService,private route:Router) {
    this.admindata = JSON.parse(sessionStorage.getItem('admindata')!);
    console.log(this.admindata)
    this.chartType = 'pie';
    this.chartLabels = ['Request Refused',  'Employee', 'Request In Progress','Request Accepted '];
   
    this.chartColors = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
  
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
  
        ],
        borderWidth: 2,
      }
    ];
    this.chartOptions = {
      responsive: true
    };
    this.Auth.getstatic().subscribe(data2=>{
      
      this.result = data2;
      this.chartDatasets =[ 
        { data: [data2.data[0]['refused'], data2.data[0]['users'], data2.data[0]['encours'], data2.data[0]['acepted']],label: 'Com&Dev Officiel statistic'  }
      ];
      this.dataArrayStatic=data2
      console.log(this.dataArrayStatic)
      this.chartReady=true; 

      console.log(this.dataArrayStatic)
      
    }) 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }
  chartClicked(event: any): void {
  }

  chartHovered(event: any): void {
  }

  logout(){
    this.Auth.logout();
  }

}
