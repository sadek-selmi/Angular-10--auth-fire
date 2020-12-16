
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { element } from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localUser: any;
  constructor(private http: HttpClient, private db: AngularFirestore, private auth: AngularFireAuth, private router: Router) { }

  signUp(email: string, password: string, userStreet: string, userFName: string, userSName: string, userCity: string, userState: string, userZip: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          id: userResponse.user.uid,
          email: userResponse.user.email,
          password: password,
          role: 'user',
          street: userStreet,
          firstName: userFName,
          secondName: userSName,
          city: userCity,
          state: userState,
          zip: userZip,
          image: 'https://firebasestorage.googleapis.com/v0/b/admin-blog-f6b6a.appspot.com/o/images%2FPngItem_1468479.png?alt=media&token=3f1c6e19-93ba-4667-a4b6-704ce086ed98'
        }

        this.db.collection('users').add(user)
          .then(collection => {
            collection.get()
              .then(user => {
                localStorage.setItem('user', JSON.stringify(user.data()))
                this.localUser = JSON.parse(localStorage.getItem('user'))
                if (this.localUser.role === 'user') {
                  this.router.navigateByUrl('profile');
                }
                else {
                  this.router.navigateByUrl('blog');

                }
              })
          })
      })
      .catch(
        err => {
          console.log(err);

        }
      )
  }

  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userResponse => {
        this.db.collection('users').ref.where('id', '==', userResponse.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              localStorage.setItem('user', JSON.stringify(userRef.data()))
              this.localUser = JSON.parse(localStorage.getItem('user'))
              if (this.localUser.role === 'admin') {
                this.router.navigateByUrl('admin');
              }
              else {
                this.router.navigateByUrl('profile');

              }
            })
          }
        )
      })
  }

  signOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('blog');
      })
  }

}

