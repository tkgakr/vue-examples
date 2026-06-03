# Elapsed Timer

## 学んだこと

- `requestAnimationFrame` を使うと、ブラウザの描画タイミングに合わせて状態を更新できる。
- `requestAnimationFrame(update)` は `update` を即時実行するのではなく、次の描画直前に 1 回だけ実行するよう予約する。
- `performance.now()` は高精度な時刻をミリ秒で取得できるため、開始時刻との差分から経過時間を計算しやすい。
- `computed` で `elapsed / duration` を計算し、`Math.min(..., 1)` で `progress` に渡す進捗率を 0 から 1 の範囲に収められる。
- `<input type="range">` の `v-model` は文字列になり得るため、数値として扱いたい場合は `v-model.number` を使う。
- アニメーションフレームの ID は `number | undefined` で保持し、`cancelAnimationFrame` の前に存在確認すると型安全に後始末できる。

## 気になったこと

- `update` の中で次回の `requestAnimationFrame` を予約しているが、これは直接再帰ではないためビジーループにはならない。
- `Reset` を連続で押したときに古いフレーム予約が残ると更新が多重化するため、リセット前に既存の予約を取り消す必要がある。
- コンポーネントを離れた後も予約済みのフレームが残らないよう、`onUnmounted` でキャンセルする。
- 経過時間が設定時間を超えた場合、表示される秒数は実際の経過時間のままだが、進捗率は `1` で止めている。
- テストでは `performance.now` と `requestAnimationFrame` をスタブ化すると、時間経過を決定的に検証できる。

## 参考

- [サンプル集（Timer） | Vue.js](https://ja.vuejs.org/examples/#timer)
- [算出プロパティ | Vue.js](https://ja.vuejs.org/guide/essentials/computed.html)
- [フォーム入力バインディング | Vue.js](https://ja.vuejs.org/guide/essentials/forms.html)
- [window.requestAnimationFrame() | MDN](https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame)
- [performance.now() | MDN](https://developer.mozilla.org/ja/docs/Web/API/Performance/now)
