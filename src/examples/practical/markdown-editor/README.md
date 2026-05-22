# Markdown Editor

## 学んだこと

- `computed` を使うと、リアクティブな値から派生した値を宣言的に定義できる
  - 依存しているリアクティブな値が変化したときだけ再計算される
- `v-html` ディレクティブで、文字列を生の HTML として描画できる
  - ユーザー入力をそのまま `v-html` に渡すと XSS の危険があるため、本来はサニタイズが必要
- `v-model` は内部的に `:value` と `@input` を組み合わせたシンタックスシュガー
  - 入力ごとに重い処理を実行したくない場合は、`v-model` を使わず `:value` と `@input` を分けて書き、`@input` 側で debounce などの制御を入れることができる
- `lodash-es` の `debounce` で、連続して発火するイベントを間引いて、最後の呼び出しから一定時間経過後にまとめて処理できる

## 気になったこと

-

## 参考

- [算出プロパティ | Vue.js](https://ja.vuejs.org/guide/essentials/computed.html)
- [テンプレート構文 | Vue.js - 生の HTML](https://ja.vuejs.org/guide/essentials/template-syntax.html#raw-html)
- [ビルトインのディレクティブ | Vue.js - v-html](https://ja.vuejs.org/api/built-in-directives.html#v-html)
- [例 | Vue.js - Markdown エディター](https://ja.vuejs.org/examples/#markdown)
- [marked - Markdown parser](https://marked.js.org/)
- [Lodash - debounce](https://lodash.com/docs/#debounce)
