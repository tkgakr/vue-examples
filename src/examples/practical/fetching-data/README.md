# Fetching Data

## 学んだこと

- `watchEffect` で副作用を宣言的に書ける
  - 初回は即時実行され、内部で参照しているリアクティブな値（`currentBranch.value` など）が変化するたびに再実行される
  - `watch` と違って依存関係を明示せず、関数内で参照したものが自動的に追跡される
- `watchEffect` のコールバックに `async` 関数を渡せば、`fetch` などの非同期処理をそのまま書ける
- GitHub API のコミットレスポンスは `author`（GitHub アカウント）が `null` になり得るため、テンプレート側で `v-if` ガードが必要
- 正規表現リテラル `/T|Z/g` はクォートで囲まず、スラッシュで囲んで `g` などのフラグを末尾に付ける
  - 動的に組み立てたい場合のみ `new RegExp(文字列, 'g')` を使う

## 気になったこと

- `commits.value = (await response.json()) as Commit[]` の型アサーションは実行時には何も検証していない
  - 本格的なアプリケーションでは [Zod](https://zod.dev/) などでランタイムバリデーションをしたい
- `watchEffect` 内の `fetch` はキャンセル処理を入れていないので、ブランチを高速に切り替えると古いリクエストの結果で上書きされる可能性がある
  - `onCleanup` 引数や `AbortController` でキャンセルできる
- 日付フォーマットを `replace(/T|Z/g, ' ').trim()` で済ませているが、ロケールやタイムゾーンを考慮するなら `Intl.DateTimeFormat` や `Date#toLocaleString` を使うべき

## 参考

- [ウォッチャー | Vue.js - watchEffect](https://ja.vuejs.org/guide/essentials/watchers.html#watcheffect)
- [リアクティビティ API: コア | Vue.js - watchEffect](https://ja.vuejs.org/api/reactivity-core.html#watcheffect)
- [例 | Vue.js - データの取得](https://ja.vuejs.org/examples/#fetching-data)
- [GitHub REST API - List commits](https://docs.github.com/en/rest/commits/commits#list-commits)
