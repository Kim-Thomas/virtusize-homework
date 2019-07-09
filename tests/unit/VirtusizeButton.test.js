import { shallowMount } from '@vue/test-utils'
import VirtusizeButton from '@/components/micro/VirtusizeButton.vue'

window.$ = window.jQuery = require('jquery');


describe('VirtusizeButton.vue', () => {
  it('renders without any props', () => {
    shallowMount(VirtusizeButton)
  })

  it('prop "btnClass" is working', () => {
    const wrapper = shallowMount(VirtusizeButton, {
      propsData: {
        btnClass: 'a-test-class'
      }
    })
    expect(wrapper.find('a').classes()).toContain('a-test-class')
  })

  it('prop "label" is working', () => {
    const wrapper = shallowMount(VirtusizeButton, {
      propsData: {
        label: 'a-test-label'
      }
    })
    expect(wrapper.find('a').text()).toBe('a-test-label')
  })

  it('prop "to" is working', () => {
    const wrapper = shallowMount(VirtusizeButton, {
      propsData: {
        to: 'https://google.fr'
      }
    })
    expect(wrapper.find('a').attributes('href')).toBe('https://google.fr')
  })

})
