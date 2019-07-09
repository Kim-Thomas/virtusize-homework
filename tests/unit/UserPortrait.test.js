import { shallowMount } from '@vue/test-utils'
import UserPortrait from '@/components/micro/UserPortrait.vue'

window.$ = window.jQuery = require('jquery');


describe('UserPortrait.vue', () => {
  it('renders without any props', () => {
    shallowMount(UserPortrait)
  })

  it('sanitizes email correctly', () => {
    const wrapper =shallowMount(UserPortrait);
    const valid_email = 'iam@avalidemail.com'
    const invalid_email = 'iamnotavalidemail.com'
    wrapper.setProps({
      email: valid_email
    })
    expect(wrapper.vm.sanitizedEmail).toBe(valid_email)
    wrapper.setProps({
      email: invalid_email
    })
    expect(wrapper.vm.sanitizedEmail).toBe(false)
  })
})
