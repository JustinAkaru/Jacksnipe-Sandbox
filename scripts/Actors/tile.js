import {Actor, Rect} from "jacksnipe";

export class Tile extends Actor{
    constructor(image, x, y, width, height, id){
        super(image, x, y, width, height);
        this.id = id;
        this.rect = new Rect(x, y, width, height);
    }
}