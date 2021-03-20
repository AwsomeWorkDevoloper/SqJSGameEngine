// imports 
import { Entity } from '../../../../Entity.js';
import { Game } from '../main.js';
import { PhysicsBody, RectCollider } from '../../../../PhysicsEngine.js'
import { ground } from './ground.js';
import { MathG } from '../../../../GameEngine.js';
import { item } from './item.js'


var player = new Entity(400, 400, 50, 50);
player.render.meshType = 'rect';
player.render.fillStyle = 'red';

player.SidewaysSpeed = 20;
player.score = 0;

player.collider = new RectCollider(player);
player.physicsBody = new PhysicsBody([ground.collider], player, player.collider);

player.onUpdate = ()=>{
    if(Game.RequestKey("a") || Game.RequestKey("ArrowLeft")){
        player.Transform.Translate({x: -player.SidewaysSpeed, y: 0});
        Game.ResetKey();
    }
    if(Game.RequestKey("d") || Game.RequestKey("ArrowRight")){
        player.Transform.Translate({x: player.SidewaysSpeed, y: 0});
        Game.ResetKey();
    }

    player.Transform.position.x = MathG.limit(
        player.Transform.position.x, 
        0, 
        Game.viewport.width - player.Transform.size.width
    );

    if(player.collider.hasCollided(item.collider)){
        player.score += 1;

        item.Transform.position.y = 10;
        item.randX = null;
    }

    player.collider.CalculateEdges();
    player.physicsBody.GenGravity();
}

export var player;
