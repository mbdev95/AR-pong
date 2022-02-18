// Entity/primitive variables holding values of their DOM elements
const racket1 = document.querySelector("a-entity[gltf-model$='1']");
const racket2 = document.querySelector("a-entity[gltf-model$='2']");
const balloonNet = document.querySelector("a-entity[gltf-model^='#balloon']");
const table = document.getElementsByTagName('a-box')[0];
const tableSides = document.querySelectorAll("a-box a-box[depth='0.01']");
const ball = document.getElementsByTagName('a-sphere')[0];
const borders = { xLeft: -0.61, xRight: 0.61, yBack: -0.925, yFront: 0.925, zTop: -0.5, zBottom: -0.03 };

// Declaring timeout and interval variables in order to keep global scope for clearing the timeout and interval
let timeout;
let interval;

// Variables for the difference in x and y values from initial hit to first bounce and lastPosition after each animation
let differenceX;
let differenceY;
let lastPosition;

// Used for rounding the third decimal place
const round = (num) => {
    const x = Math.pow(10,3);
    return Math.round(num * x) / x;
}

// Animates the far racket to rotate forward to hit the ball before rotating back the far racket's original position
const farHit = (animationNumber) => {
    const originalRotationX = racket1.getAttribute("rotation").x;
    if (animationNumber !== 1) {
        // Move racket 1 and ball to same position based off of direction ball was heading in after leaving racket 2.
    }
    racket1.setAttribute("animation__rotationForward", "property: rotation; to: 80 80 0; dur: 500; easing: easeInQuad;");
    racket1.setAttribute("animation__rotationBackward", `property: rotation; to: ${originalRotationX} 80 0; dur: 500; delay: 1000; easing: easeOutQuad;`);
}

// Determines the exact position of the far bounce and animates the ball to move to the specified position
const farBounce = () => {
    const xBounce = round((Math.random() *  (borders.xLeft / 2)));
    const yBounce = round((Math.random() * (borders.yBack / 2)) - 0.2 );
    const ballPosition = ball.getAttribute("position");
    differenceX = round((ballPosition.x - xBounce) * -1);
    differenceY = round((ballPosition.y - yBounce) * -1);
    lastPosition = { x: xBounce, y: yBounce, z: borders.zBottom }; 
    ball.setAttribute("animation__nearBounce", `property: position; to: ${xBounce} ${yBounce} ${borders.zBottom}; dur: 250; easing: linear;`);
}

// Animates the ball to move directly above net
const netHop = () => {
    const xHop = (lastPosition.x + differenceX) / 2;
    const zHop = round((Math.random() * -0.075) + -0.185);
    ball.setAttribute("animation__hop", `property: position; from: ${lastPosition.x} ${lastPosition.y} ${lastPosition.z}; to: ${xHop} 0 ${zHop}; dur: 250; delay: 250; ease: easeInCirc;`);
    lastPosition = { x: xHop, y: 0, z: zHop };
}

// Animates ball to bounce on near side of the ping-pong table
const nearBounce = () => {
    const xBounce = (lastPosition.x + differenceX);
    const yBounce = (lastPosition.y + differenceY + (Math.random() * 0.3));
    ball.setAttribute("animation__farBounce", `property: position; from: ${lastPosition.x} ${lastPosition.y} ${lastPosition.z}; to: ${xBounce} ${yBounce} ${borders.zBottom}; dur: 500; delay: 500; ease: easeOutCirc;`);
    lastPosition = { x: xBounce, y: yBounce, z: borders.zBottom };
}

// Animates racket to hit ball on near side of the ping-pong table
const nearHit = () => {

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
            racket1.setAttribute("animation", "property: position; to: -0.4 -0.8 -0.25; dur: 2000; easing: easeOutQuad;");
            racket2.setAttribute("animation", "property: position; to: 0.4 0.8 -0.2; dur: 5000; easing: easeOutQuad;");
            balloonNet.setAttribute("animation", "property: position; to: 0 0 0.55; dur: 7000; easing: easeOutElastic; elasticity: 200;");
            table.setAttribute("animation", "property: position; to: 0.22 0.07 0.44; dur: 7000; easing: easeOutQuad;");
            tableSides.forEach((side, index) => {
                const position = side.getAttribute("position");
                side.setAttribute("animation", `property: position; from: ${index + 1} ${index + 1} ${index + 1}; to: ${position.x} ${position.y} ${position.z}; dur: 7000; easing: easeOutQuad;`); 
            } )

            let animationNumber = 0;

// The various functions which contain the ping pong playing animation are executed below after opening animation
// setTimeout is used to start ping pong animation after opening animation
// setInterval allows for the main ping pong animation to continue infinetly
            timeout = setTimeout(() => {
                    animationNumber += 1;
                    farHit(animationNumber);
                    farBounce();
                    netHop();
                    nearBounce();
                    nearHit();
            }, 7000)
        }
    } )
}

// When the page setTimeout() and setInterval() will be cleared to avoid memory leaks
window.addEventListener("unload", () => {
    clearTimeout(timeout);
    clearInterval(interval);
})



