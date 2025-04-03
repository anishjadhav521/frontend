import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowersFollowingService {

  constructor(private http:HttpClient) { }

  followers!:any[]
  followings!:any[]

  followersCount:any
  followingCount:any

  followerCs = new BehaviorSubject('');
  followerCs$  = this.followerCs.asObservable();

  followingCs = new BehaviorSubject('');
  followingCs$ = this.followingCs.asObservable();

  followersSubject = new BehaviorSubject<any>([]);
  followersSubject$ = this.followersSubject.asObservable()

  followingSubject = new BehaviorSubject<any>([]);
  followingSubject$ = this.followingSubject.asObservable()  

  getFollowers(profileId: any): Observable<any[]> {

    return this.http.get<any>(`http://localhost:200/getFollowers/${profileId}`, { withCredentials: true }).pipe(
      map(res => {
        this.followers = res.followers;
        this.followersCount = this.followers.length;
  
        console.log(this.followers);
  
        this.followerCs.next(this.followersCount);
        console.log(this.followersCount);
        
        this.followersSubject.next(this.followers);
  
        return res.followers;
      })
      
    );
  }
  




  getFollowing(profileId:any):Observable<any[]> {
    return this.http.get<any>(`http://localhost:200/getFollowing/${profileId}`, { withCredentials: true}).pipe(

        map(res => {
    
          this.followings = res.followings;

          this.followingCount = this.followings.length;

          this.followingCs.next(this.followingCount)
          this.followingSubject.next(this.followings)

          console.log(res.followings);
          

          return res.followings

      })
    )
  };
}

  // getFollowingCount(){

  //   return this.followingCount
  // }
  




