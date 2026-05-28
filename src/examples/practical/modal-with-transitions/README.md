# Modal With Transitions

## 学んだこと

- `<Teleport>` を使うと、コンポーネントのテンプレートの一部を、DOM ツリー上のまったく別の場所にレンダリングできる
  - `to` 属性で挿入先を指定する（CSS セレクターまたは実際の DOM 要素を渡す）。例: `<Teleport to="body">` で `document.body` 直下に描画される
  - モーダル・トースト・ツールチップのように **「DOM 上は最上位に置きたいが、ロジック的にはコンポーネント内で管理したい」** UI に適している
  - 親側で `overflow: hidden` や `transform`、`z-index` の重なりに巻き込まれず、画面全体を覆う UI を確実に最前面に表示できる
  - DOM の位置は移動するが、コンポーネントツリー上は元の親の子のままなので、props / emits / provide/inject などはそのまま機能する
  - `disabled` プロパティで Teleport を一時的に無効化することもできる
- `<Transition>` は、要素やコンポーネントの **出現 / 消滅 / 切り替え** にアニメーションを付けるためのビルトインコンポーネント
  - `v-if` / `v-show` / 動的コンポーネント `<component :is="...">` / ルート要素の `key` 変更などをトリガーに発動する
  - 切り替え時に enter / leave それぞれ 6 つの CSS クラスが自動で付け外しされる
    - enter: `v-enter-from` → `v-enter-active` → `v-enter-to`
    - leave: `v-leave-from` → `v-leave-active` → `v-leave-to`
  - `name="modal"` のように `name` を指定すると、クラス名のプレフィックスが `v-` から `modal-` に変わる（例: `modal-enter-from`）
  - `*-active` クラスに `transition` / `animation` を書いておけば、`*-from` ↔ `*-to` 間の差分が補間されてアニメーションになる
  - 単一の要素・コンポーネントのみが対象。複数要素をアニメーションさせたいときは `<TransitionGroup>` を使う
- `<Teleport>` と `<Transition>` は組み合わせて使えるため、「body 直下に描画されるモーダル」に出現・消滅アニメーションを付けられる

## 気になったこと

-

## 参考

- [Teleport | Vue.js](https://ja.vuejs.org/guide/built-ins/teleport.html)
- [Transition | Vue.js](https://ja.vuejs.org/guide/built-ins/transition.html)
- [例 | Vue.js - モーダル](https://ja.vuejs.org/examples/#modal)
