# Circle Drawer

## 学んだこと

- `shallowReactive<Circle[][]>([[]])` で履歴を浅いリアクティブにすると、配列そのものの差し替え（`push` や `length` 代入）は検知しつつ、各スナップショット内部までは追跡しないため Undo/Redo 履歴の保持に向いている。
- Undo/Redo は「`index`（現在位置）」と「`history`（スナップショットの配列）」で表現でき、`history.length = ++index` で未来側の履歴を切り捨ててから新しい状態を `push` するのが定番パターン。
- 状態を履歴へ保存するときは `clone`（`circles.map((c) => ({ ...c }))`）で値をコピーしないと、参照が共有されて過去の履歴まで書き換わってしまう。
- `v-for` には一意の `key` が必要で、要素自体に id がない場合はインデックス（`v-for="(circle, i) in circles" :key="i"`）を使う。
- `:fill="circle === selected ? '#ccc' : '#fff'"` のように、参照の一致で「選択中かどうか」を判定して見た目を切り替えられる。
- `@contextmenu.prevent` で右クリックの既定メニューを抑制しつつ、独自の処理（半径調整ダイアログの表示）を割り当てられる。
- `<script setup lang="ts">` で `interface Circle` を定義し、`ref<Circle[]>` / `ref<Circle>()` のように型を付けると、座標・半径を数値として安全に扱える。

## 気になったこと

- クリック座標に `clientX/clientY`（ビューポート基準）を使うと、SVG が画面左上に無いレイアウトでは円が描画位置とズレる。要素ローカル座標の `offsetX/offsetY` を使うと親レイアウトの余白に影響されない。
- `width: 100vw` はビューポート幅基準なので、サイドバーや余白のあるレイアウトでは右にはみ出す。親要素基準の `width: 100%` と `aspect-ratio: 1` にすると収まる。
- `selected` を `ref<Circle>()` にすると型は `Circle | undefined` になるため、クリアは `null` ではなく `undefined` を代入し、テンプレートでは `selected?.cx`（表示）や `selected!.r`（`v-if` 内で存在が保証される `v-model`）のように扱う。
- jsdom の `MouseEvent` では `offsetX/offsetY` が読み取り専用のため、テストでは `Object.defineProperty` で値を設定したイベントを `dispatchEvent` する必要がある。

## 参考

- [リアクティビティーAPI: ユーティリティ（shallowReactive） | Vue.js](https://ja.vuejs.org/api/reactivity-advanced.html#shallowreactive)
- [リストレンダリング | Vue.js](https://ja.vuejs.org/guide/essentials/list.html)
- [イベントハンドリング | Vue.js](https://ja.vuejs.org/guide/essentials/event-handling.html)
- [フォーム入力バインディング | Vue.js](https://ja.vuejs.org/guide/essentials/forms.html)
- [サンプル集（Circle Drawer） | Vue.js](https://ja.vuejs.org/examples/#circle-drawer)
