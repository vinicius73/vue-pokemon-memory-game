import { isMobile } from '../support/utils'

export default {
  level: 6,
  score: 0,
  failures: 0,
  error: '',
  isRunning: false,
  isEasyMode: false,
  isLoading: false,
  isMobile: isMobile(),
  found: [],
  selecteds: [],
  pokemonRawList: []
}
