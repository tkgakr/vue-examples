import { valueToPoint } from './util'

describe('valueToPoint', () => {
  it('最初の点をチャート上部に配置する', () => {
    expect(valueToPoint(100, 0, 6)).toEqual({
      x: 100,
      y: 20,
    })
  })

  it('value に応じて中心からの距離を変える', () => {
    expect(valueToPoint(50, 0, 6)).toEqual({
      x: 100,
      y: 60,
    })
  })

  it('点を中心の周りに等間隔で回転配置する', () => {
    const point = valueToPoint(100, 1, 6)

    expect(point.x).toBeCloseTo(169.282)
    expect(point.y).toBeCloseTo(60)
  })
})
