// This is the main UI Engine for this game engine

export class ButtonCollider{
    constructor(entity){
        // There are some better ways to generate button functionality, but this works for now
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

        this.isHovering = (MouseData) => {
            var x = MouseData.x;
            var y = MouseData.y;

            if(
                x >= this.edges.left && x <= this.edges.right
                &&
                y >= this.edges.top && y <= this.edges.bottom
            ) {
                return true;
            }else{
                return false;
            }
        }

        this.isPressed = (clicked, hoverState) => {
            if(clicked && hoverState) return true;
            return false;
        }
    }
}