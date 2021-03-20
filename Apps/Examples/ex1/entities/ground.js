// imports 
import { Entity } from '../../../../Entity.js';
import { Game } from '../main.js';
import { RectCollider } from '../../../../PhysicsEngine.js'

// create the ground entity
var ground = new Entity(0, 0, 0, 50);

// setup looks
ground.render.meshType = 'rect';
ground.render.fillStyle = 'green';

// setup collider (im using the default collider, you can use your own.)
ground.collider = new RectCollider(ground);

// the on update function is called each frame
ground.onUpdate = ()=>{
    ground.Transform.size.width = Game.viewport.width;
    ground.Transform.position.y = Game.viewport.height - ground.Transform.size.height;

    ground.collider.CalculateEdges();
}

// exporting the entity to use elsewhere
export var ground;