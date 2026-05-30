import { mount, type VueWrapper } from '@vue/test-utils'
import { vi } from 'vitest'

import ListWithTransitions from './ListWithTransitions.vue'

const getButtonByText = (wrapper: VueWrapper, text: string) =>
  wrapper.findAll('button').find((button) => button.text() === text)!

const getItemTexts = (wrapper: VueWrapper): string[] =>
  wrapper.findAll('li').map((li) => li.text().replace(/\s*x$/, '').trim())

describe('ListWithTransitions', () => {
  it('初期状態で 1〜5 のリストが表示される', () => {
    const wrapper = mount(ListWithTransitions)

    expect(wrapper.findAll('li')).toHaveLength(5)
    expect(getItemTexts(wrapper)).toEqual(['1', '2', '3', '4', '5'])
  })

  it('Insert ボタンを押すと要素が 1 つ追加される', async () => {
    const wrapper = mount(ListWithTransitions)

    await getButtonByText(wrapper, 'Insert at random index').trigger('click')

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(6)
    expect(getItemTexts(wrapper)).toContain('6')
  })

  it('要素の x ボタンを押すとその要素が削除される', async () => {
    const wrapper = mount(ListWithTransitions)

    await wrapper.findAll('li')[2].get('button').trigger('click')

    const texts = getItemTexts(wrapper)
    expect(texts).toHaveLength(4)
    expect(texts).toEqual(['1', '2', '4', '5'])
  })

  it('Reset ボタンを押すと初期状態に戻る', async () => {
    const wrapper = mount(ListWithTransitions)

    await getButtonByText(wrapper, 'Insert at random index').trigger('click')
    await wrapper.findAll('li')[0].get('button').trigger('click')
    await getButtonByText(wrapper, 'Reset').trigger('click')

    expect(getItemTexts(wrapper)).toEqual(['1', '2', '3', '4', '5'])
  })

  it('Reset 後に Insert すると id が振り直されて 6 が追加される', async () => {
    const wrapper = mount(ListWithTransitions)

    await getButtonByText(wrapper, 'Reset').trigger('click')
    await getButtonByText(wrapper, 'Insert at random index').trigger('click')

    expect(getItemTexts(wrapper)).toContain('6')
  })

  it('Shuffle ボタンを押すと要素の順序が入れ替わる', async () => {
    const spy = vi
      .spyOn(Math, 'random')
      .mockReturnValue(0.99)
    const wrapper = mount(ListWithTransitions)

    await getButtonByText(wrapper, 'Shuffle').trigger('click')

    const texts = getItemTexts(wrapper)
    expect(texts).toHaveLength(5)
    // 順序の入れ替わりを確認
    expect(texts).not.toEqual(['1', '2', '3', '4', '5'])
    // 要素に欠落・重複がないことを確認
    expect([...texts].sort()).toEqual(['1', '2', '3', '4', '5'])

    spy.mockRestore()
  })
})
