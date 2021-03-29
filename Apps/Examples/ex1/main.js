// Importing the GameEngine class
import { GameClass } from '../../../GameEngine.js';

// Inistantize the Game
var Game = new GameClass(document.getElementById('container'), 800, 600);

// Importing all of the entities
import { ground } from './entities/ground.js';
import { player } from './entities/player.js';
import { item } from './entities/item.js';
import { mainWidget } from './entities/mainWidget.js'
import { Button } from './entities/startScreen.js';

// On Awake Function is called before the game starts
Game.onAwake = ()=>{
    // setting all the game entities and the main background style
    Game.Background = '#30e3e3';

    Game.level = 'startScreen';
    // Note: the order of entities might matter in some situations
    //Game.entities = [ground, player, item, mainWidget];
}

// On Update Function is called every frame
Game.onUpdate = ()=>{
    if(Game.level == 'main') {
        // clearing the screen then drawing the background again
        Game.entities = [ground, player, item, mainWidget];
        Game.context.restore();
        Game.context.fillStyle = Game.Background;
        Game.context.fillRect(
            0, 0,
            Game.viewport.width,
            Game.viewport.height
        );
    }
    else if(Game.level == 'startScreen'){
        // clearing the screen then drawing the background again
        Game.entities = [Button];

        Game.context.restore();
        Game.context.fillStyle = Game.Background;
        Game.context.fillRect(
            0, 0,
            Game.viewport.width,
            Game.viewport.height
        );
    }
}

// Start the game
Game.StartGame();

// Export the game variable to use elsewhere
export var Game;