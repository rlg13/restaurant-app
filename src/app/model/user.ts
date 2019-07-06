export class User {  
    name?: string;
    password?: string;

    constructor({ name = null, password = null }) {
        this.name = name;
        this.password = password;
    }
}
