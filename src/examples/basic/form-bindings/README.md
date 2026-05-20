# Form Bindings

## 学んだこと

- `v-model` ディレクティブで、フォーム入力要素とステートとの間に双方向バインディングを作成できる
- 入力タイプごとの挙動
  - テキスト / テキストエリア: 文字列にバインド
  - 単一チェックボックス: 真偽値（boolean）にバインド
  - 複数チェックボックス: 同じステート（配列）にバインドすると、チェックされた `value` の配列になる
  - ラジオ: 選択された `value` が文字列としてバインドされる
  - 単一セレクト: 選択された `option` の値が文字列としてバインドされる
  - 複数セレクト（`multiple`）: 選択された値の配列にバインドされる
- セレクトの最初に `disabled` で空の `<option>` を置くと、プレースホルダーとして利用できる
- `v-model` には修飾子（modifiers）が用意されている
  - `.lazy`: `input` ではなく `change` イベント後に同期する
  - `.number`: 入力を自動で数値に型変換する（`type="number"` のときは自動適用）
  - `.trim`: 入力の前後の空白を自動で取り除く

## 気になったこと

-

## 参考

- [フォーム入力バインディング | Vue.js](https://ja.vuejs.org/guide/essentials/forms.html)
- [ビルトインのディレクティブ | Vue.js - v-model](https://ja.vuejs.org/api/built-in-directives.html#v-model)
