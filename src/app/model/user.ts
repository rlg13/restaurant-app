export class User {
    id?: number;
    name?: string;
    password?: string;

    constructor({ id = null, name = null, password = null }) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}
