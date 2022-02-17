// Entity/primitive variables holding values of their DOM elements and table borders
const racket1Entity = document.querySelector("a-entity[gltf-model$='1']");
const racket2Entity = document.querySelector("a-entity[gltf-model$='2']");
const balloonNetEntity = document.querySelector("a-entity[gltf-model^='#balloon']");
const table = document.getElementsByTagName('a-box')[0];
const tableSides = document.querySelectorAll("a-box a-box[depth='0.01']");
const ball = document.getElementsByTagName('a-sphere')[0];
const borders = { xLeft: -0.61, xRight: 0.61, yBack: -0.925, yFront: 0.925, zTop: -0.5, zBottom: -0.03 };

// Determines the exact position of the first bounce after first serve
const firstServeBounce = () => {
    const xFirstServeBounce = ((Math.random() *  (borders.xLeft / 2)) ).toFixed(3);
    const yFirstServeBounce = ((Math.random() * (borders.yBack / 2)) - 0.1 ).toFixed(3);
    const position = { x: xFirstServeBounce, y: yFirstServeBounce, z: borders.zBottom };
    ball.setAttribute("animation", `property: position; to: ${position.x} ${position.y} ${position.z}; dur: 500; delay: 7500; easing: linear;`);
    return position;            
}

// Determine the position of each hop over the net
// ***** Please note I am trying to add the difference in x movement of the ball from first serve to bounce divided by two to roughly determine where the ball should hop over net
const netHop = (lastPosition) => {
    const ballPosition = ball.getAttribute("position");
    const ballPositionChangeX = ((ballPosition.x - lastPosition.x) * -1).toFixed(3);
    console.log(lastPosition.x + " " + ballPositionChangeX);
// Determining hop position value
    const xHop = (parseFloat(lastPosition.x) + parseFloat(ballPositionChangeX)) / 2;
    console.log(xHop);
    // const yHop = ;
    // const zHop = ;
// Setting the hop positing value
}

// After page load the scene is defined and a series of animations will be executed when the marker is found
window.onload = () => {
    const scene = document.querySelector('a-scene');
    let markerFoundEventNumber = 0;

// The markerFound event occurs when the marker is detected as being in the scene
    scene.addEventListener("markerFound", () => {
        markerFoundEventNumber += 1;

// If the scene is initially detected a series of opening animations are executed using setAttribute
        if ( markerFoundEventNumber === 1 ) {
            racket1Entity.setAttribute("animation", "property: position; to: -0.4 -0.8 -0.25; dur: 2000; easing: easeOutQuad;");
            racket2Entity.setAttribute("animation", "property: position; to: 0.4 0.8 -0.2; dur: 5000; easing: easeOutQuad;");
            balloonNetEntity.setAttribute("animation", "property: position; to: 0 0 0.55; dur: 7000; easing: easeOutElastic; elasticity: 200;");
            table.setAttribute("animation", "property: position; to: 0.22 0.07 0.44; dur: 7000; easing: easeOutQuad;");
            tableSides.forEach((side, index) => {
                const position = side.getAttribute("position");
                side.setAttribute("animation", `property: position; from: ${index + 1} ${index + 1} ${index + 1}; to: ${position.x} ${position.y} ${position.z}; dur: 7000; easing: easeOutQuad;`); 
            } )

// Every time the marker is found in the scene the far racket will rotate forward, starting a new inifite ghost ping pong game
            racket1Entity.setAttribute("animation__rotation", "property: rotation; to: 80 80 0; dur: 500; delay: 7000; easing: easeInQuad;");

// The various functions which contain the ping pong playing animation are executed below after opening animation
            firstServeBounce();
            netHop(firstServeBounce());
        }
    } )
}


// Variables for bounce on near side

// Determing the position for bounce on near side

// Setting the position for bounce on near side

// ******************************

// Variables for near side return position possibilities

// Near side return hit position value

// Set near side return hit position value

// ******************************

// Variables for far side bounce possibilities

// Far side bounce position value

// Set far side bounce positon value

// ******************************

// Variables for far side return hit possibilities

// Far side return hit position value

// Set far side return hit positon value


