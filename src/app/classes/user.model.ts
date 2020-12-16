import { IUser } from '../interfacecs/user.interface';

export class User implements IUser{
   public id: string;
   public email: string;
   public password:string;
   public role: string;
   public street: string;
   public firstName: string;
   public secondName: string;
   public city: string;
   public state: string;
   public zip: string;
   public image: string;
}