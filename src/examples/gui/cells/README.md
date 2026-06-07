# Cells

## 学んだこと

- `reactive(...)` で 2 次元配列（`cells[列][行]`）を包むと、`cells[c][r] = value` のインデックス代入だけで画面に反映され、表計算の各セルを個別に管理できる。
- 数式セルは `{{ evalCell(cells[c][r]) }}` のようにテンプレートで関数を呼ぶだけで、`evalCell` 内部が参照した別セル（`cells[0][0]` など）も**そのセルの描画の依存として自動追跡**され、参照先を更新すると数式セルの表示も追従する。
- `evalCell` は `= A1 + B2` のようなセル参照を正規表現 `/\b([A-Z])(\d{1,2})\b/g` で抽出し、列文字を `charCodeAt(0) - 65` で 0 始まりの数値に変換して `get(列, 行)` 呼び出しへ置換している。
- 置換後の文字列は `new Function('get', 'return ...')(getCellValue)` で動的に関数化して評価でき、`get` 引数に値取得関数を渡すことでセル参照を解決している。
- `getCellValue` は参照先セルを再び `evalCell` で評価する**再帰構造**になっており、数式が数式を参照する連鎖も解決できる。
- `@vue:mounted="(vnode) => vnode.el.focus()"` で、編集モードに切り替えて `<input>` がマウントされた瞬間に自動フォーカスできる。
- `<script setup lang="ts">` では `defineProps<{ c: number; r: number }>()` の型ベース宣言で props を型付けでき、`required` やランタイムの型指定オブジェクトを書かずに済む。
- `cells: string[][]` のように共有ストアへ型を付けると、各セルが文字列（生の入力値）であることを明示でき、`evalCell` の戻り値 `number | string` と区別して扱える。

## 気になったこと

- `String.startWith` という API は存在せず、正しくは `String.startsWith`。タイプミスは型・Lint では検知されず、実行時に `is not a function` となって画面が表示されなくなる。
- `new Function` は文字列をコードとして評価するため `eval` 同様のリスクがあり、信頼できない入力をそのまま渡すのは危険。今回は学習用サンプルとして割り切っている。
- 数式評価が失敗したときは `try/catch` で握りつぶさず、`#ERROR ...` という文字列を返してセルに表示することで、ユーザーに不正な式を気づかせている。
- `cells` は store のモジュールレベルの共有状態なので、テストでは `beforeEach` で全セルを `''` に初期化しないと、前のテストの値が次のテストへ漏れる。
- `.js` から `.ts` へリネームすると、Vite の HMR が動的 import のモジュールグラフを追従できず、ブラウザが旧 `store.js` を要求して 404 になることがある。dev サーバー再起動とハードリロードで解消する。
- テンプレート内のアロー関数引数（`@vue:mounted` の `vnode` など）は型推論されず暗黙の `any` になるため、`VNode` 型を import して明示的に注釈する必要がある。

## 参考

- [リアクティビティーの基礎 | Vue.js](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [算出プロパティ | Vue.js](https://ja.vuejs.org/guide/essentials/computed.html)
- [props | Vue.js](https://ja.vuejs.org/guide/components/props.html)
- [TypeScript と Composition API | Vue.js](https://ja.vuejs.org/guide/typescript/composition-api.html)
- [サンプル集（Cells） | Vue.js](https://ja.vuejs.org/examples/#cells)
- [7GUIs: Cells](https://eugenkiss.github.io/7guis/tasks/#cells)
