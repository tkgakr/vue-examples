import { mount, type VueWrapper } from '@vue/test-utils'

import Cells from './Cells.vue'
import { cells } from './store'

const COLS = 5
const ROWS = 20

const getCells = (wrapper: VueWrapper) => wrapper.findAll('.cell')

// 指定インデックスのセルを編集モードにして値を入力・確定するヘルパー
const setCellValue = async (
  wrapper: VueWrapper,
  index: number,
  value: string,
) => {
  const cell = getCells(wrapper)[index]
  await cell.trigger('click')
  const input = cell.get<HTMLInputElement>('input')
  await input.setValue(value)
  await input.trigger('change')
}

// 行(row)・列(col)からセルのインデックスを求める（行優先）
const cellIndex = (row: number, col: number) => row * COLS + col

describe('Cells', () => {
  beforeEach(() => {
    // モジュールレベルの共有状態なのでテストごとに初期化する
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        cells[c][r] = ''
      }
    }
  })

  it('初期表示で列ヘッダー A〜E が表示される', () => {
    const wrapper = mount(Cells)

    const headers = wrapper
      .findAll('thead th')
      .map((th) => th.text())
      .filter((text) => text !== '')

    expect(headers).toEqual(['A', 'B', 'C', 'D', 'E'])
  })

  it('初期表示で 5 列 × 20 行ぶんのセルが描画される', () => {
    const wrapper = mount(Cells)

    expect(getCells(wrapper)).toHaveLength(COLS * ROWS)
  })

  it('セル参照を含む数式で他セルの値を合算できる', async () => {
    const wrapper = mount(Cells)

    await setCellValue(wrapper, cellIndex(0, 0), '5') // A0
    await setCellValue(wrapper, cellIndex(0, 1), '3') // B0
    await setCellValue(wrapper, cellIndex(1, 0), '=A0+B0') // A1

    expect(getCells(wrapper)[cellIndex(1, 0)].text()).toBe('8')
  })

  it('参照先セルを更新すると数式セルの表示も追従する', async () => {
    const wrapper = mount(Cells)

    await setCellValue(wrapper, cellIndex(0, 0), '5') // A0
    await setCellValue(wrapper, cellIndex(1, 0), '=A0*2') // A1
    expect(getCells(wrapper)[cellIndex(1, 0)].text()).toBe('10')

    await setCellValue(wrapper, cellIndex(0, 0), '8') // A0 を更新

    expect(getCells(wrapper)[cellIndex(1, 0)].text()).toBe('16')
  })

  it('不正な数式を入力するとエラー文字列が表示される', async () => {
    const wrapper = mount(Cells)

    await setCellValue(wrapper, cellIndex(0, 0), '=1+')

    expect(getCells(wrapper)[cellIndex(0, 0)].text()).toContain('#ERROR')
  })
})
