// imports 
import { Entity } from '../../../../Entity.js';
import { ButtonCollider } from '../../../../UIEngine.js';
import { Game } from '../main.js';

//setup
var Button = new Entity(320, 300, 150, 50);
//use a custom mesh
Button.render.meshType = 'custom';
Button.textColor = 'black';

//render the custom mesh
Button.render.customMesh = (game) => {
    game.context.fillStyle = 'white';
    game.context.fillRect(
        Button.Transform.position.x, 
        Button.Transform.position.y, 
        Button.Transform.size.width, 
        Button.Transform.size.height
    );

    game.context.fillStyle = Button.textColor;
    game.context.font = '25px Arial';
    game.context.fillText(
        "Start Game", 
        Button.Transform.position.x+(Button.Transform.position.x / Button.Transform.size.width),
        Button.Transform.position.y+(Button.Transform.size.height / 2)
    );
};

// add the button collider
Button.collider = new ButtonCollider(Button);

// on update is called each frame
Button.onUpdate = () => {
    // calculate button edges
    Button.collider.CalculateEdges();

    // check if the mouse is hovering over the button
    var hoverState = Button.collider.isHovering(
        {
            x: Game.RequestMouseData('x'),
            y: Game.RequestMouseData('y')
        }
    );
    
    // make the text color red if hovering
    if(hoverState == true) {
        Button.textColor = 'grey';
        document.body.style.cursor = 'pointer';
    }
    else {
        Button.textColor = 'black';
        document.body.style.cursor = 'default';
    }  

    // check if user is pressing the button
    var pressedState = Button.collider.isPressed(
        Game.RequestMouseData('clicked'), hoverState
    );

    // switch to the main level
    if(pressedState == true) {
        Game.level = 'main';
        document.body.style.cursor = 'default';
    }
};

export var Button;