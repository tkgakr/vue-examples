import { mount } from '@vue/test-utils'

import TreeItem from './TreeItem.vue'
import TreeView from './TreeView.vue'

describe('TreeView', () => {
  it('ルートのツリー名がレンダリングされる', () => {
    const wrapper = mount(TreeView)

    expect(wrapper.text()).toContain('My Tree')
  })

  it('ルート直下に TreeItem が一つマウントされる', () => {
    const wrapper = mount(TreeView)

    const items = wrapper.findAllComponents(TreeItem)
    expect(items.length).toBeGreaterThanOrEqual(1)
    expect(items[0]!.props('modelValue')).toMatchObject({ name: 'My Tree' })
  })

  it('ルートを展開すると直下の子ノードが表示される', async () => {
    const wrapper = mount(TreeView)

    await wrapper.find('div').trigger('click')

    expect(wrapper.text()).toContain('hello')
    expect(wrapper.text()).toContain('world')
    expect(wrapper.text()).toContain('child folder')
  })
})
