import { mount } from '@vue/test-utils'

import Modal from './Modal.vue'

describe('Modal', () => {
  it('show が false のとき、モーダルはレンダリングされない', () => {
    const wrapper = mount(Modal, {
      props: { show: false },
    })

    expect(wrapper.find('.modal-mask').exists()).toBe(false)
  })

  it('show が true のとき、モーダルがレンダリングされる', () => {
    const wrapper = mount(Modal, {
      props: { show: true },
    })

    expect(wrapper.find('.modal-mask').exists()).toBe(true)
    expect(wrapper.find('.modal-container').exists()).toBe(true)
  })

  it('スロットが指定されていない場合、デフォルトの内容が表示される', () => {
    const wrapper = mount(Modal, {
      props: { show: true },
    })

    expect(wrapper.find('.modal-header').text()).toBe('default header')
    expect(wrapper.find('.modal-body').text()).toBe('default body')
    expect(wrapper.find('.modal-footer').text()).toContain('default footer')
  })

  it('header / body / footer スロットを上書きできる', () => {
    const wrapper = mount(Modal, {
      props: { show: true },
      slots: {
        header: '<h3>Custom Header</h3>',
        body: '<p>Custom Body</p>',
        footer: '<span>Custom Footer</span>',
      },
    })

    expect(wrapper.find('.modal-header').text()).toBe('Custom Header')
    expect(wrapper.find('.modal-body').text()).toBe('Custom Body')
    expect(wrapper.find('.modal-footer').text()).toBe('Custom Footer')
  })

  it('デフォルトの OK ボタンをクリックすると close イベントが発火する', async () => {
    const wrapper = mount(Modal, {
      props: { show: true },
    })

    await wrapper.find('.modal-default-button').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
