// After page load the scene is defined and a series of animtions will be executed when the marker is found.
window.onload = () => {
    const scene = document.querySelector('a-scene');
    let markerFoundEventNumber = 0;

// The markerFound event occurs when the marker is detected as being in the scene.
    scene.addEventListener("markerFound", () => {

        markerFoundEventNumber += 1;
        const racket1Entity = document.querySelector("a-entity[gltf-model$='1']");
        const racket2Entity = document.querySelector("a-entity[gltf-model$='2']");
        const balloonNetEntity = document.querySelector("a-entity[gltf-model^='#balloon']");
        const box = document.getElementsByTagName('a-box')[0];
        const tableSides = document.querySelectorAll("a-box a-box[depth='0.01']");
    
// If the scene is initially detected a series of opening animations are exectued using setAttribute.
        if ( markerFoundEventNumber === 1 ) {
            racket1Entity.setAttribute("animation", "property: position; to: -0.125 -0.6 0.2; dur: 5000; easing: easeOutQuad;");
            racket2Entity.setAttribute("animation", "property: position; to: 0.55 0.6 0.3; dur: 5000; easing: easeOutQuad;");
            balloonNetEntity.setAttribute("animation", "property: position; to: 0 0 0.55; dur: 7000; easing: easeOutElastic; elasticity: 200;");
            box.setAttribute("animation", "property: position; to: 0.22 0.07 0.44; dur: 7000; easing: easeOutQuad;");
            tableSides.forEach((side, index) => {
                const position = side.getAttribute("position");
                side.setAttribute("animation", `property: position; from: ${index + 1} ${index + 1} ${index + 1}; to: ${position.x} ${position.y} ${position.z}; dur: 7000; easing: easeOutQuad;`); 
            } );
        }

// Every time the marker is found in the scene the far racket will rotate forward, starting a new inifite ghost ping pong game.
        racket1Entity.setAttribute("animation__rotation", "property: rotation; to: 80 80 0; dur: 500; delay: 7000; easing: easeInQuad;");

    } );
}