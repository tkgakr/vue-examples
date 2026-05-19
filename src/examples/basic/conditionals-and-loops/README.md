# Conditionals And Loops

## 学んだこと

- `v-if` ディレクティブで条件付きレンダリングが行える
  - `v-else` / `v-else-if` を組み合わせて分岐できる
  - 条件が偽の場合、要素は DOM から削除される
- `v-for` ディレクティブで配列やオブジェクトをループしてレンダリングできる
  - `v-for="item of list"` または `v-for="item in list"` の構文が使える
  - `v-for="(item, index) of list"` で添字も取得できる
- `v-for` を使う要素には一意な `:key`（`v-bind:key` の省略形）を指定する
  - Vue が各ノードを追跡・再利用するために必要
  - 並び替えなどで意図しない描画を避けられるため、配列のインデックスではなく一意な値を使うのが望ましい
  - `:key` に使える型は `string | number | symbol` のいずれか
    - オブジェクトを渡すとコンソールに警告が出る

## 気になったこと

-

## 参考
- [条件付きレンダリング | Vue.js](https://ja.vuejs.org/guide/essentials/conditional.html)
- [リストレンダリング | Vue.js](https://ja.vuejs.org/guide/essentials/list.html)
- 