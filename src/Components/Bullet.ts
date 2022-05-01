import Matter from "matter-js";
import { Graphics, Sprite }  from "pixi.js";
import { GameEngine } from './Stage'
import { CollisionConstant } from "../Constants/General.constant";

const Bullet = (x: number, y: number, w: number, isStatic?: boolean, fill?: number) => (engine: GameEngine) => {
  const body = Matter.Bodies.circle(x, y, w, {
    isStatic,
    collisionFilter: {
      category: CollisionConstant.bullet
    },
    friction: Infinity,
    frictionAir: 0,
    restitution: 0.3,
    render: {
      fillStyle: 'red'
    }
  })
  const position = body.position
  const mesh = new Graphics()
  
  mesh.beginFill(fill || 0x000000)
    .drawCircle(x, y, w)
    .endFill()
  
  const texture = engine.pixiEngine.renderer.generateTexture(mesh)
  const circle = new Sprite(texture)
  circle.anchor.set(0.5, 0.5)

  engine.pixiEngine.ticker.add(() => {
    circle.position.x = position.x
    circle.position.y = position.y
    circle.angle = body.angle
  })

  Matter.World.add(engine.world, [body])
  engine.pixiEngine.stage.addChild(circle)

  
  const shot = (xVel: number, yVel: number) => {
    Matter.Body.setVelocity(body, { x: xVel, y: yVel })
  }

  return {
    body,
    shot
  }
}

export default Bullet