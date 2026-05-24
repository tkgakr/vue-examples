import { mount } from '@vue/test-utils'
import type { DefineComponent } from 'vue'

import Grid from './Grid.vue'
import GridWithSortAndFilter from './GridWithSortAndFilter.vue'

// Grid はジェネリックコンポーネントのため、findComponent の型推論が効かない。
// props だけ検査できれば十分なので、props 型を明示した DefineComponent として扱う。
type GridProps = {
  data: { name: string, power: number }[]
  columns: ('name' | 'power')[]
  filterKey?: string
}
const GridForTest = Grid as unknown as DefineComponent<GridProps>

describe('GridWithSortAndFilter', () => {
  it('検索フォームがレンダリングされる', () => {
    const wrapper = mount(GridWithSortAndFilter)

    const input = wrapper.find('input[name="query"]')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('子の Grid コンポーネントに gridData と gridColumns を渡している', () => {
    const wrapper = mount(GridWithSortAndFilter)

    const grid = wrapper.findComponent(GridForTest)
    expect(grid.exists()).toBe(true)
    expect(grid.props('columns')).toEqual(['name', 'power'])
    expect(grid.props('data')).toEqual([
      { name: 'Chuck Norris', power: Infinity },
      { name: 'Bruce Lee', power: 9000 },
      { name: 'Jackie Chan', power: 7000 },
      { name: 'Jet Li', power: 8000 },
    ])
  })

  it('入力時の searchQuery が Grid の filterKey prop に反映される', async () => {
    const wrapper = mount(GridWithSortAndFilter)
    const grid = wrapper.findComponent(GridForTest)

    expect(grid.props('filterKey')).toBe('')

    await wrapper.find('input[name="query"]').setValue('lee')

    expect(grid.props('filterKey')).toBe('lee')
  })
})
