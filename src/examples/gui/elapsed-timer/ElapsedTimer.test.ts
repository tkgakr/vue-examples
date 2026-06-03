import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'

import ElapsedTimer from './ElapsedTimer.vue'

const callbacks = new Map<number, FrameRequestCallback>()

let currentTime = 0
let nextHandle = 1

const getProgress = (wrapper: VueWrapper) =>
  wrapper.get<HTMLProgressElement>('progress')

const getDurationInput = (wrapper: VueWrapper) =>
  wrapper.get<HTMLInputElement>('input[type="range"]')

async function runFrame(time: number): Promise<void> {
  currentTime = time

  const entry = callbacks.entries().next().value
  if (entry === undefined) {
    throw new Error('実行待ちの animation frame がありません。')
  }

  const [handle, callback] = entry
  callbacks.delete(handle)
  callback(currentTime)
  await nextTick()
}

beforeEach(() => {
  currentTime = 0
  nextHandle = 1
  callbacks.clear()

  vi.spyOn(performance, 'now').mockImplementation(() => currentTime)
  vi.stubGlobal(
    'requestAnimationFrame',
    vi.fn((callback: FrameRequestCallback): number => {
      const handle = nextHandle
      nextHandle += 1
      callbacks.set(handle, callback)
      return handle
    }),
  )
  vi.stubGlobal(
    'cancelAnimationFrame',
    vi.fn((handle: number): void => {
      callbacks.delete(handle)
    }),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('ElapsedTimer', () => {
  it('初期表示で経過時間と設定時間が表示される', () => {
    const wrapper = mount(ElapsedTimer)

    expect(wrapper.text()).toContain('経過時間:')
    expect(wrapper.text()).toContain('設定時間:')
    expect(wrapper.text()).toContain('0.0s')
    expect(wrapper.text()).toContain('15.0s')
    expect(getProgress(wrapper).element.value).toBe(0)
    expect(getDurationInput(wrapper).element.value).toBe('15000')
  })

  it('描画フレームが進むと経過時間と進捗率が更新される', async () => {
    const wrapper = mount(ElapsedTimer)

    await runFrame(7500)

    expect(wrapper.text()).toContain('7.5s')
    expect(getProgress(wrapper).element.value).toBe(0.5)
  })

  it('設定時間を変更すると表示と進捗率に反映される', async () => {
    const wrapper = mount(ElapsedTimer)

    await getDurationInput(wrapper).setValue('30000')
    await runFrame(7500)

    expect(wrapper.text()).toContain('30.0s')
    expect(getProgress(wrapper).element.value).toBe(0.25)
  })

  it('設定時間に到達すると進捗率が1で止まり、次のフレームは予約されない', async () => {
    const wrapper = mount(ElapsedTimer)

    await getDurationInput(wrapper).setValue('10000')
    await runFrame(12000)

    expect(wrapper.text()).toContain('12.0s')
    expect(getProgress(wrapper).element.value).toBe(1)
    expect(callbacks.size).toBe(0)
  })

  it('Reset ボタンを押すと経過時間と進捗率が初期化される', async () => {
    const wrapper = mount(ElapsedTimer)

    await runFrame(5000)
    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('0.0s')
    expect(getProgress(wrapper).element.value).toBe(0)
    expect(callbacks.size).toBe(1)
  })
})
