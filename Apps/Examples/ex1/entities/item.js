// imports 
import { Entity } from '../../../../Entity.js';
import { Game } from '../main.js';
import { PhysicsBody, RectCollider } from '../../../../PhysicsEngine.js'
import { ground } from './ground.js';
import { MathG } from '../../../../GameEngine.js';
import { player } from './player.js';

// creating the entity
var item = new Entity(0, 10, 25, 25);

// setting up
item.render.meshType = 'rect';
item.render.fillStyle = 'yellow';

// setup collider (im using the default collider, you can use your own.)
item.collider = new RectCollider(item);
// setup physics body (im using the default physics engine, you can use your own.)
item.physicsBody = new PhysicsBody([], item, item.collider);

// slowing down the gravity speed
item.physicsBody.gravitySpeed = 1;

// using my own custom variable
item.randX =  null;

// on update is called each frame
item.onUpdate = ()=>{
    // generating a random x position if my custom variable is null
    if(item.randX == null){
        item.randX = Math.floor(Math.random() * Game.viewport.width)
    }
    item.Transform.position.x = item.randX;

    // limiting the x position so the item doesnt go out of bounds (just in case)
    item.Transform.position.x = MathG.limit(
        item.Transform.position.x, 
        0, 
        Game.viewport.width - item.Transform.size.width
    );

    // calculate edges for collision detection
    item.collider.CalculateEdges();

    // decresing the score if the item collides with the ground
    if(item.collider.hasCollided(ground.collider)){
        player.score -= 5;
        
        item.Transform.position.y = 10;
        item.randX = null;
    }

    // Generating the gravity
    item.physicsBody.GenGravity();
}

// exporting for use elsewhere
export var item;