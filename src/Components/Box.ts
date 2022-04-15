import Matter from "matter-js";
import { Graphics }  from "pixi.js";
import { GameEngine } from './Stage'

const Box = (x: number, y: number, w: number, h: number, isStatic?: boolean, fill?: number) => (engine: GameEngine) => {
  const body = Matter.Bodies.rectangle(x, y, w, h, {
    isStatic,
    restitution: 0.4
  })
  const position = body.position
  const mesh = new Graphics()
  
  mesh.beginFill(fill || 0xffffff)
    .drawRect(0, 0, w, h)
    .endFill()

  engine.pixiEngine.ticker.add(() => {
    mesh.position.x = position.x
    mesh.position.y = position.y
    mesh.rotation = body.angle
  })

  Matter.World.add(engine.world, [body])
  engine.pixiEngine.stage.addChild(mesh)
  return engine
}

export default Box