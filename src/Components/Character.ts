import Matter from "matter-js";
import { Graphics, Sprite, Texture }  from "pixi.js";
import { GameEngine } from './Stage'

const Box = (x: number, y: number, w: number, h: number, isStatic?: boolean, speed: number = 0.3) => (engine: GameEngine) => {
  const body = Matter.Bodies.rectangle(x, y, w, h, {
    isStatic,
  })

  const position = body.position
  const textureLeft = Texture.from('/char_left.png')
  const textureRight = Texture.from('/char_right.png')
  const character = Sprite.from(textureRight)
  character.anchor.set(0.5)

  addEventListener('keydown', ({ key }) => {
    if (key === 'd') {
      character.texture = textureRight
      position.x = position.x + speed
    }

    if (key === 'a') {
      character.texture = textureLeft
      position.x = position.x - speed
    }

    if (key === 'w') {
      position.y = position.y - 20
    }
  })
  
  engine.pixiEngine.ticker.add(() => {
    character.position.x = position.x
    character.position.y = position.y
    character.rotation = body.angle
  })

  Matter.World.add(engine.world, [body])
  engine.pixiEngine.stage.addChild(character)
  return engine
}

export default Box