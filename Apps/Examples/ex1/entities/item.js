// imports 
import { Entity } from '../../../../Entity.js';
import { Game } from '../main.js';
import { PhysicsBody, RectCollider } from '../../../../PhysicsEngine.js'
import { ground } from './ground.js';
import { MathG } from '../../../../GameEngine.js';
import { player } from './player.js';

var item = new Entity(0, 10, 25, 25);
item.render.meshType = 'rect';
item.render.fillStyle = 'yellow';

item.collider = new RectCollider(item);
item.physicsBody = new PhysicsBody([], item, item.collider);
item.physicsBody.gravitySpeed = 1;
item.randX =  null;

item.onUpdate = ()=>{
    if(item.randX == null){
        item.randX = Math.floor(Math.random() * Game.viewport.width)
    }
    item.Transform.position.x = item.randX;
    item.Transform.position.x = MathG.limit(
        item.Transform.position.x, 
        0, 
        Game.viewport.width - item.Transform.size.width
    );

    item.collider.CalculateEdges();

    if(item.collider.hasCollided(ground.collider)){
        player.score -= 5;
        
        item.Transform.position.y = 10;
        item.randX = null;
    }
    item.physicsBody.GenGravity();
}

export var item;