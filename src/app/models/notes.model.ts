export class Note{
    label: string ;
    date: Date;
    body: string;
    show:boolean;
    constructor(){
        this.label = 'New Note Created';
        this.date = new Date();
        this.body = 'No additional Text Content';
        this.show = true;

    }
}