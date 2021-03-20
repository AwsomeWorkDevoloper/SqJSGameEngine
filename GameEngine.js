// This is the game engine class that generates the game

export class GameClass{
    constructor (container, width, height) {
        // create canvas and canvas context
        this.viewport = document.createElement('canvas');
        this.viewport.width = width;
        this.viewport.height = height;
        this.context = this.viewport.getContext('2d');

        // save the latest input data
        this.latestKey = '';
        this.latestMouseData = {};

        // set the default entities
        // Note: you need to add entities to this list by changing the array 
        // or using the "SpawnEntity(entity)" to add an entity to the list.
        // you can also use the "DestroyEntity(entity)" to remove an entity.
        this.entities = [];
        
        // Spawn an entity
        this.SpawnEntity = (data)=>{
            this.entities.push(data);
        }

        // Remove an entity
        this.DestroyEntity = (data)=>{
            var newEntitiesList = []
            for (let i = 0; i < this.entities.length; i++) {
                const element = this.entities[i];
                if(element == data){}else{
                    newEntitiesList.push(element);
                }
            }

            this.entities = newEntitiesList;
        }

        // handle keyboard input
        document.addEventListener('keydown', e => {
            this.latestKey = e.key;
        });

        // handle mouse click input
        document.addEventListener('mousedown', e => {
            this.latestMouseData = e;
            this.wasClicked = true;
        });

        // handle mouse move input
        document.addEventListener('mousemove', e => {
            this.latestMouseData = e;
            this.wasClicked = false;
        });

        this.onAwake = ()=>{}

        // request a key
        this.RequestKey = (key)=>{
            if(this.latestKey == key){
                return true;
            }
            return false;
        }

        // request mouse data
        this.RequestMouseData = (data)=>{
            if(data == 'x') return this.latestMouseData.pageX;
            if(data == 'y') return this.latestMouseData.pageY;
            if(data == 'clicked') return this.latestMouseData.wasClicked;
        }

        // reset input data
        this.ResetKey = ()=>{this.latestKey = ''}
        this.ResetMouseData = ()=>{this.latestMouseData = {}}

        // run this function to start the game
        this.StartGame = ()=>{
            this.onAwake();
            container.appendChild(this.viewport);

            setInterval(()=>{
                this.onUpdate();
                if(this.entities.length > 0){
                    this.entities.forEach(entity => {
                        entity.update(this);
                    });
                }
            }, 1);
        }
    }
}

// This is an extra set of functions to help with math in this game engine
export var MathG = {
    // This function limits the value of something between a minimum and a maximum.
    limit: (value, min, max)=>{
        if(value < min){
            value = min;
        }
        if(value > max){
            value = max;
        }

        return value;
    }
}

