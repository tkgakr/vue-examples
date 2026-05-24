# Grid With Sort And Filter

## 学んだこと

- 再利用可能な子コンポーネント (`Grid.vue`) に `data` / `columns` / `filterKey` を props として渡し、親 (`GridWithSortAndFilter.vue`) は検索 UI と元データの保持だけを担当することで、責務を分離できる
- `computed` でソートとフィルターを派生値として宣言すれば、`searchQuery` や `sortKey` の変化に応じて自動的に再計算される
  - 元配列を破壊しないよう `data.slice().sort(...)` でコピーしてから sort する
- `<script setup lang="ts" generic="T extends ...">` の `generic` 属性で、SFC 自体をジェネリックコンポーネントにできる
  - `data: T[]` と `columns: (keyof T & string)[]` を連動させ、呼び出し側のデータ型に応じて columns の取りうる値が型推論される
  - ジェネリックの制約を `Record<string, string | number>` のように絞ると、内部の比較演算子 (`>`) もそのまま使えて `as never` のようなトリックが不要になる
- `v-for` を使う要素には必ず `:key` を付ける（差分検出効率と状態保持のため、ESLint の `vue/require-v-for-key` が検出する）
- `Array.prototype.reduce` で初期値 `{}` から型を推論させたい場合、`reduce<Record<string, SortOrder>>(...)` のように **メソッド側のジェネリック引数** で型を渡すと、コールバック内のオブジェクト操作が型エラーにならない

## 気になったこと

- ジェネリックコンポーネントは `@vue/test-utils` の `findComponent` の型推論が効かず、戻り値が `DOMWrapper<Node>` になってしまう
  - テストでは props 型を明示した `DefineComponent` 型にキャストして回避したが、より良い方法がないか調査したい
- `sortBy` は「クリックするとまず符号反転 → ソート」の順なので、初回クリックが降順になる
  - UX としては初回クリックを昇順にする実装の方が直感的かもしれない
- `Object.keys(row).some(...)` でフィルターしているため、列に含まれないキー（将来追加されるメタデータなど）にもマッチしてしまう
  - 厳密にやるなら `columns` の範囲だけで判定すべき

## 参考

- [例 | Vue.js - グリッドとソート、フィルタリング](https://ja.vuejs.org/examples/#grid)
- [算出プロパティ | Vue.js](https://ja.vuejs.org/guide/essentials/computed.html)
- [TypeScript と Composition API | Vue.js - ジェネリックなコンポーネントの型付け](https://ja.vuejs.org/guide/typescript/composition-api.html#generic-components)
- [リストレンダリング | Vue.js - key による状態の維持](https://ja.vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
