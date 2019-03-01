import { isMobile } from '../support/utils'

export default {
  level: 6,
  timer: 0,
  error: '',
  isRunning: false,
  isLoading: false,
  isMobile: isMobile(),
  found: [],
  selecteds: [],
  pokemonRawList: []
}
