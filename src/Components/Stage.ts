import * as PIXI from "pixi.js";
import * as Matter from 'matter-js';

export interface GameEngine {
  pixiEngine: PIXI.Application
  physicsEngine: Matter.Engine
  world: Matter.World
  physicsRender: Matter.Render
}

export const Stage = () => {
  window.PIXI = PIXI
  const sceneContainer: HTMLCanvasElement = document.querySelector("#app") as HTMLCanvasElement
  const canvasWidth = sceneContainer.offsetWidth;
  const canvasHeight = sceneContainer.offsetHeight;

  const physicsEngine = Matter.Engine.create()
  
  const pixiEngine = new PIXI.Application({
    backgroundAlpha: 0,
    width: canvasWidth,
    height: canvasHeight,
    antialias: true,
  })

  const physicsRender = Matter.Render.create({
    element: pixiEngine.view,
    engine: physicsEngine,
    options: {
      width: canvasWidth,
      height: canvasHeight,
      background: 'transparent',
      showAngleIndicator: false
    }
  })
 
  const world = physicsEngine.world

  sceneContainer.appendChild(pixiEngine.view)

  const gameEngine: GameEngine = {
    pixiEngine,
    physicsEngine,
    world,
    physicsRender
  }
  return gameEngine
}

export const Start = () => (gameEngine: GameEngine) => {
  // Matter.Render.lookAt(gameEngine.physicsRender, {
  //     min: { x: 0, y: 0 },
  //     max: { x: 800, y: 600 }
  // })
  gameEngine.physicsEngine.gravity.y = 3
  Matter.Render.run(gameEngine.physicsRender)
  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, gameEngine.physicsEngine)
  gameEngine.pixiEngine.ticker.start()
}
