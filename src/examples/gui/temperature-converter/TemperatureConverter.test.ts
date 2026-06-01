import { mount } from '@vue/test-utils'

import TemperatureConverter from './TemperatureConverter.vue'

describe('TemperatureConverter', () => {
  it('初期表示で 0℃ / 32℉ が表示される', () => {
    const wrapper = mount(TemperatureConverter)

    expect(wrapper.get<HTMLInputElement>('#celsius').element.value).toBe('0')
    expect(wrapper.get<HTMLInputElement>('#fahrenheit').element.value).toBe('32')
  })

  it('摂氏を入力すると華氏に変換される', async () => {
    const wrapper = mount(TemperatureConverter)
    const celsius = wrapper.get('#celsius')

    await celsius.setValue('100')
    await celsius.trigger('change')

    expect(wrapper.get<HTMLInputElement>('#fahrenheit').element.value).toBe('212')
  })

  it('華氏を入力すると摂氏に変換される', async () => {
    const wrapper = mount(TemperatureConverter)
    const fahrenheit = wrapper.get('#fahrenheit')

    await fahrenheit.setValue('32')
    await fahrenheit.trigger('change')

    expect(wrapper.get<HTMLInputElement>('#celsius').element.value).toBe('0')
  })

  it('負の摂氏を入力しても正しく変換される', async () => {
    const wrapper = mount(TemperatureConverter)
    const celsius = wrapper.get('#celsius')

    await celsius.setValue('-40')
    await celsius.trigger('change')

    expect(wrapper.get<HTMLInputElement>('#fahrenheit').element.value).toBe('-40')
  })
})
