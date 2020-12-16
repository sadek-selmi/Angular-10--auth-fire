import { IBlog } from '../interfacecs/blog.interface';

export class Blog implements IBlog {
    constructor(
        public id: number,
        public title: string,
        public text: string,
        public date: Date,
        public author: string,
        public image: string
    ){}
    
}
