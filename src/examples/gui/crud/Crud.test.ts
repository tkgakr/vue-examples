import { mount, type VueWrapper } from '@vue/test-utils'

import Crud from './Crud.vue'

const getPrefixInput = (wrapper: VueWrapper) =>
  wrapper.get<HTMLInputElement>('#prefix')

const getNameInput = (wrapper: VueWrapper) =>
  wrapper.get<HTMLInputElement>('#first-name')

const getSurnameInput = (wrapper: VueWrapper) =>
  wrapper.get<HTMLInputElement>('#last-name')

const getSelect = (wrapper: VueWrapper) =>
  wrapper.get<HTMLSelectElement>('#name-list')

const getCreateButton = (wrapper: VueWrapper) =>
  wrapper.get<HTMLButtonElement>('#create')

const getUpdateButton = (wrapper: VueWrapper) =>
  wrapper.get<HTMLButtonElement>('#update')

const getDeleteButton = (wrapper: VueWrapper) =>
  wrapper.get<HTMLButtonElement>('#delete')

const getOptionTexts = (wrapper: VueWrapper) =>
  wrapper.findAll('option').map((option) => option.text())

describe('Crud', () => {
  it('初期表示で名前一覧が表示される', () => {
    const wrapper = mount(Crud)

    expect(getOptionTexts(wrapper)).toEqual([
      'Emil, Hans',
      'Mustermann, Max',
      'Tisch, Roman',
    ])
  })

  it('prefix を入力すると名前一覧が絞り込まれる', async () => {
    const wrapper = mount(Crud)

    await getPrefixInput(wrapper).setValue('m')

    expect(getOptionTexts(wrapper)).toEqual(['Mustermann, Max'])
  })

  it('名前を選択すると入力欄に姓と名が表示される', async () => {
    const wrapper = mount(Crud)

    await getSelect(wrapper).setValue('Mustermann, Max')

    expect(getSurnameInput(wrapper).element.value).toBe('Mustermann')
    expect(getNameInput(wrapper).element.value).toBe('Max')
  })

  it('姓と名を入力して Create を押すと名前一覧に追加される', async () => {
    const wrapper = mount(Crud)

    await getNameInput(wrapper).setValue('Ada')
    await getSurnameInput(wrapper).setValue('Lovelace')
    await getCreateButton(wrapper).trigger('click')

    expect(getOptionTexts(wrapper)).toContain('Lovelace, Ada')
    expect(getNameInput(wrapper).element.value).toBe('')
    expect(getSurnameInput(wrapper).element.value).toBe('')
  })

  it('選択中の名前を入力値で更新できる', async () => {
    const wrapper = mount(Crud)

    await getSelect(wrapper).setValue('Mustermann, Max')
    await getNameInput(wrapper).setValue('Erika')
    await getSurnameInput(wrapper).setValue('Mustermann')
    await getUpdateButton(wrapper).trigger('click')

    expect(getOptionTexts(wrapper)).toContain('Mustermann, Erika')
    expect(getOptionTexts(wrapper)).not.toContain('Mustermann, Max')
    expect(getSelect(wrapper).element.value).toBe('Mustermann, Erika')
  })

  it('選択中の名前を削除できる', async () => {
    const wrapper = mount(Crud)

    await getSelect(wrapper).setValue('Tisch, Roman')
    await getDeleteButton(wrapper).trigger('click')

    expect(getOptionTexts(wrapper)).not.toContain('Tisch, Roman')
    expect(getSelect(wrapper).element.value).toBe('')
    expect(getNameInput(wrapper).element.value).toBe('')
    expect(getSurnameInput(wrapper).element.value).toBe('')
  })
})
