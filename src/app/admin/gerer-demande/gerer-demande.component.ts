import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      status: new FormControl('', [Validators.required])

    });


    


  }







  logout()
  {
  this.demandesService.logout();
}



  delete(id:any  , i :number){
    Swal.fire({
      title: 'Es-tu sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandesService.deleterequest(id).subscribe(response=>{
          this.dataArray.splice(i,1)   
        })
        Swal.fire(
          'Supprimé!',
          'Votre fichier a été supprimé.',
          'success'
        )
      }
    })
  }




  getdata(status:string, id:any){
    this.datademande.id=id
    this.datademande.status=status
    console.log(this.datademande)
  }

  updatedemande(f:any)
  {
    const formData = new FormData();
    formData.append('status', this.update.value.status);

let data =f.value

this.demandesService.updatedemande(this.datademande.id,formData).subscribe(

  Response => {
    console.log(Response)
    Swal.fire('Saved!', '', 'success')
    window.location.reload()

  }, (err: HttpErrorResponse) => {
    this.messageErr = err.error

  })
}





  


}
