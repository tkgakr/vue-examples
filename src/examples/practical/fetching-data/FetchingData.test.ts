import { flushPromises, mount } from '@vue/test-utils'

import FetchingData from './FetchingData.vue'

interface MockCommit {
  sha: string
  html_url: string
  author: { login: string, html_url: string } | null
  commit: {
    message: string
    author: { name: string, email: string, date: string }
  }
}

function makeCommit(overrides: Partial<MockCommit> = {}): MockCommit {
  return {
    sha: 'abcdef1234567890',
    html_url: 'https://github.com/vuejs/core/commit/abcdef1234567890',
    author: {
      login: 'octocat',
      html_url: 'https://github.com/octocat',
    },
    commit: {
      message: 'fix: something\n\ndetailed body',
      author: {
        name: 'Octocat',
        email: 'octocat@example.com',
        date: '2026-05-23T08:30:00Z',
      },
    },
    ...overrides,
  }
}

function mockFetch(commits: MockCommit[]) {
  return vi.fn().mockResolvedValue({
    json: () => Promise.resolve(commits),
  } as Response)
}

describe('FetchingData', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('初期表示で main ブランチのコミットを取得する', async () => {
    const fetchMock = mockFetch([makeCommit()])
    vi.stubGlobal('fetch', fetchMock)

    mount(FetchingData)
    await flushPromises()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=main',
    )
  })

  it('取得したコミットがリストとして表示される', async () => {
    const commits = [
      makeCommit({ sha: '1111111aaaaaaa' }),
      makeCommit({ sha: '2222222bbbbbbb' }),
    ]
    vi.stubGlobal('fetch', mockFetch(commits))

    const wrapper = mount(FetchingData)
    await flushPromises()

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
    expect(items[0].get('a.commit').text()).toBe('1111111')
    expect(items[1].get('a.commit').text()).toBe('2222222')
  })

  it('コミットメッセージは 1 行目（要約）のみ表示される', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch([
        makeCommit({
          commit: {
            message: 'fix: バグ修正\n\n詳細な説明文',
            author: {
              name: 'Octocat',
              email: 'octocat@example.com',
              date: '2026-05-23T08:30:00Z',
            },
          },
        }),
      ]),
    )

    const wrapper = mount(FetchingData)
    await flushPromises()

    expect(wrapper.get('.message').text()).toBe('fix: バグ修正')
  })

  it('日付の T/Z がスペースに置換され末尾はトリムされる', async () => {
    vi.stubGlobal('fetch', mockFetch([makeCommit()]))

    const wrapper = mount(FetchingData)
    await flushPromises()

    expect(wrapper.get('.date').text()).toBe('2026-05-23 08:30:00')
  })

  it('ブランチを切り替えると新しいブランチで再取得される', async () => {
    const fetchMock = mockFetch([makeCommit()])
    vi.stubGlobal('fetch', fetchMock)

    const wrapper = mount(FetchingData)
    await flushPromises()

    await wrapper.get('#minor').setValue(true)
    await flushPromises()

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock).toHaveBeenLastCalledWith(
      'https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=minor',
    )
  })

  it('author が null でもコミット名がプレーンテキストで表示される', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch([
        makeCommit({
          author: null,
          commit: {
            message: 'chore: anonymous commit',
            author: {
              name: 'Anonymous',
              email: 'anon@example.com',
              date: '2026-05-23T08:30:00Z',
            },
          },
        }),
      ]),
    )

    const wrapper = mount(FetchingData)
    await flushPromises()

    const authorSpan = wrapper.get('.author')
    expect(authorSpan.text()).toBe('Anonymous')
    expect(authorSpan.find('a').exists()).toBe(false)
  })
})
