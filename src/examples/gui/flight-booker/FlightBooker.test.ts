import { mount, type VueWrapper } from '@vue/test-utils'

import FlightBooker from './FlightBooker.vue'

const getDepartureInput = (wrapper: VueWrapper) =>
  wrapper.get<HTMLInputElement>('#departure-date')

const getReturnInput = (wrapper: VueWrapper) =>
  wrapper.get<HTMLInputElement>('#return-date')

const getBookButton = (wrapper: VueWrapper) =>
  wrapper.get<HTMLButtonElement>('button')

const selectReturnFlight = async (wrapper: VueWrapper) => {
  await wrapper.get('select').setValue('return flight')
}

describe('FlightBooker', () => {
  it('初期表示は片道便で復路の入力欄が無効化されている', () => {
    const wrapper = mount(FlightBooker)

    expect(wrapper.get<HTMLSelectElement>('select').element.value).toBe(
      'one-way flight',
    )
    expect(getReturnInput(wrapper).element.disabled).toBe(true)
    expect(getDepartureInput(wrapper).element.disabled).toBe(false)
  })

  it('片道便では予約ボタンが有効でエラーメッセージは表示されない', () => {
    const wrapper = mount(FlightBooker)

    expect(getBookButton(wrapper).element.disabled).toBe(false)
    expect(wrapper.get('p').text()).toBe('')
  })

  it('往復便を選ぶと復路の入力欄が有効になる', async () => {
    const wrapper = mount(FlightBooker)

    await selectReturnFlight(wrapper)

    expect(getReturnInput(wrapper).element.disabled).toBe(false)
  })

  it('往復便で復路が往路以前だと予約できずエラーメッセージが表示される', async () => {
    const wrapper = mount(FlightBooker)

    await selectReturnFlight(wrapper)
    await getDepartureInput(wrapper).setValue('2026-06-10')
    await getReturnInput(wrapper).setValue('2026-06-09')

    expect(getBookButton(wrapper).element.disabled).toBe(true)
    expect(wrapper.get('p').text()).toBe(
      'Return date must be after departure date.',
    )
  })

  it('往復便で復路が往路と同日だと予約できずエラーメッセージが表示される', async () => {
    const wrapper = mount(FlightBooker)

    await selectReturnFlight(wrapper)
    await getDepartureInput(wrapper).setValue('2026-06-10')
    await getReturnInput(wrapper).setValue('2026-06-10')

    expect(getBookButton(wrapper).element.disabled).toBe(true)
    expect(wrapper.get('p').text()).toBe(
      'Return date must be after departure date.',
    )
  })

  it('往復便で復路が往路より後なら予約できる', async () => {
    const wrapper = mount(FlightBooker)

    await selectReturnFlight(wrapper)
    await getDepartureInput(wrapper).setValue('2026-06-10')
    await getReturnInput(wrapper).setValue('2026-06-11')

    expect(getBookButton(wrapper).element.disabled).toBe(false)
    expect(wrapper.get('p').text()).toBe('')
  })

  it('片道便の予約ボタンを押すと片道便の内容で alert が呼ばれる', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const wrapper = mount(FlightBooker)

    await getDepartureInput(wrapper).setValue('2026-06-10')
    await getBookButton(wrapper).trigger('click')

    expect(alertSpy).toHaveBeenCalledWith(
      'You have booked a one-way flight leaving on 2026-06-10.',
    )

    alertSpy.mockRestore()
  })

  it('往復便の予約ボタンを押すと往復便の内容で alert が呼ばれる', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const wrapper = mount(FlightBooker)

    await selectReturnFlight(wrapper)
    await getDepartureInput(wrapper).setValue('2026-06-10')
    await getReturnInput(wrapper).setValue('2026-06-20')
    await getBookButton(wrapper).trigger('click')

    expect(alertSpy).toHaveBeenCalledWith(
      'You have booked a return flight leaving on 2026-06-10 and returning on 2026-06-20.',
    )

    alertSpy.mockRestore()
  })
})
