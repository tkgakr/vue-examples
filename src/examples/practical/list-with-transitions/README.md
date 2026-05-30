# List With Transitions

## 学んだこと

- `<TransitionGroup>` は、**リスト内の複数の要素**の挿入・削除・並び替えにアニメーションを付けるためのビルトインコンポーネント
  - 単一要素が対象の `<Transition>` と異なり、`v-for` でレンダリングされる複数要素を同時にアニメーションできる
  - `tag` 属性で実際にレンダリングされるラッパー要素を指定する（例: `tag="ul"`）。指定しない場合はラッパー要素自体がレンダリングされない
  - リスト内の各要素には**一意で安定した `key`** が必須。`key` をもとに Vue が各要素の出現・消滅・移動を追跡する
  - enter / leave 時に付け外しされる 6 つのクラスに加えて、**`v-move`（例: `fade-move`）** クラスが用意されており、要素の**位置移動**そのものにトランジションをかけられる
- 位置移動のアニメーションは **FLIP（First, Last, Invert, Play）** という手法で実現されている
  - 移動前後の位置を計測し、`transform` で「移動前の位置」に一旦見せかけてから本来の位置へ遷移させることで、滑らかな並び替えアニメーションになる
  - `transform` を使うためレイアウトの再計算が走らず、パフォーマンスが良い
- 消滅する要素を `position: absolute` でレイアウトフローから外すのがポイント
  - そうしないと、消滅中の要素が場所を占有したままになり、残りの要素の移動アニメーション（FLIP）の計算がずれて不自然な動きになる

## 気になったこと

- `:key` に配列のインデックスではなく**要素そのもの（一意な値）**を使う必要がある
  - インデックスを key にすると挿入・並び替え時に key が振り直され、Vue が「同じ要素が移動した」と認識できず、アニメーションが正しく発火しない
- `lodash-es` の `shuffle` は内部で `Math.random` を使うため、テストで結果を固定したい場合は `Math.random` をモックする必要がある
  - Fisher-Yates の実装上、`Math.random` を `0` に固定すると並びが変わらないため、順序の変化を検証するには上端寄りの値を返すモックが必要

## 参考

- [TransitionGroup | Vue.js](https://ja.vuejs.org/guide/built-ins/transition-group.html)
- [例 | Vue.js - リストのトランジション](https://ja.vuejs.org/examples/#list-transition)
- [FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
