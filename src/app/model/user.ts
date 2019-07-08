export class User {
    id?: string;
    name?: string;
    password?: string;
    sessionId?: string;

    constructor({ id = null, name = null, password = null }) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}
