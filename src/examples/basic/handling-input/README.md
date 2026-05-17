# Handling Input

## 学んだこと

- ref で定義した変数を script の中で参照・更新するには `.value` を使う
- テンプレート内で ref を使用する際、.value をつける必要はない
- `v-on` ディレクティブで DOM イベントを購読し、イベント発火時に実行するハンドラーを定義できる
  - インラインハンドラー: イベント発火時に実行されるインライン JavaScript 式
  - メソッドハンドラー: コンポーネント上で定義されたメソッドを示すプロパティ名またはパス
- `v-on:` は `@` に省略できる
- `v-on` のためのイベント修飾子（event modifiers）が提供されている（詳細は参考リンクへ）

## 気になったこと

-

## 公式との差分

-

## 参考

- [リアクティビティーの基礎 | Vue.js](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [イベントハンドリング | Vue.js](https://ja.vuejs.org/guide/essentials/event-handling.html)
- [ビルトインのディレクティブ | Vue.js - v-on](https://ja.vuejs.org/api/built-in-directives.html#v-on)
