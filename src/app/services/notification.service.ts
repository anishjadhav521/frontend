import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getNotification(profileId:any):Observable<any[]>{

    console.log(profileId);
    
    return this.http.get<any>(`http://localhost:200/getNotification/${profileId}`,{withCredentials:true}).pipe(
      map((res)=>{
        console.log(res);
        
        return res.notification
      })
    )
  }

  addNotification(notification:any):Observable<any>{

    return this.http.post<any>('http://localhost:200/addNotification',notification,{withCredentials:true}).pipe(map(
      (res)=>{

        return res
      }
    ))

  }

}