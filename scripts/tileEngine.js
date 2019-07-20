/*
    tileEngine.js
    provided with tiles, this file can read a tile map, turn them into useable tiles for collision, building, mining.
*/

//imports
import {Tile} from "./Actors/tile.js";

//TileEngine
export class TileEngine{

    constructor(){
        this.tiles = [];
        this.width = 0;
        this.totaltiles = 0;
    }

    generate(map,assets){
        map.forEach((row, i) => {
            this.width += 32;
            row.forEach((tileID, j) => {
                this.totaltiles++;
                let tile = null;
                if(tileID){
                    if(tileID == 0){
                        tile = new Tile(assets["air"], "Air", j * 32, i * 32, 32, "none", tileID);
                    } else if(tileID === 1){
                        tile = new Tile(assets["grass"], "Grass", j * 32, i * 32, 32, "foreground", tileID);
                    } else if(tileID === 2){
                        tile = new Tile(assets["dirt"], "Dirt", j * 32, i * 32, 32, "foreground", tileID);
                    } else if(tileID === 3){
                        tile = new Tile(assets["stone"], "Stone", j * 32, i * 32, 32, "foreground", tileID);
                    } else if(tileID === 4){
                        tile = new Tile(assets["antimatter"], "Antimatter", j * 32, i * 32, 32, "unbreakable", tileID);
                    } else if(tileID === 5){
                        tile = new Tile(assets["water"], "Water", j * 32, i * 32, 32, "spawn", tileID);
                    } else {
                        // Do Nothing
                    }
                    this.tiles.push(tile);
                }
            })
        })

        this.height = this.totaltiles / this.width;
    }
}