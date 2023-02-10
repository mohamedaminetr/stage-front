import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-gerer-user',
  templateUrl: './gerer-user.component.html',
  styleUrls: ['./gerer-user.component.css']
})
export class GererUserComponent {


datauser = {
nom:'',
prenom:'',
id: '',
cin:'',
datenaissance:new Date(),
balance:''



}



  updateuser: any;
  addemployee! :  FormGroup;
  dataArrayemploye: any = [];
  dataArray: any = [];
  messageErr: any;
  constructor(private userService: AuthentificationService, private route: Router) {



    this.updateuser=new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      datenaissance:new FormControl('', Validators.required),
      balance:new FormControl('', Validators.required)
      })



    this.userService.getemploye().subscribe(data => {
      this.dataArrayemploye = data;
      console.log(this.dataArrayemploye);

    })

    this.addemployee = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required]),
      datenaissance: new FormControl('', [Validators.required])
    });

    this.userService.getstatic().subscribe(data2 => {
      this.dataArray = data2
      console.log(this.dataArray)

    })





  }

  logout()
  {
  this.userService.logout();
}





  user : User ={
    email:'',
    password:'',
    nom:'',
    prenom:'',
    role: 0,
    cin: 0,
    datenaissance: new Date(),
  }
  addnewemployee (f:any){
    const data = {
      user :{
        email:this.user.email,
        password:this.user.password,
        nom:this.user.nom,
        role:this.user.role,
        prenom:this.user.prenom,
        cin:this.user.cin,
        datenaissance:this.user.datenaissance
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





  delete(id:any  , i :number){
    Swal.fire({
      title: 'Es-tu sûr?',
      text: "Vous ne pourrez pas revenir en arrière ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteuser(id).subscribe(response=>{
          this.dataArrayemploye.splice(i,1)   
        })
        Swal.fire(
          'supprimé',
          'Votre fichier a été supprimé.',
          'success'
        )
      }
    })
  }






  getdata(id:any,nom:string,prenom:string,cin:any,datenaissance:Date,balance:any){
    console.log(this.datauser)
    this.datauser.id= id 
    this.datauser.nom= nom 
    this.datauser.prenom= prenom 
    this.datauser.cin=cin
    this.datauser.datenaissance=datenaissance
    this.datauser.balance=balance

  }


  updateemploye(f:any)
  {
  
    const formData = new FormData();
    formData.append('nom', this.updateuser.value.nom);
    formData.append('prenom', this.updateuser.value.prenom);
    formData.append('cin', this.updateuser.value.cin);
    formData.append('datenaissance', this.updateuser.value.datenaissance);
    formData.append('balance', this.updateuser.value.balance);

let data =f.value

this.userService.updateuser(this.datauser.id,formData).subscribe(

  Response => {
    console.log(Response)
    Swal.fire('Saved!', '', 'success')
    window.location.reload()

  }, (err: HttpErrorResponse) => {
    this.messageErr = err.error

  })
}






}
