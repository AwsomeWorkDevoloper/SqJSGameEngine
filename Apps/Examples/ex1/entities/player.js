// imports 
import { Entity } from '../../../../Entity.js';
import { Game } from '../main.js';
import { PhysicsBody, RectCollider } from '../../../../PhysicsEngine.js'
import { ground } from './ground.js';
import { MathG } from '../../../../GameEngine.js';
import { item } from './item.js'

// creating the entity
var player = new Entity(400, 400, 50, 50);

// setting up
player.render.meshType = 'rect';
player.render.fillStyle = 'red';

// my custom variables for the game
player.SidewaysSpeed = 20;
player.score = 0;

// setup collider (im using the default collider, you can use your own.)
player.collider = new RectCollider(player);
// setup physics body (im using the default physics engine, you can use your own.)
player.physicsBody = new PhysicsBody([ground.collider], player, player.collider);

// on update function is called each frame
player.onUpdate = ()=>{
    // moving using "a, d" or "left arrow, right arrow"
    if(Game.RequestKey("a") || Game.RequestKey("ArrowLeft")){
        player.Transform.Translate({x: -player.SidewaysSpeed, y: 0});
        // reseting the key so the movement stops once the player lets go of the key
        Game.ResetKey();
    }
    if(Game.RequestKey("d") || Game.RequestKey("ArrowRight")){
        player.Transform.Translate({x: player.SidewaysSpeed, y: 0});
        // reseting the key so the movement stops once the player lets go of the key
        Game.ResetKey();
    }

    // limiting the x so the player doesnt go out of bounds
    player.Transform.position.x = MathG.limit(
        player.Transform.position.x, 
        0, 
        Game.viewport.width - player.Transform.size.width
    );

    // incrementing the score when the player collides with the item
    if(player.collider.hasCollided(item.collider)){
        player.score += 1;

        item.Transform.position.y = 10;
        item.randX = null;
    }

    // calculating the edges for the collision detection
    player.collider.CalculateEdges();
    // generating gravity
    player.physicsBody.GenGravity();
}

// exporting for use elsewhere
export var player;
