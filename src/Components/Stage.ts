import * as PIXI from "pixi.js";
import * as Matter from 'matter-js';

export interface GameEngine {
  pixiEngine: PIXI.Application
  physicsEngine: Matter.Engine
  world: Matter.World
}

export const Stage = () => {
  window.PIXI = PIXI
  const physicsEngine = Matter.Engine.create()
 
  const world = physicsEngine.world
  
  const pixiEngine = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    antialias: true,
  })
  
  document.body.appendChild(pixiEngine.view)
  const gameEngine: GameEngine = {
    pixiEngine,
    physicsEngine,
    world
  }
  return gameEngine
}

export const Start = () => (gameEngine: GameEngine) => {
  gameEngine.pixiEngine.ticker.start()
  Matter.Runner.run(gameEngine.physicsEngine)
}
