// imports 
import { Entity } from '../../../../Entity.js';
import { Game } from '../main.js';
import { MathG } from '../../../../GameEngine.js';
import { player } from './player.js';
import { item } from './item.js';

// creating the entity
var mainWidget = new Entity(600, 50, 100, 100);

// setting up
mainWidget.render.meshType = 'text';
mainWidget.render.fillStyle = 'white';
mainWidget.render.font = '50px Arial';

// on update is called each frame
mainWidget.onUpdate = ()=>{
    // setting the text to the player's score
    mainWidget.render.text = `${player.score} PTS`;

    // limiting the x just in case
    mainWidget.Transform.position.x = MathG.limit(
        mainWidget.Transform.position.x,
        0,
        Game.viewport.width - mainWidget.Transform.size.width - 75
    )

    // ending the game if the player's score is less than 0
    if(player.score < 0){
        mainWidget.Transform.position = {
            x: 100,
            y: 250
        }
        mainWidget.render.text = `You lost! Press f to restart.`
        item.physicsBody.gravitySpeed = 0;
        player.SidewaysSpeed = 0;

        // restarting the game if 'f' is pressed
        if(Game.RequestKey('f')){
            window.location.reload();
            Game.ResetKey();
        }
    }
}

// exporting for use elsewhere
export var mainWidget;