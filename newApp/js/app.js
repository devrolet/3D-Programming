/// <reference path="babylon.2.1.d.ts" />

var BjsApp = BjsApp || {};

BjsApp.init = function () {
  //get the canvas
  var canvas = document.getElementById('renderCanvas');

  //create a BabylonJS engine object
  var engine = new BABYLON.Engine(canvas, true);

  //create scene
  var scene = new BABYLON.Scene(engine);

  // create a camera
  var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15,BABYLON.Vector3.Zero(), scene);

  camera.upperRadiusLimit = 50;

  // let user move camera
  camera.attachControl(canvas);

  //light
  var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.5;
  light.groundColor = new BABYLON.Color3(0, 0, 1);

  //Set BG color
  scene.clearColor = new BABYLON.Color3(0, 0, 0);

  // sun
  var sun = new BABYLON.Mesh.CreateSphere('sun', 16, 4, scene);
  var sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
  sunMaterial.emissiveTexture = new BABYLON.Texture('assets/img/sun2.jpg', scene);
  sunMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  sunMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  sun.material = sunMaterial;

  var sunLight = new BABYLON.PointLight('sunLight', BABYLON.Vector3.Zero(), scene);
  sunLight.intensity = 2;

  //planets
  var planetMaterial = new BABYLON.StandardMaterial('planetMat', scene);
  planetMaterial.diffuseTexture = new BABYLON.Texture('assets/img/fire.jpg', scene);
  planetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  var planetMaterial2 = new BABYLON.StandardMaterial('planetMat2', scene);
  planetMaterial2.diffuseTexture = new BABYLON.Texture('assets/img/barren.jpg', scene);
  planetMaterial2.specularColor = new BABYLON.Color3(0, 0, 0);

  var planetMaterial3 = new BABYLON.StandardMaterial('planetMat3', scene);
  planetMaterial3.diffuseTexture = new BABYLON.Texture('assets/img/waterland.jpg', scene);
  planetMaterial3.specularColor = new BABYLON.Color3(0, 0, 0);

  var planetMaterial4 = new BABYLON.StandardMaterial('planetMat4', scene);
  planetMaterial4.diffuseTexture = new BABYLON.Texture('assets/img/fireice.jpg', scene);
  planetMaterial4.specularColor = new BABYLON.Color3(0, 0, 0);

  var planetMaterial5 = new BABYLON.StandardMaterial('planetMat5', scene);
  planetMaterial5.diffuseTexture = new BABYLON.Texture('assets/img/gold.jpg', scene);
  planetMaterial5.specularColor = new BABYLON.Color3(0, 0, 0);

  var planetMaterial6 = new BABYLON.StandardMaterial('planetMat6', scene);
  planetMaterial6.diffuseTexture = new BABYLON.Texture('assets/img/sand.jpg', scene);
  planetMaterial6.specularColor = new BABYLON.Color3(0, 0, 0);

  var planetMaterial7 = new BABYLON.StandardMaterial('planetMat7', scene);
  planetMaterial7.diffuseTexture = new BABYLON.Texture('assets/img/ice.jpg', scene);
  planetMaterial7.specularColor = new BABYLON.Color3(0, 0, 0);

  var planet1 = new BABYLON.Mesh.CreateSphere('planet1', 16, 0.5, scene);
  planet1.position.x = 4;
  planet1.material = planetMaterial;
  planet1.orbit = {
    radius: planet1.position.x,
    speed: 0.07,
    angle: 0.5
  };

  var planet2 = new BABYLON.Mesh.CreateSphere('planet2', 16, 0.8, scene);
  planet2.position.x = 6;
  planet2.material = planetMaterial2;
  planet2.orbit = {
    radius: planet2.position.x,
    speed: 0.05,
    angle: 0
  };

  var planet3 = new BABYLON.Mesh.CreateSphere('planet3', 16, 1.2, scene);
  planet3.position.x = 8;
  planet3.material = planetMaterial3;
  planet3.orbit = {
    radius: planet3.position.x,
    speed: 0.03,
    angle: 0.3
  };

  var planet4 = new BABYLON.Mesh.CreateSphere('planet4', 16, 1, scene);
  planet4.position.x = 11;
  planet4.material = planetMaterial4;
  planet4.orbit = {
    radius: planet4.position.x,
    speed: 0.042,
    angle: 0.7
  };

  var planet5 = new BABYLON.Mesh.CreateSphere('planet5', 16, 2.0, scene);
  planet5.position.x = 14;
  planet5.material = planetMaterial5;
  planet5.orbit = {
    radius: planet5.position.x,
    speed: 0.02,
    angle: 1
  };

  var planet6 = new BABYLON.Mesh.CreateSphere('planet6', 16, 1.5, scene);
  planet6.position.x = 18;
  planet6.material = planetMaterial6;
  planet6.orbit = {
    radius: planet6.position.x,
    speed: 0.013,
    angle: 0.6
  };

  var planet7 = new BABYLON.Mesh.CreateSphere('planet7', 16, 0.3, scene);
  planet7.position.x = 22;
  planet7.material = planetMaterial7;
  planet7.orbit = {
    radius: planet7.position.x,
    speed: 0.015,
    angle: 0.3
  };

  var skybox = BABYLON.Mesh.CreateBox('skybox', 1000, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat', scene);

  //dont render what we cant see
  skyboxMaterial.backFaceCulling = false;

  // move with camera
  skybox.infiniteDistance = true;

  skybox.material = skyboxMaterial;

  //remove reflections from skybox
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  //texture of 6 sides of the cube
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('assets/img/skybox', scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;


  // allows animate / move things
  scene.beforeRender = function() {
    planet1.position.x = planet1.orbit.radius * Math.sin(planet1.orbit.angle);
    planet1.position.z = planet1.orbit.radius * Math.cos(planet1.orbit.angle);
    planet1.orbit.angle += planet1.orbit.speed;

    planet2.position.x = planet2.orbit.radius * Math.sin(planet2.orbit.angle);
    planet2.position.z = planet2.orbit.radius * Math.cos(planet2.orbit.angle);
    planet2.orbit.angle += planet2.orbit.speed;

    planet3.position.x = planet3.orbit.radius * Math.sin(planet3.orbit.angle);
    planet3.position.z = planet3.orbit.radius * Math.cos(planet3.orbit.angle);
    planet3.orbit.angle += planet3.orbit.speed;

    planet4.position.x = planet4.orbit.radius * Math.sin(planet4.orbit.angle);
    planet4.position.z = planet4.orbit.radius * Math.cos(planet4.orbit.angle);
    planet4.orbit.angle += planet4.orbit.speed;

    planet5.position.x = planet5.orbit.radius * Math.sin(planet5.orbit.angle);
    planet5.position.z = planet5.orbit.radius * Math.cos(planet5.orbit.angle);
    planet5.orbit.angle += planet5.orbit.speed;

    planet6.position.x = planet6.orbit.radius * Math.sin(planet6.orbit.angle);
    planet6.position.z = planet6.orbit.radius * Math.cos(planet6.orbit.angle);
    planet6.orbit.angle += planet6.orbit.speed;

    planet7.position.x = planet7.orbit.radius * Math.sin(planet7.orbit.angle);
    planet7.position.z = planet7.orbit.radius * Math.cos(planet7.orbit.angle);
    planet7.orbit.angle += planet7.orbit.speed;
  };
  //run engine, render scene
  engine.runRenderLoop(function(){
    scene.render();
  });

  // listen for resize event
  window.addEventListener('resize', function(){
    engine.resize();
  });
};
