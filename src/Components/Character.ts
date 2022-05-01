import Matter from "matter-js";
import { Sprite, Loader, Container, Texture }  from "pixi.js";
import { GameEngine } from './Stage'
import Bullet from "./Bullet"
import { CollisionConstant } from '../Constants/General.constant'

const Box = (x: number, y: number, w: number, h: number, isStatic?: boolean, speed: number = 0.3) => (engine: GameEngine) => {
  const keyPresses: {[key: string]: boolean} = {}
  const bullets: any[] = []
  const body = Matter.Bodies.rectangle(x, y, w, h, {
    isStatic,
    collisionFilter: {
      mask: CollisionConstant.walls
    },
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

  let character: Sprite | null = null
  let aimMeasur: Sprite | null = null
  let aimRow: Sprite | null = null

  loader.add('left', '/booble_left.png')
  loader.add('right', '/booble_right.png')
  loader.add('aim_measur', '/aim_measur.png')
  loader.add('aim_row', '/aim_row.png')
  loader.load((_, resources: any) => {
    character = new Sprite(resources.right.texture)
    character.anchor.set(0.5, 0.5)
    
    aimMeasur = new Sprite(resources.aim_measur.texture)
    aimRow = new Sprite(resources.aim_row.texture)
    AimContainer.addChild(aimMeasur)
    AimContainer.addChild(aimRow)

    aimMeasur.anchor.set(0.5, 0.3)
    AimContainer.position.set(70, -70)
    
    aimRow.anchor.set(0, 0.5)
    aimRow.position.set(0, 20)
    // aimRow.angle = 55
    
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
      AimContainer.position.x = 70
    }

    if (keyPresses['a']) {
      Matter.Body.setPosition(body, {
        x: position.x - speed,
        y: position.y
      })
      AimContainer.scale.x = -1
      AimContainer.position.x = -70
    }

    if (keyPresses['w']) {
      if (aimRow) {
        aimRow.rotation -= 0.01
      }
    }
    
    if (keyPresses['s']) {
      if (aimRow) {
        aimRow.rotation += 0.01
      }
    }

    if (character) {
      CharacterContainer.position.x = position.x
      CharacterContainer.position.y = position.y
      CharacterContainer.rotation = body.angle
    }
  })


  addEventListener('keydown', ({ key, preventDefault }) => {
    keyPresses[key] = true
    
    if (key === 'd') {
      if (character) {
        character.texture = loader.resources.right.texture as Texture
      }
    }
    
    if (key === 'a') {
      if (character) {
        character.texture = loader.resources.left.texture as Texture
      }
    }
    if (preventDefault) {
      preventDefault()
    }
  })

  addEventListener('keyup', ({ key }) => {
    if (key === ' ') {
      const bullet = Bullet(CharacterContainer.x + 70, CharacterContainer.y - 50, 5, false)(engine)
      const angle = (aimRow.angle * -1) * (Math.PI) / 180
      const v = 30
      const vx = v * (Math.cos(angle));
			const vy = -v * (Math.sin(angle))
      bullet.shot(vx, vy)
      bullets.push(bullet)
    }
    delete keyPresses[key]
  })


  Matter.World.add(engine.world, [body])
  return engine
}

export default Box