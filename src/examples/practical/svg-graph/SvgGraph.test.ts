import { mount } from '@vue/test-utils'

import SvgGraph from './SvgGraph.vue'

function expectPolygonPoints(
  actualPoints: string | undefined,
  expectedPoints: [number, number][],
) {
  expect(actualPoints).toBeDefined()

  const points = actualPoints
    ?.split(' ')
    .map((point) => point.split(',').map(Number) as [number, number])

  expect(points).toHaveLength(expectedPoints.length)

  points?.forEach(([x, y], index) => {
    expect(x).toBeCloseTo(expectedPoints[index][0])
    expect(y).toBeCloseTo(expectedPoints[index][1])
  })
}

describe('SvgGraph', () => {
  it('初期状態でグラフ、操作フォーム、生データが表示される', () => {
    const wrapper = mount(SvgGraph)

    expect(wrapper.find('svg').exists()).toBe(true)
    expectPolygonPoints(wrapper.find('polygon').attributes('points'), [
      [100, 20],
      [169.282, 60],
      [169.282, 140],
      [100, 180],
      [30.718, 140],
      [30.718, 60],
    ])
    expect(wrapper.findAll('text').map((label) => label.text())).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
    ])
    expect(wrapper.findAll('input[type="range"]')).toHaveLength(6)
    expect(wrapper.find('#raw').text()).toContain('"label": "A"')
    expect(wrapper.find('#raw').text()).toContain('"value": 100')
  })

  it('レンジ入力を変更すると値と polygon の points が更新される', async () => {
    const wrapper = mount(SvgGraph)
    const firstRange = wrapper.find<HTMLInputElement>('input[type="range"]')

    await firstRange.setValue(50)

    expect(wrapper.findAll('span')[0].text()).toBe('50')
    expectPolygonPoints(wrapper.find('polygon').attributes('points'), [
      [100, 60],
      [169.282, 60],
      [169.282, 140],
      [100, 180],
      [30.718, 140],
      [30.718, 60],
    ])
    expect(wrapper.find('#raw').text()).toContain('"value": 50')
  })

  it('フォームにラベルを入力して送信すると stat が追加される', async () => {
    const wrapper = mount(SvgGraph)

    await wrapper.find<HTMLInputElement>('input[name="newlabel"]').setValue('G')
    await wrapper.find('form#add').trigger('submit')

    expect(wrapper.find<HTMLInputElement>('input[name="newlabel"]').element.value).toBe('')
    expect(wrapper.findAll('text').map((label) => label.text())).toEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
    ])
    expect(wrapper.findAll('input[type="range"]')).toHaveLength(7)
    expect(wrapper.find('#raw').text()).toContain('"label": "G"')
  })

  it('ラベルが空の場合は stat が追加されない', async () => {
    const wrapper = mount(SvgGraph)

    await wrapper.find('form#add').trigger('submit')

    expect(wrapper.findAll('text')).toHaveLength(6)
    expect(wrapper.findAll('input[type="range"]')).toHaveLength(6)
  })

  it('最小件数までは stat を削除し、それ以上の削除では alert を表示する', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const wrapper = mount(SvgGraph)

    await wrapper.findAll('button.remove')[0].trigger('click')
    await wrapper.findAll('button.remove')[0].trigger('click')
    await wrapper.findAll('button.remove')[0].trigger('click')

    expect(wrapper.findAll('text').map((label) => label.text())).toEqual(['D', 'E', 'F'])
    expect(wrapper.findAll('input[type="range"]')).toHaveLength(3)

    await wrapper.findAll('button.remove')[0].trigger('click')

    expect(wrapper.findAll('text').map((label) => label.text())).toEqual(['D', 'E', 'F'])
    expect(alertSpy).toHaveBeenCalledWith('Can\'t delete more!')

    alertSpy.mockRestore()
  })
})
