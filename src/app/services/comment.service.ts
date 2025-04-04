import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  // commentSubject = new BehaviorSubject<any>('')
  // commentSubject$ = this.commentSubject.asObservable()

  comments:any

  addComment(comment:string,profileId:any,postId:any){

    const com = {

      comment:comment,
      profileId:profileId,
      postId:postId

    }

    this.http.post<any>('http://localhost:200/addComment',com,{withCredentials:true}).subscribe({

      next:()=>{
        console.log("done");
  
      }
      , 
      error:()=>{

        console.log("not");
        
      }
    })
    // this.getComments(postId)
  }

  getComments(postId:any):Observable<any[]>{

    console.log(postId);
    

    return this.http.get<any>(`http://localhost:200/getComments/${postId}`,{withCredentials:true}).pipe(

      map(res=>{

        // this.commentSubject.next(res.comments)
        // console.log(postId);
        
        // console.log(res);
        

        return res



      })
    )
  }

  deletComments(commentId:any):Observable<any>{

    return this.http.delete<any>(`http://localhost:200/deleteComment/${commentId}`,{withCredentials:true}).pipe(

      map(res=>{

        return res


      })
    )
  }



}