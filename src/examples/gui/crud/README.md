# Crud

## 学んだこと

- `reactive<string[]>(...)` で配列をリアクティブにすると、`push` / `splice` / インデックス代入による変更が画面に反映される。
- `ref` は文字列や数値など単一の値を包むときに使いやすく、`script` 側では `.value` を通して読み書きする。
- `reactive` はオブジェクトや配列そのものをリアクティブにするときに使いやすく、今回の `names` のように `.value` なしで `names.push(...)` のように操作できる。
- `computed` で `prefix` に応じた絞り込み結果を定義すると、入力値が変わるたびに表示する `<option>` を自動で更新できる。
- `watch(selected, ...)` を使うと、選択中の名前が変わったタイミングで入力欄の `first` / `last` を同期できる。
- `v-model` は `<input>` だけでなく `<select>` にも使え、選択中の `<option>` の文字列を `selected` と双方向バインディングできる。
- `<script setup lang="ts">` で `ref<string>` や `reactive<string[]>` のように型を付けると、入力値や配列要素を文字列として扱える。
- テストでは `id` を付けて `wrapper.get('#first-name')` のように取得すると、HTML要素の並び順に依存せずに検証できる。

## 気になったこと

- `name.split(', ')` の結果は要素数が不足する可能性があるため、分割代入ではデフォルト値を用意しておくと安全。
- `indexOf` は見つからない場合に `-1` を返すため、更新・削除前にチェックしておく必要がある。
- `hasValidInput` は `first.value.trim() && last.value.trim()` のままだと文字列を返すため、`Boolean(...)` で真偽値に変換すると型が明確になる。
- `selected.value = first.value = last.value = ''` のような連続代入は JavaScript として有効だが、可読性とのバランスを考える必要がある。
- `button + button` は隣接兄弟セレクタで、2個目以降のボタンだけに左余白を付けられる。
- `clear: both` は `float` した `<select>` の横にボタン群が回り込まないようにするための指定。

## 参考

- [算出プロパティ | Vue.js](https://ja.vuejs.org/guide/essentials/computed.html)
- [ウォッチャー | Vue.js](https://ja.vuejs.org/guide/essentials/watchers.html)
- [フォーム入力バインディング | Vue.js](https://ja.vuejs.org/guide/essentials/forms.html)
- [リアクティビティーの基礎 | Vue.js](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [サンプル集（CRUD） | Vue.js](https://ja.vuejs.org/examples/#crud)
