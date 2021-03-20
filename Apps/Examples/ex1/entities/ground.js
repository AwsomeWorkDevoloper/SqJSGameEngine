// imports 
import { Entity } from '../../../../Entity.js';
import { Game } from '../main.js';
import { RectCollider } from '../../../../PhysicsEngine.js'

var ground = new Entity(0, 0, 0, 50);
ground.render.meshType = 'rect';
ground.render.fillStyle = 'green';

ground.collider = new RectCollider(ground);

ground.onUpdate = ()=>{
    ground.Transform.size.width = Game.viewport.width;
    ground.Transform.position.y = Game.viewport.height - ground.Transform.size.height;

    ground.collider.CalculateEdges();
}

export var ground;