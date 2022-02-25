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

// Variables for the difference in x and y values from initial hit to first bounce and lastPosition after each animation
let differenceX;
let differenceY;
let lastBallPosition;
let lastRacket2Position;

// Used for rounding the third decimal place
const round = (num) => {
    const x = Math.pow(10,3);
    return Math.round(num * x) / x;
}

// Animates the far racket to rotate forward to hit the ball before rotating back the far racket's original position
const farHit = () => {
    const originalRotationX = racket1.getAttribute("rotation").x;
    racket1.setAttribute("animation__racket1__rotationForward", "property: rotation; to: 80 80 0; dur: 200; easing: linear;");
    racket1.setAttribute("animation__racket1__rotationBackward", `property: rotation; to: ${originalRotationX} 80 0; dur: 500; delay: 1000; easing: easeOutQuad;`);
}

// Determines the exact position of the far bounce and animates the ball to move to the specified position
const farBounce = () => {
    const xBounce = round((Math.random() *  (borders.xLeft / 2)));
    const yBounce = round((Math.random() * (borders.yBack / 2)) - 0.2 );
    const ballPosition = ball.getAttribute("position");
    differenceX = round((ballPosition.x - xBounce) * -1);
    differenceY = round((ballPosition.y - yBounce) * -1);
    ball.setAttribute("animation__nearBounce__forwards", `property: position; to: ${xBounce} ${yBounce} ${borders.zBottom}; dur: 350; easing: linear;`);
    lastBallPosition = { x: xBounce, y: yBounce, z: borders.zBottom }; 
}

// Animates the ball to move directly above net
const netHop = () => {
    const xHop = round(((lastBallPosition.x + differenceX) / 2));
    const zHop = round((Math.random() * -0.075) + -0.185);
    ball.setAttribute("animation__hopForward", `property: position; from: ${lastBallPosition.x} ${lastBallPosition.y} ${lastBallPosition.z}; to: ${xHop} 0 ${zHop}; dur: 350; delay: 350; easing: easeInCirc;`);
    lastBallPosition = { x: xHop, y: 0, z: zHop };
}

// Animates ball to bounce on near side of the ping-pong table
const nearBounce = () => {
    const xBounce = round(lastBallPosition.x + differenceX / 1.25);
    const yBounce = round(lastBallPosition.y + differenceY + (Math.random() * 0.3));
    ball.setAttribute("animation__nearBackwardBounce", `property: position; from: ${lastBallPosition.x} ${lastBallPosition.y} ${lastBallPosition.z}; to: ${xBounce} ${yBounce} ${borders.zBottom}; dur: 350; delay: 700; easing: easeOutCirc;`);
    lastBallPosition = { x: xBounce, y: yBounce, z: borders.zBottom };
}

// Animates racket to hit ball on near side of the ping-pong table
const nearHit = () => {
    const firstRacket2Position = racket2.getAttribute("position");
    const originalRotationX = racket2.getAttribute("rotation").x;
    const hitPositionX = round(lastBallPosition.x + differenceX);
    const hitPositionY = round(lastBallPosition.y + differenceY + (Math.random() * 0.3));
    const hitPositionZ = round((Math.random() * -0.1) + -0.185);
    ball.setAttribute("animation__nearHit__ballPosition", `property: position; from: ${lastBallPosition.x} ${lastBallPosition.y} ${lastBallPosition.z}; to: ${hitPositionX - 0.1} ${hitPositionY + 0.015} ${hitPositionZ}; dur: 350; delay: 1050; easing: linear;`);
    racket2.setAttribute("animation__nearHit__racket2Position", `property: position; from: ${firstRacket2Position.x} ${firstRacket2Position.y} ${firstRacket2Position.z}; to: ${hitPositionX} ${hitPositionY} ${hitPositionZ}; dur: 350; delay: 1050; easing: easeOutQuad;`);
    racket2.setAttribute("animation__racket2__rotateForward", "property: rotation; to: 330 260 0; dur: 175; delay: 1400; easing: easeInQuad;");
    racket2.setAttribute("animation__racket2__rotateBackward", `property: rotation; to: ${originalRotationX} 260 0; dur: 400; delay: 2000; easing: easeOutQuad;`);
    ball.setAttribute("animation__nearHit__ballOvershoot", `property: position; from: ${hitPositionX - 0.1} ${hitPositionY + 0.015} ${hitPositionZ}; to: -0.5 -100 ${hitPositionZ}; dur: 3000; delay: 1400; easing: easeInCirc;`)
    lastRacket2Position = { x: hitPositionX, y: hitPositionY, z: hitPositionZ };
}

// The closing animation sequence where the hot air balloon drifts upwards, table sides go outwards, table moves forward past viewer, and rackets drop down
const closingAnimation = () => {
    const racket1Position = racket1.getAttribute("position");
    racket1.setAttribute("animation__racket1__fall", `property: position; to: ${racket1Position.x} ${racket1Position.y} 10; dur: 5000; delay: 2400; easing: linear;`);
    racket2.setAttribute("animation__racket2__fall", `property: position; to: ${lastRacket2Position.x} ${lastRacket2Position.y} 10; dur: 5000; delay: 2400; easing: linear;`);
    balloonNet.setAttribute("animation__balloon__rising", "property: position; to: 0 0 -10; dur: 8000; delay: 3000; easing: easeInQuad;");
    table.setAttribute("animation__table__forwardPositon", "property: position; to: 0.22 0.07 10; dur: 1500; delay: 4000; easing: easeOutQuad;")
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
            racket1.setAttribute("animation", "property: position; to: -0.4 -1 -0.25; dur: 2000; easing: easeOutQuad;");
            racket2.setAttribute("animation", "property: position; to: 0.4 1 -0.2; dur: 5000; easing: easeOutQuad;");
            balloonNet.setAttribute("animation", "property: position; to: 0 0 0.55; dur: 7000; easing: easeOutElastic; elasticity: 200;");
            table.setAttribute("animation", "property: position; to: 0.22 0.07 0.44; dur: 7000; easing: easeOutQuad;");
            tableSides.forEach((side, index) => {
                const position = side.getAttribute("position");
                side.setAttribute("animation", `property: position; from: ${index + 1} ${index + 1} ${index + 1}; to: ${position.x} ${position.y} ${position.z}; dur: 7000; easing: easeOutQuad;`); 
            } )
// The various functions which contain the ping pong playing animation are executed below after opening animation
// setTimeout is used to start ping pong animation after opening animation
// setInterval allows for the main ping pong animation to continue infinetly
            timeout = setTimeout(() => {
                    farHit();
                    farBounce();
                    netHop();
                    nearBounce();
                    nearHit();
                    closingAnimation();
            }, 7000)
        }
    } )
}

// When the page setTimeout() and setInterval() will be cleared to avoid memory leaks
window.addEventListener("unload", () => {
    clearTimeout(timeout);
})



