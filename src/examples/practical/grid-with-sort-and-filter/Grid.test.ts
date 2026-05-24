import { mount } from '@vue/test-utils'

import Grid from './Grid.vue'

type Hero = {
  name: string
  power: number
}

const columns: (keyof Hero)[] = ['name', 'power']
const data: Hero[] = [
  { name: 'Chuck Norris', power: Infinity },
  { name: 'Bruce Lee', power: 9000 },
  { name: 'Jackie Chan', power: 7000 },
  { name: 'Jet Li', power: 8000 },
]

describe('Grid', () => {
  it('columns がヘッダーとしてレンダリングされる', () => {
    const wrapper = mount(Grid, { props: { data, columns } })

    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(2)
    expect(headers.map((h) => h.text())).toEqual(['Name', 'Power'])
  })

  it('data の全行が <tr> としてレンダリングされる', () => {
    const wrapper = mount(Grid, { props: { data, columns } })

    const rows = wrapper.find('tbody').findAll('tr')
    expect(rows).toHaveLength(4)
    expect(rows[0]!.findAll('td').map((td) => td.text())).toEqual([
      'Chuck Norris',
      'Infinity',
    ])
  })

  it('ヘッダーをクリックすると降順でソートされる', async () => {
    const wrapper = mount(Grid, { props: { data, columns } })

    await wrapper.findAll('th')[1]!.trigger('click')

    const firstColumn = wrapper
      .find('tbody')
      .findAll('tr')
      .map((tr) => tr.findAll('td')[0]!.text())
    expect(firstColumn).toEqual([
      'Chuck Norris',
      'Bruce Lee',
      'Jet Li',
      'Jackie Chan',
    ])
  })

  it('同じヘッダーを再度クリックすると昇順に切り替わる', async () => {
    const wrapper = mount(Grid, { props: { data, columns } })
    const powerHeader = wrapper.findAll('th')[1]!

    await powerHeader.trigger('click')
    await powerHeader.trigger('click')

    const firstColumn = wrapper
      .find('tbody')
      .findAll('tr')
      .map((tr) => tr.findAll('td')[0]!.text())
    expect(firstColumn).toEqual([
      'Jackie Chan',
      'Jet Li',
      'Bruce Lee',
      'Chuck Norris',
    ])
  })

  it('クリックされたヘッダーに active クラスが付与される', async () => {
    const wrapper = mount(Grid, { props: { data, columns } })
    const nameHeader = wrapper.findAll('th')[0]!

    expect(nameHeader.classes()).not.toContain('active')
    await nameHeader.trigger('click')
    expect(nameHeader.classes()).toContain('active')
  })

  it('filterKey に一致する行のみが表示される', () => {
    const wrapper = mount(Grid, {
      props: { data, columns, filterKey: 'lee' },
    })

    const rows = wrapper.find('tbody').findAll('tr')
    expect(rows).toHaveLength(1)
    expect(rows[0]!.text()).toContain('Bruce Lee')
  })

  it('filterKey に一致する行が複数ある場合はすべて表示される', () => {
    const wrapper = mount(Grid, {
      props: { data, columns, filterKey: 'ch' },
    })

    const rows = wrapper.find('tbody').findAll('tr')
    expect(rows).toHaveLength(2)
    expect(rows[0]!.text()).toContain('Chuck Norris')
    expect(rows[1]!.text()).toContain('Jackie Chan')
  })

  it('filterKey は大文字小文字を区別しない', () => {
    const wrapper = mount(Grid, {
      props: { data, columns, filterKey: 'CHAN' },
    })

    const rows = wrapper.find('tbody').findAll('tr')
    expect(rows).toHaveLength(1)
    expect(rows[0]!.text()).toContain('Jackie Chan')
  })

  it('filterKey は値が数値のカラムにもマッチする', () => {
    const wrapper = mount(Grid, {
      props: { data, columns, filterKey: '9000' },
    })

    const rows = wrapper.find('tbody').findAll('tr')
    expect(rows).toHaveLength(1)
    expect(rows[0]!.text()).toContain('Bruce Lee')
  })

  it('一致する行が無い場合は "No matches found." を表示する', () => {
    const wrapper = mount(Grid, {
      props: { data, columns, filterKey: 'nobody' },
    })

    expect(wrapper.find('table').exists()).toBe(false)
    expect(wrapper.text()).toContain('No matches found.')
  })
})
