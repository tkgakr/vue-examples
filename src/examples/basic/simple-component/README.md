# Simple Component

## 学んだこと

- コンポーネントは `.vue` ファイル単位で定義し、`import` して別のコンポーネント内で使用できる
  - `<script setup>` では `import` するだけでテンプレート内のタグとして利用可能になる
- 親から子へデータを渡すには props を使う
  - 子側で `defineProps` を使って受け取る props を宣言する
  - `defineProps` はコンパイル時のマクロで `<script setup>` 内でのみ利用可能
  - `defineProps` で宣言した props はテンプレート内で直接参照できる
- 親から子へ props を渡すときは `v-bind`（省略形 `:`）を使う
  - 例: `<TodoItem :todo="item" />`
- `v-for` で子コンポーネントをループレンダリングする場合も、一意な `:key` を指定する
- 関連する複数ファイル（親・子コンポーネント）に分割することで、関心を分離できる

## 気になったこと

-

## 参考

- [コンポーネントの基礎 | Vue.js](https://ja.vuejs.org/guide/essentials/component-basics.html)
- [props | Vue.js](https://ja.vuejs.org/guide/components/props.html)
- [コンポーネントの登録 | Vue.js](https://ja.vuejs.org/guide/components/registration.html)