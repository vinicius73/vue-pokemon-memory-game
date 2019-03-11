import { shallowMount } from '@vue/test-utils'
import Pokeball from '@/components/Pokeball.vue'

describe('Pokeball.vue', () => {
  it('renders component', () => {
    const wrapper = shallowMount(Pokeball)
    expect(wrapper.classes('pokeball__parent')).toBe(true)
  })
})
