import {Actor, Rect} from "jacksnipe";

export class Player extends Actor{
    constructor(image, x, y, width, height){
        super(image, x, y, width, height);
        this.rect = new Rect(x, y, width, height);
    }
}
