import Timer from '@/components/Timer.vue'
import { shallowMount } from '@vue/test-utils'
import { factoryVue } from '../helpers'
import Vuex from 'vuex'

const localVue = factoryVue()

jest.useFakeTimers()

describe('Timer.vue', () => {
  let hidden = false

  Object.defineProperty(document, 'hidden', {
    configurable: true,
    get () { return hidden },
    set (bool) { hidden = Boolean(bool) }
  })

  let actions
  let mutations
  let getters
  let state
  let store

  beforeEach(() => {
    actions = {
      loadPokemon: jest.fn()
    }
    mutations = {
      'set/timer': jest.fn((state, val) => {
        state.timer = val
      })
    }
    getters = {
      timerStatus: () => true
    }
    state = {
      timer: 0,
      isRunning: true,
      score: 99,
      isMobile: false
    }
    store = new Vuex.Store({
      actions,
      state,
      getters,
      mutations
    })
  })

  it('call "setTimer"', () => {
    shallowMount(Timer, { store, localVue })

    jest.advanceTimersByTime(2000)

    expect(mutations['set/timer']).toHaveBeenCalledTimes(3)
    expect(state.timer).toBe(2)
  })

  it('stop on visibilitychange', () => {
    shallowMount(Timer, { store, localVue })

    expect(state.timer).toBe(0)

    jest.advanceTimersByTime(3000)

    hidden = true
    document.dispatchEvent(new Event('visibilitychange'))

    jest.advanceTimersByTime(5000)

    expect(mutations['set/timer']).toHaveBeenCalledTimes(4)
    expect(state.timer).toBe(3)

    hidden = false
    document.dispatchEvent(new Event('visibilitychange'))

    jest.advanceTimersByTime(5000)

    expect(mutations['set/timer']).toHaveBeenCalledTimes(9)
    expect(state.timer).toBe(8)
  })

  it('call "loadPokemon"', () => {
    const wrapper = shallowMount(Timer, { store, localVue })

    const btn = wrapper.find('a.--btn-reload')

    btn.trigger('click')

    expect(actions.loadPokemon).toHaveBeenCalledTimes(1)
  })

  it('mobile version', () => {
    state.isMobile = true
    const wrapper = shallowMount(Timer, { store, localVue })

    ;(['a.--btn-reload', '.--icon-clock', '.--icon-counter'])
      .forEach(selector => {
        expect(wrapper.find(selector).exists()).toBe(false)
      })
  })
})
