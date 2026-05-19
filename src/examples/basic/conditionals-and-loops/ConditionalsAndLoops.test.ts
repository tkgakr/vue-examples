import { mount } from '@vue/test-utils'

import ConditionalsAndLoops from './ConditionalsAndLoops.vue'

describe('ConditionalsAndLoops', () => {
  it('初期状態でリストの全要素が表示される', () => {
    const wrapper = mount(ConditionalsAndLoops)

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(3)
    expect(items.map((i) => i.text())).toEqual(['1', '2', '3'])
  })

  it('Toggle List ボタンを押すとリストが非表示になり、代替メッセージが表示される', async () => {
    const wrapper = mount(ConditionalsAndLoops)

    await wrapper.findAll('button')[0].trigger('click')

    expect(wrapper.find('ul').exists()).toBe(false)
    expect(wrapper.get('p').text()).toBe('List is not empty, but hidden.')
  })

  it('Push Number ボタンを押すと末尾に要素が追加される', async () => {
    const wrapper = mount(ConditionalsAndLoops)

    await wrapper.findAll('button')[1].trigger('click')

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(4)
    expect(items.map((i) => i.text())).toEqual(['1', '2', '3', '4'])
  })

  it('Pop Number ボタンを押すと末尾の要素が削除される', async () => {
    const wrapper = mount(ConditionalsAndLoops)

    await wrapper.findAll('button')[2].trigger('click')

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
    expect(items.map((i) => i.text())).toEqual(['1', '2'])
  })

  it('Reverse List ボタンを押すとリストが逆順になる', async () => {
    const wrapper = mount(ConditionalsAndLoops)

    await wrapper.findAll('button')[3].trigger('click')

    const items = wrapper.findAll('li')
    expect(items.map((i) => i.text())).toEqual(['3', '2', '1'])
  })

  it('リストが空のときは "List is empty." が表示される', async () => {
    const wrapper = mount(ConditionalsAndLoops)

    await wrapper.findAll('button')[2].trigger('click')
    await wrapper.findAll('button')[2].trigger('click')
    await wrapper.findAll('button')[2].trigger('click')

    expect(wrapper.find('ul').exists()).toBe(false)
    expect(wrapper.get('p').text()).toBe('List is empty.')
  })
})
