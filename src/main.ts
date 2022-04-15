import './style.css'
import { pipe } from 'fp-ts/lib/function'
import { Stage, Start } from './Components/Stage'
import Character from './Components/Character'
import Box from './Components/Box'
import Ground from './Components/Ground'

pipe(
  Stage(),
  Box(800, 100, 100, 100, false, 0x8FBDD3),
  Box(800, 300, 100, 100, false, 0x8FBDD3),
  Box(800, 500, 100, 100, false, 0x8FBDD3),
  Character(137, 186, 136, 130, false, 1.3),
  Ground(0, window.innerHeight - 60, window.innerWidth * 2, 60, true, 0xA97155),
  Start()
)

