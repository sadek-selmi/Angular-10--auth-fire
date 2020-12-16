import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { IUser } from 'src/app/interfacecs/user.interface';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profUser: IUser
  height = true;
  productImage: string;
  img = false;
  user: Array<IUser> = [];
  constructor(private profService: ProfileService, private auth: AngularFireAuth, private db: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(): void {
    this.profUser = JSON.parse(localStorage.getItem('user'))
    this.productImage = this.profUser.image
    console.log(this.profUser);
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);


    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;

        this.auth.signInWithEmailAndPassword(this.profUser.email, this.profUser.password)
          .then(userResponse => {
            this.db.collection('users').ref.where('id', '==', userResponse.user.uid).onSnapshot(
              snap => {
                snap.forEach(userRef => {
                  userRef.data();
                  // console.log(userRef.data());


                })
              })
          })

      });
    });
  }
  changeImg(): void {
    this.img = !this.img
  }

}
