import { mount } from '@vue/test-utils'

import Counter from './Counter.vue'

describe('Counter', () => {
  it('初期表示でカウントが 0 と表示される', () => {
    const wrapper = mount(Counter)

    expect(wrapper.text()).toContain('0')
  })

  it('ボタンをクリックするとカウントが 1 増える', async () => {
    const wrapper = mount(Counter)

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('1')
  })

  it('ボタンを複数回クリックするとクリック回数だけカウントが増える', async () => {
    const wrapper = mount(Counter)
    const button = wrapper.get('button')

    await button.trigger('click')
    await button.trigger('click')
    await button.trigger('click')

    expect(wrapper.text()).toContain('3')
  })
})
