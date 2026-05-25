# Tree View

## 学んだこと

- コンポーネントは自分自身を再帰的にレンダリングできる（再帰コンポーネント）
  - `<script setup>` ではファイル名から自動で名前が解決されるため、`name` オプションを書かなくても `<TreeItem>` をテンプレート内で参照できる
  - 終了条件（今回は `v-if="isFolder"`）を必ず置かないと無限再帰してスタックオーバーフローになる
- Props は一方向データフローのため、子コンポーネントから直接書き換えると ESLint の `vue/no-mutating-props` で警告される
  - `props.model.children = []` のようなネストしたプロパティの代入や `push` も検出対象
  - `defineModel<T>()` を使うと、内部で `modelValue` prop と `update:modelValue` emit が自動定義され、返り値の ref を介して双方向バインディングできる
  - 親側は `v-model="..."` で受け渡す
- 再帰コンポーネントでも `v-model` がそのまま使える
  - `v-model="model.children![index]"` のように配列要素にバインドすると、子で変更したノードがそのまま親側のデータに反映される
- 同じ型定義を複数の SFC から参照する場合は、`types.ts` のような独立ファイルに切り出して `import type` するのが DRY
- テンプレート内の `v-for` のループ変数名が外側のスコープ（props など）と衝突すると、Volar の型推論が壊れて暗黙の `any` になる
  - `v-for="model in model.children"` のようなシャドウは避け、`child` などにリネームする

## 気になったこと

- `defineModel` は ref を返すが、`.value.children = []` のように **ref が指すオブジェクトの中身を書き換える** ことに変わりはないので、概念的には親のデータを破壊的に変更している
  - 厳密に一方向データフローを守るなら、変更を emit でイベントとして表現し、ルートで一括して新しいツリーを組み立てる設計の方がきれい
- `v-if="isFolder"` で `children` の存在が保証されていても、テンプレートの型推論は narrowing できず `model.children![index]` のように非 null アサーションが必要になる
  - `computed` で `children` を切り出せばアサーション不要にできるが、行数とのトレードオフ
- `v-for` の `:key` にインデックスを使っているため、途中にノードを挿入すると key の振り直しが発生して状態（`isOpen` など）が意図せず引き継がれる可能性がある
  - ノードに安定した id を持たせて key にするのが理想

## 参考

- [例 | Vue.js - ツリービュー](https://ja.vuejs.org/examples/#tree)
- [コンポーネントの登録 | Vue.js - 再帰的なコンポーネント](https://ja.vuejs.org/guide/components/registration.html#component-name-casing)
- [コンポーネントの v-model | Vue.js - defineModel()](https://ja.vuejs.org/guide/components/v-model.html)
- [Props | Vue.js - 単方向データフロー](https://ja.vuejs.org/guide/components/props.html#one-way-data-flow)
- [eslint-plugin-vue - vue/no-mutating-props](https://eslint.vuejs.org/rules/no-mutating-props.html)
