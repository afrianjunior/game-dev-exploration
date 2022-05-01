import Matter from "matter-js";
import { Graphics, Sprite }  from "pixi.js";
import { GameEngine } from './Stage'
import { CollisionConstant } from "../Constants/General.constant";

const Ground = (x: number, y: number, w: number, h: number, isStatic?: boolean, fill?: number) => (engine: GameEngine) => {
  const body = Matter.Bodies.rectangle(x, y, w, h, {
    isStatic,
    collisionFilter: {
      category: CollisionConstant.walls
    },
  })
  const position = body.position

  const mesh = new Graphics()
  
  mesh.beginFill(fill || 0xffffff)
    .drawRect(x, y, w, h)
    .endFill()

  const texture = engine.pixiEngine.renderer.generateTexture(mesh)
  const rect = new Sprite(texture)
  rect.anchor.set(0.5, 0.5)
  
  engine.pixiEngine.ticker.add(() => {
    rect.position.x = position.x
    rect.position.y = position.y
    rect.angle = body.angle
  })

  Matter.World.add(engine.world, [body])
  engine.pixiEngine.stage.addChild(rect)
  return engine
}

export default Ground