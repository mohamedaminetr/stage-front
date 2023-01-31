import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService
 {
  constructor(private http : HttpClient , public router: Router) { }
  
  
  login(data:any): Observable<any> {

return this.http.post(environment.urlBackend + 'sessions/', data);
  }


  getalldemande()
{
  return this.http.get(environment.urlBackend + 'demandes/')
  
}

getdemande(id:any): Observable<any>  
{
return this.http.get(environment.urlBackend + 'demandeid/' + id)
}

getstatic()
{
return this.http.get(environment.urlBackend + 'static_admin/');
}

getemploye()
{
return this.http.get(environment.urlBackend + 'users/');

}

getallreasons()
{
return this.http.get(environment.urlBackend + 'motif/');

}



deletemotif(id:any)
{
return this.http.delete(environment.urlBackend+'motif/'+id);

}

deleteuser(id:any)
{
return this.http.delete(environment.urlBackend+'users/'+id);

}



deleterequest(id:any)
{
return this.http.delete(environment.urlBackend+'demandes/'+id);

}



createmotif(data:any)
{
return this.http.post(environment.urlBackend+'motif/', data);
}

updatemotif(id:string,newdata:any){
  return this.http.patch(environment.urlBackend+'motif/' + id , newdata )
}
createuser(data:any)
{
return this.http.post(environment.urlBackend+'registrations/', data);
}


updateuser(id:string,newdata:any){
return this.http.patch(environment.urlBackend+'users/' + id, newdata)
}

updatedemande(id:string,newdata:any){
  return this.http.patch(environment.urlBackend+'demandes/' + id, newdata)
  }
  


IsloggedIn()
{
return !!sessionStorage.getItem('token');

}


logout(){
  sessionStorage.clear()
  this.router.navigate(['/']);

}


createdemande(data:any)
{
  debugger
return this.http.post(environment.urlBackend+'demandes/', data);
}


}
