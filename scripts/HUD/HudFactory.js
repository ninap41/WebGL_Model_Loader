


const lightingHUD = window.HudGenerator("Lighting").generateHudComponent["Lighting"]()
lightingHUD.render()
lightingHUD.addEventListeners()

const objectHUD = window.HudGenerator("Objects").generateHudComponent["Objects"]()
objectHUD.render()
objectHUD.addEventListeners()