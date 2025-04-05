import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any[]>{

    return this.http.get<any>('http://localhost:200/getAllUsers',{withCredentials:true})
    // .pipe(
    //   map((res:any)=>{


    //     return res

        
    //   })
    // )

  }

  deleteUser(userId:any):Observable<any[]>{

    return this.http.delete<any>(`http://localhost:200/deleteUser/${userId}`,{withCredentials:true})

  }


}
