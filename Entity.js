// This is the entity class
// The entity class is requried in almost all games.

export class Entity{
    constructor (x, y, width, height) {
        this.Transform = {
            position: {
                x: x,
                y: y
            },
            rotation: 0,
            size: {
                width: width,
                height: height
            },
            Translate: (data)=>{
                this.Transform.position.x += data.x;
                this.Transform.position.y += data.y;
            },
            Rotate: (data)=>{
                this.Transform.rotation += data
            },
            Dialate: (data)=>{
                this.Transform.size.width += data.w;
                this.Transform.size.height += data.h;
            }
        }

        this.render = {
            show: true,
            meshType: '',
            fillStyle: '',
            image: null
        }

        this.collider = null;
        this.physicsBody = null;

        this.onAwake = ()=>{}
        this.onUpdate = ()=>{}

        this.update = (Game)=>{
            if(this.render.show){
                // Check if the mesh type is a rectangle
                if(this.render.meshType == 'rect'){
                    Game.context.fillStyle = this.render.fillStyle;
                    Game.context.rotate(this.Transform.rotation)
                    Game.context.fillRect(
                        this.Transform.position.x, 
                        this.Transform.position.y, 
                        this.Transform.size.width, 
                        this.Transform.size.height
                    );
                }
                // Check if the mesh type is an image
                if(this.render.meshType == 'image'){
                    Game.context.rotate(this.Transform.rotation)
                    Game.context.drawImage(this.render.image, this.Transform.position.x, this.Transform.position.y)
                }
                // Check if the mesh type is some text
                if(this.render.meshType == 'text'){
                    Game.context.font = this.render.font;
                    Game.context.fillStyle = this.render.fillStyle;
                    Game.context.fillText(this.render.text, this.Transform.position.x, this.Transform.position.y)
                }
                if(this.render.meshType == 'custom'){
                    this.render.customMesh(Game);
                }
            }else{}

            this.onUpdate();
        }
    }
}