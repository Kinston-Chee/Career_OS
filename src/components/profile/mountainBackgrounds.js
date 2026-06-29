import mountain1 from '../../assets/Paper mountain 1.png'
import mountain2 from '../../assets/Paper mountain 2.png'
import mountain3 from '../../assets/Paper mountain 3.png'
import mountain4 from '../../assets/Paper mountain 4.png'
import mountain5 from '../../assets/Paper mountain 5.png'

const MOUNTAIN_BACKGROUNDS = [mountain1, mountain2, mountain3, mountain4, mountain5]

export function getRandomMountainBg() {
  return MOUNTAIN_BACKGROUNDS[Math.floor(Math.random() * MOUNTAIN_BACKGROUNDS.length)]
}
