import { reactive } from 'vue'
// スプレッドシートの列数（A〜E の 5 列）と行数（20 行）を定義
const COLS = 5
const ROWS = 20

// 全セルの値を保持する 2 次元配列を reactive で生成する。
// cells[列][行] の形でアクセスでき、値が変わると Vue が自動で再描画する。
// 初期値は全セル空文字（''）。各セルは文字列（数式や値）を保持する。
export const cells: string[][] = reactive(
  Array.from(Array(COLS).keys()).map(() =>
    Array.from(Array(ROWS).keys()).map(() => '')),
)

// 数式内の get(列, 行) として渡される、セル値取得関数の型。
type CellGetter = (c: number, r: number) => number | string

// adapted from https://codesandbox.io/s/jotai-7guis-task7-cells-mzoit?file=/src/atoms.ts
// by @dai-shi
// セルの入力値（exp）を評価して表示すべき値を返す関数。
export function evalCell(exp: string): number | string {
  // 先頭が '=' でなければ数式ではないので、入力値をそのまま返す。
  if (!exp.startsWith('=')) {
    return exp
  }

  // 数式の場合: セル参照（A1, B2 など）を get(列,行) の関数呼び出しに変換する。
  // 例) = A1 + B2 ---> get(0,1) + get(1,2)
  const code = exp
    .slice(1) // 先頭の '=' を取り除く
    .replace(
      // 「アルファベット1文字 + 1〜2桁の数字」のセル参照を正規表現で抽出
      /\b([A-Z])(\d{1,2})\b/g,
      // 列文字を 0 始まりの数値（A=0, B=1, ...）に変換して get(列,行) を生成
      (_, c: string, r: string) => `get(${c.charCodeAt(0) - 65},${r})`,
    )

  try {
    // 変換後の式を関数として動的に生成・実行する。
    // get 引数に getCellValue を渡すことで、参照セルの値を取得できる。
    return new Function('get', `return ${code}`)(getCellValue) as number | string
  } catch (e) {
    // 構文エラーや循環参照などで失敗した場合はエラー文字列を返す。
    return `#ERROR ${e}`
  }
}

// 指定した列(c)・行(r)のセルの値を取得する。数式内の get() として使われる。
const getCellValue: CellGetter = (c, r) => {
  // 参照先セルも数式の可能性があるため、再帰的に evalCell で評価する。
  const val = evalCell(cells[c][r])
  // 数値に変換できる場合は数値として、できない場合は文字列のまま返す。
  const num = Number(val)
  return Number.isFinite(num) ? num : val
}
