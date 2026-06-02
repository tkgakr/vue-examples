# Flight Booker

## 学んだこと

- `computed` で「往復便かどうか（`isReturn`）」「予約可能か（`canBook`）」といった派生状態を宣言的に組み立てられる。
- `:disabled="!isReturn"` や `:disabled="!canBook"` のように `computed` を属性へ直接バインドすることで、状態に応じた入力欄・ボタンの活性/非活性を表現できる。
- `<script setup lang="ts">` で `ref<FlightType>('one-way flight')` のようにユニオン型を指定すると、`select` の値が型で守られる。
- 日付は `<input type="date">` の文字列（`YYYY-MM-DD`）でやり取りするため、比較するには `Date` へ変換するヘルパーが必要になる。
- 文字列を数値に変換するときは `+y` や `+m` のように単項プラスで明示的に変換しておくと型が安定する。

## 気になったこと

- 復路日が往路日「以前」だと予約不可になる（同日も不可）。境界値（同日・翌日）はテストで押さえておくと安心。
- `<input type="date">` の `value` は常に文字列なので、`new Date(+y, +m - 1, +d)` のように月を 0 始まりへ補正する必要がある。
- テストでは input の並び順に依存しないよう、`id`（`#departure-date` / `#return-date`）を付与して特定すると壊れにくい。

## 参考

- [算出プロパティ | Vue.js](https://ja.vuejs.org/guide/essentials/computed.html)
- [属性バインディング | Vue.js](https://ja.vuejs.org/guide/essentials/template-syntax.html#attribute-bindings)
- [フォーム入力バインディング | Vue.js](https://ja.vuejs.org/guide/essentials/forms.html)
- [サンプル集（Flight Booker） | Vue.js](https://ja.vuejs.org/examples/#flight-booker)
