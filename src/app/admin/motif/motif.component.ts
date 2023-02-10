import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-motif',
  templateUrl: './motif.component.html',
  styleUrls: ['./motif.component.css']
})
export class MotifComponent {

  datareason = {
    reason: '',
    id: '',
  }

 
  updatereasone: any
  addmotif: any
  messageErr = ''
  counter: any
  dataArray: any = [];
  dataArrayStatic: any = [];
  update: any;
  messageSuccess: string | undefined;




  constructor(private demandesService: AuthentificationService, private route: Router) {

this.updatereasone=new FormGroup({
reason: new FormControl('', Validators.required)

})


    this.addmotif = new FormGroup({
      reason: new FormControl('', [Validators.required]),


    });
    









    this.demandesService.getallreasons().subscribe(data => {
      this.dataArray = data
      console.log(this.dataArray)
      this.counter = this.dataArray.length, (err: HttpErrorResponse) => {
        this.messageErr = "We dont't found this user in our database"
      }

    })


    this.demandesService.getstatic().subscribe(data2 => {
      this.dataArrayStatic = data2
      console.log(this.dataArrayStatic)

    })





  }







  logout() {
    this.demandesService.logout();
  }



  delete(id: any, i: number) {
    Swal.fire({
      title:  'Es-tu sûr?' ,
      text:   "Vous ne pourrez pas revenir en arrière " ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !'  
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandesService.deletemotif(id).subscribe(response => {
          this.dataArray.splice(i, 1)
        })
        Swal.fire(
          'Supprimé!',
          'Votre fichier a été supprimé.' ,
          'success'
        )
      }
    })
  }

  getdata(reason:string,id:any){
    console.log(this.datareason)
    this.datareason.reason= reason 
    this.datareason.id= id 
  

  }

  updatemotif(f:any)
  {
  
    const formData = new FormData();
    formData.append('reason', this.updatereasone.value.reason);

let data =f.value

this.demandesService.updatemotif(this.datareason.id,formData).subscribe(

  Response => {
    console.log(Response)
    Swal.fire('Sauvegarder!', '', 'success')
    window.location.reload()

  }, (err: HttpErrorResponse) => {
    this.messageErr = err.error

  })
}



  addnewmotif(f: any) {

    const formData = new FormData();
    formData.append('reason', this.addmotif.value.reason);


    let data = f.value

    this.demandesService.createmotif(formData).subscribe(
      Response => {
        console.log(Response)
        Swal.fire('Sauvegarder!', '', 'success')
        window.location.reload()

      }, (err: HttpErrorResponse) => {
        this.messageErr = err.error
      });
  }

}


