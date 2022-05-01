import './style.css'
import { pipe } from 'fp-ts/lib/function'
import { Stage, Start } from './Components/Stage'
import Character from './Components/Character'
import Box from './Components/Box'
import Ground from './Components/Ground'
const sceneContainer: HTMLCanvasElement = document.querySelector("#app") as HTMLCanvasElement
pipe(
  Stage(),
  Character(137, 186, 150, 133, false, 2.3),
  Ground(sceneContainer.offsetWidth / 2, sceneContainer.offsetHeight, sceneContainer.offsetWidth, 80, true, 0xA97155),
  Start()
)
