import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfacecs/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  localUser: IUser;
  constructor() { }


  // getUser(): Observable<IUser>{
  //   return  JSON.parse(localStorage.getItem('user'));
  // }  

}
