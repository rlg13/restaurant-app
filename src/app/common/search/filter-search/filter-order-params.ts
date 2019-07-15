export class FilterOrderParams {
    initialDate?: Date;
    endDate?: Date;
    user?: string;

    constructor({ initialDate = null, endDate = null, user = null }) {
        this.initialDate = initialDate;
        this.endDate = endDate;
        this.user = user;
    }

}
