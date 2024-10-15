# Model Loader

locally run with live-server, will automatically reference index.html

```
npm install live server -g

live-server
```

[Live Server Documentation](https://www.npmjs.com/package/live-server)



## controls

* mouse click to toggle orbital controls
* use WASD

![Screenshot of the application2](https://raw.githubusercontent.com/ninap41/WebGL_Model_Loader/refs/heads/main/assets/screenshot2.png)
![Screenshot of the application](https://raw.githubusercontent.com/ninap41/WebGL_Model_Loader/refs/heads/main/assets/screenshot1.png)

## to do

* plane hud, treat them different then obj loaded objects.
* Look into adding bootstrap or abstracting out templating engine like code to another file
* collision detection for recusively detecting impassible planes
* orbital control toggle for devConfig
* add All Objects, Lighting,  Hud
* add spectral lighting support
* object animation mutations
* hook up to a quick serverless option like Deno for saving "scenes" or at the very LEAST download a JSON blob of lighting/objects/