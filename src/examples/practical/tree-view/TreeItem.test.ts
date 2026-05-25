import { mount } from '@vue/test-utils'

import TreeItem from './TreeItem.vue'
import type { TreeNode } from './types'

describe('TreeItem', () => {
  it('model.name がレンダリングされる', () => {
    const wrapper = mount(TreeItem, {
      props: { modelValue: { name: 'root' } },
    })

    expect(wrapper.text()).toContain('root')
  })

  it('children を持たない場合は折りたたみ表示が出ない', () => {
    const wrapper = mount(TreeItem, {
      props: { modelValue: { name: 'leaf' } },
    })

    expect(wrapper.find('span').exists()).toBe(false)
    expect(wrapper.find('div').classes()).not.toContain('bold')
  })

  it('children を持つ場合は bold クラスと [+] が表示される', () => {
    const model: TreeNode = {
      name: 'folder',
      children: [{ name: 'a' }, { name: 'b' }],
    }
    const wrapper = mount(TreeItem, { props: { modelValue: model } })

    expect(wrapper.find('div').classes()).toContain('bold')
    expect(wrapper.find('span').text()).toBe('[+]')
  })

  it('クリックすると開閉して [+] と [-] が切り替わる', async () => {
    const model: TreeNode = {
      name: 'folder',
      children: [{ name: 'a' }],
    }
    const wrapper = mount(TreeItem, { props: { modelValue: model } })

    expect(wrapper.find('span').text()).toBe('[+]')
    await wrapper.find('div').trigger('click')
    expect(wrapper.find('span').text()).toBe('[-]')
    await wrapper.find('div').trigger('click')
    expect(wrapper.find('span').text()).toBe('[+]')
  })

  it('展開すると子の TreeItem がレンダリングされる', async () => {
    const model: TreeNode = {
      name: 'folder',
      children: [{ name: 'a' }, { name: 'b' }],
    }
    const wrapper = mount(TreeItem, { props: { modelValue: model } })

    await wrapper.find('div').trigger('click')

    const childItems = wrapper.findAllComponents(TreeItem)
    expect(childItems).toHaveLength(2)
    expect(wrapper.text()).toContain('a')
    expect(wrapper.text()).toContain('b')
  })

  it('"+" をクリックすると子ノードが追加される', async () => {
    const model: TreeNode = {
      name: 'folder',
      children: [{ name: 'a' }],
    }
    const wrapper = mount(TreeItem, { props: { modelValue: model } })

    await wrapper.find('div').trigger('click') // open
    await wrapper.find('li.add').trigger('click')

    expect(model.children).toHaveLength(2)
    expect(model.children![1]).toEqual({ name: 'new stuff' })
  })

  it('葉ノードをダブルクリックするとフォルダ化されて子が追加される', async () => {
    const model: TreeNode = { name: 'leaf' }
    const wrapper = mount(TreeItem, { props: { modelValue: model } })

    await wrapper.find('div').trigger('dblclick')

    expect(model.children).toEqual([{ name: 'new stuff' }])
    expect(wrapper.find('span').text()).toBe('[-]')
  })

  it('既にフォルダのノードはダブルクリックで子が追加されない', async () => {
    const model: TreeNode = {
      name: 'folder',
      children: [{ name: 'a' }],
    }
    const wrapper = mount(TreeItem, { props: { modelValue: model } })

    await wrapper.find('div').trigger('dblclick')

    expect(model.children).toHaveLength(1)
  })
})
