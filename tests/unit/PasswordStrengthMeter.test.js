import { shallowMount } from '@vue/test-utils'
import PasswordStrengthMeter from '@/components/micro/PasswordStrengthMeter.vue'

window.$ = window.jQuery = require('jquery');


describe('PasswordStrengthMeter.vue', () => {
  it('renders without any props', () => {
    shallowMount(PasswordStrengthMeter)
  })

  it('prop "strength" is working', () => {
    const wrapper = shallowMount(PasswordStrengthMeter, {
      propsData: {
        strength: 2
      }
    });

    expect(wrapper.find('.meter').attributes('data-strength')).toBe('2')
  })

  it('strengthLabel is working', () => {
    const wrapper = shallowMount(PasswordStrengthMeter, {
      propsData: {
        strength: 0
      }
    });
    expect(wrapper.find('.label').text()).toBe('Very weak')
    wrapper.setProps({strength: 1})
    expect(wrapper.find('.label').text()).toBe('Weak')
    wrapper.setProps({ strength: 2 })
    expect(wrapper.find('.label').text()).toBe('Insufficient')
    wrapper.setProps({ strength: 3 })
    expect(wrapper.find('.label').text()).toBe('Good')
    wrapper.setProps({ strength: 4 })
    expect(wrapper.find('.label').text()).toBe('Strong')
  })

  it('isActive method is working', () => {
    const wrapper = shallowMount(PasswordStrengthMeter, {
      propsData: {
        strength: 2
      }
    });
    expect(wrapper.vm.isActive(0)).toBe('active')
    expect(wrapper.vm.isActive(3)).toBe('')
  })
})
