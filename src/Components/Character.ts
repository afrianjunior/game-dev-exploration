import { boolean } from "fp-ts";
import Matter from "matter-js";
import { Graphics, Sprite, TilingSprite, Loader, Container }  from "pixi.js";
import { GameEngine } from './Stage'

const Box = (x: number, y: number, w: number, h: number, isStatic?: boolean, speed: number = 0.3) => (engine: GameEngine) => {
  const keyPresses: {[key: string]: boolean} = {}
  const body = Matter.Bodies.rectangle(x, y, w, h, {
    isStatic,
    render: {
      fillStyle: 'red',
      strokeStyle: 'blue',
      lineWidth: 3
    },
    density: 0.04,
    friction: 0.01,
    frictionAir: 0.00001,
    restitution: 0.8,
  })

  const CharacterContainer = new Container()
  const AimContainer = new Container()
  
  const position = body.position
  const loader = new Loader()
  CharacterContainer.position.set(position.x, position.y)
  CharacterContainer.rotation = body.angle

  let character: any = null
  let aimMeasur: any = null
  let aimRow: any = null

  loader.add('left', '/booble_left.png')
  loader.add('right', '/booble_right.png')
  loader.add('aim_measur', '/aim_measur.png')
  loader.add('aim_row', '/aim_row.png')
  loader.load((_, resources: any) => {
    character = new Sprite(resources.right.texture)
    character.anchor.set(0.3, 0.27)
    
    aimMeasur = new Sprite(resources.aim_measur.texture)
    aimRow = new Sprite(resources.aim_row.texture)
    AimContainer.addChild(aimMeasur)
    AimContainer.addChild(aimRow)

    aimMeasur.anchor.set(0.5, 0.3)
    AimContainer.position.set(100, -37)
    
    aimRow.anchor.set(0.5, 0.95)
    aimRow.position.set(0, 22)
    aimRow.angle = 55
    
    CharacterContainer.addChild(character)
    CharacterContainer.addChild(AimContainer)
  })

  engine.pixiEngine.stage.addChild(CharacterContainer)

  engine.pixiEngine.ticker.add(() => {
    if (keyPresses['d']) {
      Matter.Body.setPosition(body, {
        x: position.x + speed,
        y: position.y
      })
      AimContainer.scale.x = 1
      AimContainer.position.x = 100
    }

    if (keyPresses['a']) {
      Matter.Body.setPosition(body, {
        x: position.x - speed,
        y: position.y
      })
      AimContainer.scale.x = -1
      AimContainer.position.x = -40
    }

    if (keyPresses['w']) {
      if (aimRow.angle > 24) {
        aimRow.rotation -= 0.01
      }
    }

    if (keyPresses['s']) {
      if (aimRow.angle < 104) {
        aimRow.rotation += 0.01
      }
    }

    if (character) {
      CharacterContainer.position.x = position.x
      CharacterContainer.position.y = position.y
      CharacterContainer.rotation = body.angle
    }
  })


  addEventListener('keydown', ({ key }) => {
    keyPresses[key] = true

    if (key === 'd') {
      character.texture = loader.resources.right.texture
    }

    if (key === 'a') {
      character.texture = loader.resources.left.texture
    }
  })

  addEventListener('keyup', ({ key }) => {
    delete keyPresses[key]
  })


  Matter.Composite.add(engine.world, [body])
  return engine
}

export default Box