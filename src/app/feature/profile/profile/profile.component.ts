import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private userService: UserService,private router:Router, private activatedRoute : ActivatedRoute) {}

  userProfile: any;

  changeUsername = false;
  changeBio = false;
  changePhoneNumber = false;
  changeEmail = false;
  changePassword: boolean = false;

  newUsername: string = '';
  newEmail: string = '';
  newBio: string = '';
  newPhoneNumber: string = '';

  profilePicFile:any
  profilePic : any

  usernameSubject = new Subject();

  ngOnInit(): void {

    this.getProfile();

  }

  editUsername() {
    this.changeUsername = !this.changeUsername;
  }

  editEmail() {
    this.changeEmail = !this.changeEmail;
  }

  editPhoneNumber() {
    this.changePhoneNumber = !this.changePhoneNumber;
  }

  editBio() {
    this.changeBio = !this.changeBio;
  }

  editPassword() {
    this.changePassword = !this.changePassword;
  }

  

  updateUsername() {
    if (this.newUsername) {
      const updateUsername = {
        newUsername: this.newUsername,
        profileId: this.userProfile.id,
      };
      this.http
        .patch('http://localhost:200/updateUsername', updateUsername, {
          withCredentials: true,
        })
        .subscribe({
          next: (res: any) => {
            this.getProfile();
            alert('username updated succesfully');
          },
          error: (res) => {
            console.log(res);
          },
        });
    } else {
      alert('field empty');
    }
  }



  updateEmail() {
    if (this.newEmail &&  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.newEmail)) {
      const updateEmail = {
        newEmail: this.newEmail,
        profileId: this.userProfile.id,
      };
      this.http
        .patch('http://localhost:200/updateEmail', updateEmail, {
          withCredentials: true,
        })
        .subscribe({
          next: (res: any) => {
            this.getProfile();
            alert('Email updated succesfully');
          },
          error: (res) => {
            console.log(res);
          },
        });
    } else {
      alert('field empty or invalid');
    }
  }



  updatePhoneNumber() {

    if (this.newPhoneNumber && /^[6-9]\d{9}$/.test(this.newPhoneNumber)) {
      const updatePhoneNumber = {
        newPhoneNumber: this.newPhoneNumber,
        profileId: this.userProfile.id,
      };
      this.http
        .patch('http://localhost:200/updatePhoneNumber', updatePhoneNumber, {
          withCredentials: true,
        })
        .subscribe({
          next: (res: any) => {
            this.getProfile();
            alert('updatePhoneNumber updated succesfully');
          },
          error: (res) => {
            console.log(res);
          },
        });
    } else {
      alert('field empty or invalid');
    }
  }

  updateBio() {
    if (this.newBio && this.newBio.length < 50) {

      console.log(this.newBio.length);
      console.log(10);
      
      
      const updateBio = {
        newBio: this.newBio,
        profileId: this.userProfile.id,
      };
      this.http
        .patch('http://localhost:200/updateBio', updateBio, {
          withCredentials: true,
        })
        .subscribe({
          next: (res: any) => {
            this.getProfile();
            alert('bio updated succesfully');
          },
          error: (res) => {
            console.log(res);
          },
        });
    } else {
      alert('field empty or too long');
    }
  }

  getProfile() {
    this.http
      .get('http://localhost:200/getUserProfile', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          this.userProfile = res.profile[0];
          this.profilePic = 'assets/'+res.profile[0].profilePic
          console.log(res.profile[0]);
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  deactivateAccount(id:any){

    console.log('hitted');
    

    this.http.delete(`http://localhost:200/deleteUser/${id}`,{withCredentials:true}).subscribe({

      next:(res:any)=>{

        console.log(res);
        alert('de-activated')
        this.router.navigate(['/']);
      }
    })



  }

  onProfilePicSelected(event:any){




    if(event.target.files.length>0){

      this.profilePicFile = event.target.files[0]

     if(this.profilePicFile && (this.profilePicFile.type ==='image/png' || this.profilePicFile.type ==='image/jpeg')){


      const formdata = new FormData()
      formdata.append('file', this.profilePicFile)

      if(this.profilePicFile){

        console.log("hited profile upload");
        

        this.http.patch('http://localhost:200/updateProfile', formdata, { withCredentials: true }).subscribe({

        next: (res: any) => {   
          
          this.getProfile()
          alert(res.msg)

    
        },
        error:(err)=>{

          console.log(err);
          

        }
      })
     };
    }
    else{

      alert("invalid format")
    }
    }

  }

  redirectToInsights(profileID:number){

    console.log(profileID);
    
    this.router.navigate(['./insights'],{relativeTo : this.activatedRoute})


  }
}

  // submitProfilePic(){

  //   // this.isPostFormVisible = !this.isPostFormVisible
  //   const formdata = new FormData()
  //   formdata.append('file', this.profilePicFile)
  //   // formdata.append('caption', this.caption)

  //   {

  //     this.http.post('http://localhost:200/updateProfile', formdata, { withCredentials: true }).subscribe({

  //       next: (res: any) => {

         
  // console.log(res);
  
  //   }
  //   })
  //   }
  //   // else{

  //   //   alert("empty")
  //   // }



  // }


// }
