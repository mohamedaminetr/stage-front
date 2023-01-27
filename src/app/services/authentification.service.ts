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


getstatic()
{
return this.http.get(environment.urlBackend + 'static_admin/');
}

getemploye()
{
return this.http.get(environment.urlBackend + 'users/');

}

deleteuser(id:any)
{
return this.http.delete(environment.urlBackend+'users/'+id);

}



deleterequest(id:any)
{
return this.http.delete(environment.urlBackend+'demandes/'+id);

}

updatedemande (id:string,newdata:any) {
  return this.http.put(environment.urlBackend+'demandes/' + id , newdata )
}


createuser(data:any)
{
  debugger;
return this.http.post(environment.urlBackend+'registrations/', data);
}


IsloggedIn()
{
return !!sessionStorage.getItem('token');

}


logout(){
  sessionStorage.clear()
  this.router.navigate(['/']);

}
}
