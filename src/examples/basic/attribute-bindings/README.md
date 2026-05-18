# Attribute Bindings

## 学んだこと

- `v-bind` ディレクティブで要素の属性やプロパティをステートにリアクティブにバインドできる
- `v-bind:` は `:` に省略できる（例: `v-bind:title` → `:title`）
- `:class` へのバインドでは、単純な文字列に加えてオブジェクトや配列もサポートされている
  - 例: `:class="{ red: isRed }"` で、`isRed` が真のときだけ `red` クラスが付く
- `:style` へのバインドも、オブジェクトや配列をサポートしている
  - 例: `:style="{ color }"` の `{ color }` は JavaScript のオブジェクトショートハンドで `{ color: color }` と同義

## 気になったこと

-

## 公式との差分

- TypeScript 化
- Composition API / SFC 化

## 参考

- [クラスとスタイルのバインディング | Vue.js](https://ja.vuejs.org/guide/essentials/class-and-style.html)
- [テンプレート構文 - 属性バインディング | Vue.js](https://ja.vuejs.org/guide/essentials/template-syntax.html#attribute-bindings)
