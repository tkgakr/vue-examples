import { mount } from '@vue/test-utils'

import FormBindings from './FormBindings.vue'

describe('FormBindings', () => {
  it('テキスト入力が v-model で双方向バインディングされる', async () => {
    const wrapper = mount(FormBindings)

    const input = wrapper.get('#textbox')
    expect((input.element as HTMLInputElement).value).toBe('Edit me')
    expect(wrapper.findAll('p')[0].text()).toBe('Edit me')

    await input.setValue('Hello')
    expect(wrapper.findAll('p')[0].text()).toBe('Hello')
  })

  it('単一チェックボックスが v-model で真偽値にバインディングされる', async () => {
    const wrapper = mount(FormBindings)

    const checkbox = wrapper.get('#checkbox')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
    expect(wrapper.get('label[for="checkbox"]').text()).toBe('Checked: true')

    await checkbox.setValue(false)
    expect(wrapper.get('label[for="checkbox"]').text()).toBe('Checked: false')
  })

  it('複数チェックボックスが v-model で配列にバインディングされる', async () => {
    const wrapper = mount(FormBindings)

    const jack = wrapper.get('#jack')
    const john = wrapper.get('#john')
    const mike = wrapper.get('#mike')

    expect((jack.element as HTMLInputElement).checked).toBe(true)
    expect((john.element as HTMLInputElement).checked).toBe(false)
    expect((mike.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.findAll('p')[1].text()).toContain('"Jack"')

    await john.setValue(true)
    await mike.setValue(true)
    const checkedText = wrapper.findAll('p')[1].text()
    expect(checkedText).toContain('"Jack"')
    expect(checkedText).toContain('"John"')
    expect(checkedText).toContain('"Mike"')

    await jack.setValue(false)
    const afterUncheck = wrapper.findAll('p')[1].text()
    expect(afterUncheck).not.toContain('"Jack"')
    expect(afterUncheck).toContain('"John"')
    expect(afterUncheck).toContain('"Mike"')
  })

  it('ラジオボタンが v-model で選択値にバインディングされる', async () => {
    const wrapper = mount(FormBindings)

    expect((wrapper.get('#one').element as HTMLInputElement).checked).toBe(true)
    expect((wrapper.get('#two').element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.findAll('p')[2].text()).toBe('Picked: One')

    await wrapper.get('#two').setValue(true)
    expect(wrapper.findAll('p')[2].text()).toBe('Picked: Two')
  })

  it('セレクトボックスが v-model で選択値にバインディングされる', async () => {
    const wrapper = mount(FormBindings)

    const select = wrapper.get('select:not([multiple])')
    expect((select.element as HTMLSelectElement).value).toBe('A')
    expect(wrapper.findAll('p')[3].text()).toBe('Selected: A')

    await select.setValue('B')
    expect(wrapper.findAll('p')[3].text()).toBe('Selected: B')
  })

  it('複数選択セレクトボックスが v-model で配列にバインディングされる', async () => {
    const wrapper = mount(FormBindings)

    const multiSelect = wrapper.get('select[multiple]')
    expect(wrapper.findAll('p')[4].text()).toContain('"A"')
    expect(wrapper.findAll('p')[4].text()).not.toContain('"C"')

    await multiSelect.setValue(['A', 'C'])
    const multiText = wrapper.findAll('p')[4].text()
    expect(multiText).toContain('"A"')
    expect(multiText).toContain('"C"')
  })
})
