import { mount } from '@vue/test-utils'

import MarkdownEditor from './MarkdownEditor.vue'

describe('MarkdownEditor', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('初期値の Markdown が textarea に表示される', () => {
    const wrapper = mount(MarkdownEditor)

    const textarea = wrapper.get('textarea')
    expect((textarea.element as HTMLTextAreaElement).value).toBe('# hello')
  })

  it('初期値の Markdown が HTML として描画される', () => {
    const wrapper = mount(MarkdownEditor)

    const output = wrapper.get('.output')
    expect(output.find('h1').exists()).toBe(true)
    expect(output.get('h1').text()).toBe('hello')
  })

  it('textarea に入力すると 100ms 後に output が更新される', async () => {
    const wrapper = mount(MarkdownEditor)

    await wrapper.get('textarea').setValue('## updated')

    // debounce 待機前は output は変化しない
    expect(wrapper.get('.output').find('h2').exists()).toBe(false)

    // 100ms 経過させて debounce を発火させる
    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    const output = wrapper.get('.output')
    expect(output.find('h2').exists()).toBe(true)
    expect(output.get('h2').text()).toBe('updated')
  })

  it('debounce により 100ms 以内の連続入力では最後の値だけが反映される', async () => {
    const wrapper = mount(MarkdownEditor)
    const textarea = wrapper.get('textarea')

    await textarea.setValue('# first')
    vi.advanceTimersByTime(50)
    await textarea.setValue('# second')
    vi.advanceTimersByTime(50)
    await textarea.setValue('# third')

    // ここまでで最後の入力から 100ms 経っていないので未反映
    expect(wrapper.get('.output').get('h1').text()).toBe('hello')

    vi.advanceTimersByTime(100)
    await wrapper.vm.$nextTick()

    expect(wrapper.get('.output').get('h1').text()).toBe('third')
  })
})
