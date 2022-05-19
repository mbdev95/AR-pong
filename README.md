# Augmented Reality Ping Pong Animation

   I have developed an augmented reality ping-pong animation.  The technologies I used include blender to craft 3D models, A-frame to create a 3D space, the JavaScript augmented reality library AR.js and vanilla JavaScript to animate the 3D models.
   
  ## AR.js Used to Trigger Animation
  I used AR.js to define a marker which when viewed by a camera will trigger the animation to appear on the screen of the device that has a camera viewing the marker.  For example, a real use case of this technology could be in an art gallery where at a specific painting you could have bar codes which when viewed in a phone camera would trigger a 3D animation which explains the history of the painting.  You should notice in the images the marker in the background which is necessary to trigger the animation.
  
  ### The Opening Animation Showing the Creation of the Ping-Pong Table
  ![creating-ping-pong-table](https://user-images.githubusercontent.com/77469447/168880728-e1500a19-0f3c-471e-8b50-da319eead0e4.png)
  <br>
  As a part of the opening animation sequence I show the table being created and the net landing on the table.
  
  ## A-frame Used in Place of HTML
  A-frame is an augmented or virtual reality framework built over top of HTML which defines a 3D space, and various default or custom 3D entities that will occupy the defined 3D space.  The entire animation lives within an a-scene component which defines the 3D space.  I used various default a-frame components, such as a sphere or box, to efficently create the ping-pong ball and table.  I defined custom imported 3D models crafted in Blender with the a-asset component. Once an imported 3D model is defined as an asset component it can be used within the a-scene component as a a-entity component.  Each a-frame component has attributes which can define basic styles and transformations.  For example, I used a position attribute to position the components relative to the parent a-frame component.  Some other a-frame attributes I used include width/height, colour, and the animation attribute.
  
  ### Ping-Pong Animation
  ![playing-pong](https://user-images.githubusercontent.com/77469447/168881056-2fd11d6b-48b8-4106-a2d3-1d081878dce6.png)
  The middle part of the animation shows two ghost ping-pong players playing.
  
   ## The Use of Blender to Create Custom 3D Entities
  The 3D models used in the animation I created using blender where I combined multiple pre-existing models together to create the various components of the animation. For example, the net and balloons were seperate 3D entities that I combined using blender.  I added additional colours to the raquets.  The ping-pong table and ball were made from default A-frame entites such as the box and sphere 3D entities.
  
  ### End of Ping-Pong Animation
  ![ending-animation](https://user-images.githubusercontent.com/77469447/168881474-b8eb9d9e-0c5d-419f-a6b9-cf4db905dfb0.png)
  <br>
  The end of the animation features the net rising and the table falling away.
  
  ## The Use of Vanilla JavaScript to animate the Ping-Pong game
  Lastly, I used vanilla JavaScript to animate the a-frame components.  I used timing functions to determine when a specific 3D model's animation would begin and end. Furthermore, I used setAttribute to define specific animations for the various a-frame components I wanted to animate.  I really enjoyed learning and implementing these new 3D technologies to create an augemented reality web application.  These technologies are fun to work with, and do not have a steep learning curve. I hope to explore more of the virtual 3D world in the future.  
