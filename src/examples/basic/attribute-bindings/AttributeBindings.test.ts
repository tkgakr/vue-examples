import { mount } from '@vue/test-utils'

import AttributeBindings from './AttributeBindings.vue'

describe('AttributeBindings', () => {
  it('span に message が title 属性としてバインドされる', () => {
    const wrapper = mount(AttributeBindings)

    expect(wrapper.get('span').attributes('title')).toBe('Hello World!')
  })

  it('初期状態では赤色用の段落に red クラスが付与されている', () => {
    const wrapper = mount(AttributeBindings)

    const redParagraph = wrapper.findAll('p')[1]
    expect(redParagraph.classes()).toContain('red')
  })

  it('赤色用の段落をクリックすると red クラスがトグルされる', async () => {
    const wrapper = mount(AttributeBindings)

    const redParagraph = wrapper.findAll('p')[1]

    await redParagraph.trigger('click')
    expect(redParagraph.classes()).not.toContain('red')

    await redParagraph.trigger('click')
    expect(redParagraph.classes()).toContain('red')
  })

  it('初期状態では色用の段落に color: green のスタイルが適用される', () => {
    const wrapper = mount(AttributeBindings)

    const colorParagraph = wrapper.findAll('p')[2]
    expect(colorParagraph.attributes('style')).toContain('color: green')
  })

  it('色用の段落をクリックすると green と blue が切り替わる', async () => {
    const wrapper = mount(AttributeBindings)

    const colorParagraph = wrapper.findAll('p')[2]

    await colorParagraph.trigger('click')
    expect(colorParagraph.attributes('style')).toContain('color: blue')

    await colorParagraph.trigger('click')
    expect(colorParagraph.attributes('style')).toContain('color: green')
  })
})
