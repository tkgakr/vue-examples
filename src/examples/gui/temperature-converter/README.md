# Temperature Converter

## 学んだこと

- 2 つの `ref`（摂氏・華氏）を用意し、一方が変わるともう一方を計算し直すことで双方向に連動する状態を作れる。
- `:value` での値のバインドと `@change` でのイベントハンドリングを組み合わせれば、`v-model` を使わずに入力と状態を同期できる。
- `<script setup lang="ts">` でイベントハンドラーの引数を `e: Event` と型付けし、`(e.target as HTMLInputElement).value` でキャストすることで型安全に入力値を取得できる。
- input の `value` は常に文字列なので、`Number(...)` で明示的に数値へ変換する必要がある。

## 気になったこと

- `e.target` の型が `EventTarget | null` のため、`value` へアクセスするには `HTMLInputElement` へのキャストが必要になる。
- テストでは input の並び順に依存しないよう、`id` を付与して `wrapper.get('#celsius')` のように特定すると壊れにくい。

## 参考

- [フォーム入力バインディング | Vue.js](https://ja.vuejs.org/guide/essentials/forms.html)
- [イベントハンドリング | Vue.js](https://ja.vuejs.org/guide/essentials/event-handling.html)
