// This is the default physics engine for the game engine
// You can write your own if you wish to

import { MathG } from "./GameEngine.js";

export class RectCollider{
    constructor(entity){
        // There are some better ways to generate collision, but this works for now
        this.edges = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        };
        
        this.CalculateEdges = ()=>{
            this.edges = {
                top: entity.Transform.position.y,
                bottom: entity.Transform.position.y + entity.Transform.size.height,
                left: entity.Transform.position.x,
                right: entity.Transform.position.x + entity.Transform.size.width,
            }
        }

        this.hasCollided = (otherEntity)=>{
            if (this.edges.left >= otherEntity.edges.right || this.edges.top >= otherEntity.edges.bottom || 
                this.edges.right <= otherEntity.edges.left || this.edges.bottom <= otherEntity.edges.top)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}

// The physics body class uses the collider to generate gravity and basic physics
// Note: if you made your own collider, it must have the "hasCollided(otherEntity)" function
// otherwise your collider would'nt work with this PhysicsBody class

export class PhysicsBody{
    constructor(collidable, entity, collider){
        this.gravitySpeed = 3;

        this.GenGravity = ()=>{
            var isGrounded = false;

            for (const currE of collidable) {
                if(collider.hasCollided(currE)){
                    isGrounded = true;
                }
            }

            if(!isGrounded){
                entity.Transform.Translate({x: 0, y: this.gravitySpeed});
            }
        }
    }
}