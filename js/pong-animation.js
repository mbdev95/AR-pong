// After page load the scene is defined and a series of animations will be executed when the marker is found.
window.onload = () => {
    const scene = document.querySelector('a-scene');
    let markerFoundEventNumber = 0;

// The markerFound event occurs when the marker is detected as being in the scene.
    scene.addEventListener("markerFound", () => {

        markerFoundEventNumber += 1;
        const racket1Entity = document.querySelector("a-entity[gltf-model$='1']");
        const racket2Entity = document.querySelector("a-entity[gltf-model$='2']");
        const balloonNetEntity = document.querySelector("a-entity[gltf-model^='#balloon']");
        const table = document.getElementsByTagName('a-box')[0];
        const tableSides = document.querySelectorAll("a-box a-box[depth='0.01']");
        const ball = document.getElementsByTagName('a-sphere')[0];
    
// If the scene is initially detected a series of opening animations are executed using setAttribute.
        if ( markerFoundEventNumber === 1 ) {
            racket1Entity.setAttribute("animation", "property: position; to: -0.4 -0.8 -0.25; dur: 4000; easing: easeOutQuad;");
            racket2Entity.setAttribute("animation", "property: position; to: 0.4 0.8 -0.2; dur: 5000; easing: easeOutQuad;");
            balloonNetEntity.setAttribute("animation", "property: position; to: 0 0 0.55; dur: 7000; easing: easeOutElastic; elasticity: 200;");
            table.setAttribute("animation", "property: position; to: 0.22 0.07 0.44; dur: 7000; easing: easeOutQuad;");
            tableSides.forEach((side, index) => {
                const position = side.getAttribute("position");
                side.setAttribute("animation", `property: position; from: ${index + 1} ${index + 1} ${index + 1}; to: ${position.x} ${position.y} ${position.z}; dur: 7000; easing: easeOutQuad;`); 
            } );
        }

// Every time the marker is found in the scene the far racket will rotate forward, starting a new inifite ghost ping pong game.
        racket1Entity.setAttribute("animation__rotation", "property: rotation; to: 80 80 0; dur: 500; delay: 7000; easing: easeInQuad;");

// Variables for table borders.
        const borders = { xLeft: -0.61, xRight: 0.61, yFront: 0.925, yBack: -0.925, zBottom: 0.01, zTop: -0.75 };

// Variables for racket 1 first serve position possibilites.

// Racket 1 First Serve Bounce Position Value.

// Setting the Racket 1 first serve bounce position value.

    } );
}

// Variables for hop

// Determining hop position value

// Setting the hop positing value

// ******************************

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


