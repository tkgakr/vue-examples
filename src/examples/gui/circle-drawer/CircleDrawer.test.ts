import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'

import CircleDrawer from './CircleDrawer.vue'

const drawCircle = async (wrapper: VueWrapper, x: number, y: number) => {
  const event = new MouseEvent('click', { bubbles: true })
  Object.defineProperty(event, 'offsetX', { value: x })
  Object.defineProperty(event, 'offsetY', { value: y })
  wrapper.get('svg').element.dispatchEvent(event)
  await nextTick()
}

const getCircles = (wrapper: VueWrapper) => wrapper.findAll('circle')

const getUndoButton = (wrapper: VueWrapper) =>
  wrapper.findAll<HTMLButtonElement>('.controls button')[0]

const getRedoButton = (wrapper: VueWrapper) =>
  wrapper.findAll<HTMLButtonElement>('.controls button')[1]

describe('CircleDrawer', () => {
  it('初期表示では円がなく Undo/Redo が無効になっている', () => {
    const wrapper = mount(CircleDrawer)

    expect(getCircles(wrapper)).toHaveLength(0)
    expect(getUndoButton(wrapper).element.disabled).toBe(true)
    expect(getRedoButton(wrapper).element.disabled).toBe(true)
  })

  it('キャンバスをクリックすると半径 50 の円がその位置に描画される', async () => {
    const wrapper = mount(CircleDrawer)

    await drawCircle(wrapper, 100, 120)

    const circles = getCircles(wrapper)
    expect(circles).toHaveLength(1)
    expect(circles[0].attributes('cx')).toBe('100')
    expect(circles[0].attributes('cy')).toBe('120')
    expect(circles[0].attributes('r')).toBe('50')
  })

  it('複数回クリックするとクリックした数だけ円が増える', async () => {
    const wrapper = mount(CircleDrawer)

    await drawCircle(wrapper, 50, 50)
    await drawCircle(wrapper, 150, 150)
    await drawCircle(wrapper, 250, 80)

    expect(getCircles(wrapper)).toHaveLength(3)
  })

  it('既存の円の上をクリックするとその円が選択され新しい円は増えない', async () => {
    const wrapper = mount(CircleDrawer)

    await drawCircle(wrapper, 100, 100)
    await drawCircle(wrapper, 100, 100)

    const circles = getCircles(wrapper)
    expect(circles).toHaveLength(1)
    expect(circles[0].attributes('fill')).toBe('#ccc')
  })

  it('Undo で直前に描いた円が取り消され、Redo でやり直せる', async () => {
    const wrapper = mount(CircleDrawer)

    await drawCircle(wrapper, 100, 100)
    expect(getUndoButton(wrapper).element.disabled).toBe(false)

    await getUndoButton(wrapper).trigger('click')
    expect(getCircles(wrapper)).toHaveLength(0)
    expect(getRedoButton(wrapper).element.disabled).toBe(false)

    await getRedoButton(wrapper).trigger('click')
    expect(getCircles(wrapper)).toHaveLength(1)
    expect(getRedoButton(wrapper).element.disabled).toBe(true)
  })

  it('円を右クリックすると半径調整ダイアログが表示される', async () => {
    const wrapper = mount(CircleDrawer)

    await drawCircle(wrapper, 100, 100)
    expect(wrapper.find('.dialog').exists()).toBe(false)

    await wrapper.get('circle').trigger('contextmenu')

    expect(wrapper.find('.dialog').exists()).toBe(true)
  })

  it('ダイアログのスライダーで選択した円の半径を変更できる', async () => {
    const wrapper = mount(CircleDrawer)

    await drawCircle(wrapper, 100, 100)
    await wrapper.get('circle').trigger('contextmenu')

    await wrapper.get<HTMLInputElement>('.dialog input').setValue('150')

    expect(wrapper.get('circle').attributes('r')).toBe('150')
  })

  it('半径調整後にキャンバスをクリックするとダイアログが閉じる', async () => {
    const wrapper = mount(CircleDrawer)

    await drawCircle(wrapper, 100, 100)
    await wrapper.get('circle').trigger('contextmenu')
    expect(wrapper.find('.dialog').exists()).toBe(true)

    await drawCircle(wrapper, 300, 300)

    expect(wrapper.find('.dialog').exists()).toBe(false)
  })
})
