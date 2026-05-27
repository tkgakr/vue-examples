# Svg Graph

## 学んだこと

- SVG は HTML とは別の座標系で描画する。`<polygon>` の `points` に `x,y` の組を渡すと多角形を描画できる。
- `<text>` は SVG 内に文字を描画するための要素で、`x` / `y` 属性で表示位置を指定する。
- レーダーチャートの頂点は、中心から上方向に伸ばした点を三角関数で回転させることで求められる。
- `<style scoped>` の中から子コンポーネント内の SVG 要素にスタイルを当てる場合は `:deep()` を使う。
- `input[type="range"]` の値は文字列になり得るため、数値として扱いたい場合は `v-model.number` を使う。
- UI のテストでは、浮動小数点を含む SVG 座標の文字列完全一致を避け、数値に分解して近似比較する。

## 気になったこと

- `valueToPoint()` は `total` が 0 の場合に座標計算できないため、利用側で空配列を許すかどうかを明確にしたい。
- `label` を `v-for` の `key` にしているため、同じラベルを追加できる現在の仕様では key が重複する可能性がある。
- 公式サンプルのレイアウトは固定幅の `#demo` に依存しているため、レスポンシブ対応する場合は別途レイアウト調整が必要。

## 参考

- [SFC CSS 機能 | Vue.js - Deep セレクター](https://ja.vuejs.org/api/sfc-css-features.html#deep-selectors)
- [SVG 要素リファレンス | MDN](https://developer.mozilla.org/ja/docs/Web/SVG/Reference/Element)
- [text - SVG | MDN](https://developer.mozilla.org/ja/docs/Web/SVG/Reference/Element/text)
- [polygon - SVG | MDN](https://developer.mozilla.org/ja/docs/Web/SVG/Reference/Element/polygon)
- [フォーム入力バインディング | Vue.js - 修飾子](https://ja.vuejs.org/guide/essentials/forms.html#modifiers)
