import { mount } from '@vue/test-utils'

import ModalWithTransitions from './ModalWithTransitions.vue'

describe('ModalWithTransitions', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('初期状態では Show Modal ボタンが表示されている', () => {
    const wrapper = mount(ModalWithTransitions)

    const button = wrapper.find('#show-modal')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Show Modal')
  })

  it('初期状態ではモーダルは表示されていない', () => {
    mount(ModalWithTransitions, { attachTo: document.body })

    expect(document.body.querySelector('.modal-mask')).toBeNull()
  })

  it('Show Modal ボタンをクリックするとモーダルが表示される', async () => {
    const wrapper = mount(ModalWithTransitions, { attachTo: document.body })

    await wrapper.find('#show-modal').trigger('click')

    expect(document.body.querySelector('.modal-mask')).not.toBeNull()
    expect(document.body.querySelector('.modal-header')?.textContent).toContain(
      'Custome Header',
    )
  })

  it('モーダルの OK ボタンをクリックするとモーダルが閉じる', async () => {
    const wrapper = mount(ModalWithTransitions, { attachTo: document.body })

    await wrapper.find('#show-modal').trigger('click')
    expect(document.body.querySelector('.modal-mask')).not.toBeNull()

    const closeButton = document.body.querySelector<HTMLButtonElement>(
      '.modal-default-button',
    )
    expect(closeButton).not.toBeNull()
    closeButton!.click()
    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('.modal-mask')).toBeNull()
  })
})
