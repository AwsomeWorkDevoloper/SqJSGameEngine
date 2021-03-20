// imports 
import { Entity } from '../../../../Entity.js';
import { Game } from '../main.js';
import { MathG } from '../../../../GameEngine.js';
import { player } from './player.js';
import { item } from './item.js';

var mainWidget = new Entity(600, 50, 100, 100);
mainWidget.render.meshType = 'text';
mainWidget.render.fillStyle = 'white';
mainWidget.render.font = '50px Arial';

mainWidget.onUpdate = ()=>{
    mainWidget.render.text = `${player.score} PTS`;
    mainWidget.Transform.position.x = MathG.limit(
        mainWidget.Transform.position.x,
        0,
        Game.viewport.width - mainWidget.Transform.size.width - 75
    )

    if(player.score < 0){
        mainWidget.Transform.position = {
            x: 100,
            y: 250
        }
        mainWidget.render.text = `You lost! Press 'f' to restart.`
        item.physicsBody.gravitySpeed = 0;
        player.SidewaysSpeed = 0;

        if(Game.RequestKey('f')){
            window.location.reload();
            Game.ResetKey();
        }
    }
}

export var mainWidget;