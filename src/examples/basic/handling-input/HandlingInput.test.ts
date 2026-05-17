import { mount } from '@vue/test-utils'

import HandlingInput from './HandlingInput.vue'

describe('HandlingInput', () => {
  it('初期メッセージが表示される', () => {
    const wrapper = mount(HandlingInput)

    expect(wrapper.get('h1').text()).toBe('Hello World!')
  })

  it('Reverse Message ボタンを押すとメッセージが反転する', async () => {
    const wrapper = mount(HandlingInput)

    await wrapper.get('#reverse-message-button').trigger('click')

    expect(wrapper.get('h1').text()).toBe('!dlroW olleH')
  })

  it('Append "!" ボタンを押すと末尾に "!" が追加される', async () => {
    const wrapper = mount(HandlingInput)

    await wrapper.get('#append-exclamation-button').trigger('click')
    expect(wrapper.get('h1').text()).toBe('Hello World!!')

    await wrapper.get('#append-exclamation-button').trigger('click')
    expect(wrapper.get('h1').text()).toBe('Hello World!!!')
  })

  it('リンククリック時に preventDefault が働き notify が呼ばれる', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const wrapper = mount(HandlingInput)

    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    wrapper.get('a').element.dispatchEvent(event)

    expect(alertSpy).toHaveBeenCalledWith('navigation was prevented')
    expect(event.defaultPrevented).toBe(true)

    alertSpy.mockRestore()
  })
})
