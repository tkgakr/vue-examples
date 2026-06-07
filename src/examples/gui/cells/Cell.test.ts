import { mount, type VueWrapper } from '@vue/test-utils'

import Cell from './Cell.vue'
import { cells } from './store'

const COLS = 5
const ROWS = 20

// 対象セルを編集モードにして値を入力・確定するヘルパー
const setValue = async (wrapper: VueWrapper, value: string) => {
  await wrapper.get('.cell').trigger('click')
  const input = wrapper.get<HTMLInputElement>('input')
  await input.setValue(value)
  await input.trigger('change')
}

describe('Cell', () => {
  beforeEach(() => {
    // cells は store のモジュールレベル共有状態なのでテストごとに初期化する
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        cells[c][r] = ''
      }
    }
  })

  it('対応するセルの値を表示する', () => {
    cells[0][0] = 'hello'

    const wrapper = mount(Cell, { props: { c: 0, r: 0 } })

    expect(wrapper.text()).toBe('hello')
  })

  it('クリックすると入力欄が表示される', async () => {
    const wrapper = mount(Cell, { props: { c: 0, r: 0 } })

    expect(wrapper.find('input').exists()).toBe(false)

    await wrapper.get('.cell').trigger('click')

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('値を入力して確定すると表示とストアに反映される', async () => {
    const wrapper = mount(Cell, { props: { c: 1, r: 2 } })

    await setValue(wrapper, 'world')

    expect(wrapper.text()).toBe('world')
    expect(cells[1][2]).toBe('world')
  })

  it('確定すると入力欄が閉じて値が表示される', async () => {
    const wrapper = mount(Cell, { props: { c: 0, r: 0 } })

    await setValue(wrapper, 'done')

    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('前後の空白を除去して保存する', async () => {
    const wrapper = mount(Cell, { props: { c: 0, r: 0 } })

    await setValue(wrapper, '  spaced  ')

    expect(cells[0][0]).toBe('spaced')
  })

  it('数式を入力すると計算結果を表示する', async () => {
    const wrapper = mount(Cell, { props: { c: 0, r: 0 } })

    await setValue(wrapper, '=1+2*3')

    expect(wrapper.text()).toBe('7')
  })

  it('不正な数式を入力するとエラー文字列を表示する', async () => {
    const wrapper = mount(Cell, { props: { c: 0, r: 0 } })

    await setValue(wrapper, '=1+')

    expect(wrapper.text()).toContain('#ERROR')
  })
})
