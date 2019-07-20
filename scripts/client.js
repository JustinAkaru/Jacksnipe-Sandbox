import {Camera, Display, Stage} from "jacksnipe";
import { Player } from "./Actors/player.js";
import { AssetManager } from "./assetLoader.js";
import { TileEngine } from "./tileEngine.js";

let display = new Display();
display.makeDisplay(window.innerWidth, window.innerHeight);

Display.useDisplay(display);

let camera = new Camera();
let stage = new Stage();

let assetLoader = new AssetManager();

let player,
    map = [],
    tileEngine,
    assets = [];

assetLoader.loadAsset("/assets/ether.png");
/* Tiles */
assetLoader.loadAsset("/assets/tiles/air.png");
assetLoader.loadAsset("/assets/tiles/grass.png");
assetLoader.loadAsset("/assets/tiles/dirt.png");
assetLoader.loadAsset("/assets/tiles/stone.png");
assetLoader.loadAsset("/assets/tiles/antimatter.png");
assetLoader.loadAsset("/assets/tiles/water.png");


assetLoader.loadAssets(() => {
    assets["player"] = assetLoader.getAsset("/assets/ether.png");
    assets["air"] = assetLoader.getAsset("/assets/tiles/air.png");
    assets["grass"] = assetLoader.getAsset("/assets/tiles/grass.png");
    assets["dirt"] = assetLoader.getAsset("/assets/tiles/dirt.png");
    assets["stone"] = assetLoader.getAsset("/assets/tiles/stone.png");
    assets["antimatter"] = assetLoader.getAsset("/assets/tiles/antimatter.png");
    assets["water"] = assetLoader.getAsset("/assets/tiles/water.png");
    create();
});

function create(){
    tileEngine = new TileEngine();
    generateMap();
    tileEngine.generate(map, assets);
    player = new Player(assets["player"], 0, 0, 32, 32);
    stage.addActor(player);
    for(let i = 0; i < tileEngine.tiles.length; i++){
        stage.addActor(tileEngine.tiles[i]);
    }

    requestAnimationFrame(render);
}

function render(){
    display.clearDisplay();
    camera.startCamera();

    // camera.moveTo(player.x, player.y);
    camera.moveTo(tileEngine.tiles[2000].x, tileEngine.tiles[2000].y);
    camera.setZoomLevel(2000);

    stage.draw();

    camera.stopCamera();
    requestAnimationFrame(render);
}

// Generates map with provided tiles in (create);
function generateMap(){
    for(let i = 0; i < 60; i++){
        let array = [];
        if(map.length <= 9){
            for(let j = 0; j < 60; j++){
                array.push(0);
            }

        } else if(map.length == 10){
            for(let j = 0; j < 24; j++){
                array.push(0);
            } 

            array.push(5);

            for(let j = 0; j < 60; j++){
                array.push(0);
            }

        } else if(map.length == 11){
            for(let j = 0; j < 60; j++){
                array.push(1);
            }

        } else if(map.length <= 25){
            for(let j = 0; j < 60; j++){
                array.push(2);
            }

        } else if(map.length <= 50){
            for(let j = 0; j < 60; j++){
                array.push(3);
            }
        } else if(map.length <= 60){
            for(let j = 0; j < 60; j++){
                array.push(4);
            }
        }

        map.push(array);
    }
}
