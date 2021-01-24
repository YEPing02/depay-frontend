import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) {

   }

   createUser (user : any){
     this.httpClient.post('http://localhost:8080/user',user).subscribe(
        function(res){
          console.log(res);
        },
        function(err){
          console.log(err)
        }

     )
     console.log(1)

   }

   checkUniquePseudo(pseudo : string) : Observable<boolean>{
     var param =new HttpParams().set('pseudo',pseudo);
      
     return this.httpClient.get<boolean>("http://localhost:8080/user/unique",{'params':param});
   }

   isSame(text1 : String, text2:String):boolean{
     return text1 == text2;
   }


}
