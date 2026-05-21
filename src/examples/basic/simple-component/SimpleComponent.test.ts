import { mount } from '@vue/test-utils'

import SimpleComponent from './SimpleComponent.vue'
import TodoItem from './TodoItem.vue'

describe('SimpleComponent', () => {
  it('groceryList の全要素が <li> としてレンダリングされる', () => {
    const wrapper = mount(SimpleComponent)

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(3)
    expect(items.map((i) => i.text())).toEqual([
      'Vegetables',
      'Cheese',
      'Whatever else humans are supposed to eat',
    ])
  })

  it('groceryList の各要素が TodoItem コンポーネントとしてレンダリングされる', () => {
    const wrapper = mount(SimpleComponent)

    const todoItems = wrapper.findAllComponents(TodoItem)
    expect(todoItems).toHaveLength(3)
    expect(todoItems[0]!.props('todo')).toEqual({ id: 0, text: 'Vegetables' })
    expect(todoItems[1]!.props('todo')).toEqual({ id: 1, text: 'Cheese' })
    expect(todoItems[2]!.props('todo')).toEqual({
      id: 2,
      text: 'Whatever else humans are supposed to eat',
    })
  })

  it('リストは <ol> 要素でラップされている', () => {
    const wrapper = mount(SimpleComponent)

    expect(wrapper.find('ol').exists()).toBe(true)
    expect(wrapper.find('ol').findAll('li')).toHaveLength(3)
  })
})
