import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';
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
  update: any;
  messageSuccess: string | undefined;

  datademande = {
    id : '' ,
    status  : ''
  }





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
  


    this.update = new FormGroup({
      status: new FormControl(''),
      refus_reason: new FormControl(''),
    });


    this.update = new FormGroup({
      status: new FormControl(''),
      refus_reason: new FormControl(''),
    });


  }







  logout()
  {
  this.demandesService.logout();
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
        this.demandesService.deleterequest(id).subscribe(response=>{
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




  getdata(status:string,refus_reason:string , id:any){
    this.datademande.id=id
    this.datademande.status=status
    console.log(this.datademande)
  }



  updatedemande (f:any)
  {
   let data=f.value
  const formData = new FormData();
  formData.append('status', this.update.value.status );
  Swal.fire({
    title: 'Action Irreversible,Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {

    if (result.isConfirmed) {
      this.demandesService.updatedemande(this.dataArray.id,formData).subscribe(response=>
        {
  
          let indexId=this.dataArray.findIndex((obj:any)=>obj.id==this.dataArray.id)
  
          //this.dataArray[indexId].id=data.id
          this.dataArray[indexId].status=data.status
          this.dataArray[indexId].refus_reason=data.refus_reason
  
          this.messageSuccess=`this demande : ${this.dataArray[indexId].status} is updated`
  
         this.route.navigate(['/postulated-missions-client']);
  
        },(err:HttpErrorResponse)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You cant update twice!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
  
        })
      Swal.fire('Saved!', '', 'success')
      window.location.reload()
    } 
    
    else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
  
  
  
  }


  


}
