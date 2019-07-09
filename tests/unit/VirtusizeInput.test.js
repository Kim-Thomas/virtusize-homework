import { shallowMount } from '@vue/test-utils'
import VirtusizeInput from '@/components/micro/VirtusizeInput.vue'

window.$ = window.jQuery = require('jquery');

describe('VirtusizeInput.vue', () => {
  it('renders without any props', () => {
    shallowMount(VirtusizeInput)
  })

  it('prop "type" is working', () => {
    const wrapper = shallowMount(VirtusizeInput, {
      propsData: { 
        type: 'password'
      }
    })
    expect(wrapper.html()).toContain('type="password"');
  })

  it('prop "size" is working', () => {
    const wrapper = shallowMount(VirtusizeInput, {
      propsData: {
        size: 'medium',
        focused: true
      }
    })
    expect(wrapper.find('.virtusize-input-group').classes()).toContain('medium')
  })

  it('prop "focused" is working', () => {
    const wrapper = shallowMount(VirtusizeInput, {
      propsData: {
        focused: true
      }
    })
    expect(wrapper.find('.virtusize-input-group').classes()).toContain('focused')
  })

  it('prop "validity" is working', () => {
    const wrapper = shallowMount(VirtusizeInput, {
      propsData: {
        validity: 'valid'
      }
    })
    expect(wrapper.find('.virtusize-input-group').classes()).toContain('valid')
  })

  it('prop "passwordVisibility" is working', () => {
    const wrapper = shallowMount(VirtusizeInput, {
      propsData: {
        type: 'password',
        passwordVisibility: true
      }
    })
    expect(wrapper.find('.virtusize-input-group').contains('.toggle-password-visibility')).toBe(true)
  })
})
