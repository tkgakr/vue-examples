/**
 * レーダーチャートの各頂点の座標（x, y）を計算する関数。
 *
 * 値の大きさを「中心からの距離」に対応させ、index/total から決まる角度方向に
 * 配置することで、SVG 上にレーダーチャート用のポイントを生成する。
 *
 * 座標系は SVG のものに合わせており、中心 (100, 100) を基準にした
 * 200x200 のビューポートを想定している。
 *
 * @param {number} value - 頂点の値（0〜100 程度を想定）。大きいほど中心から遠ざかる。
 * @param {number} index - 頂点のインデックス（0 始まり）。
 * @param {number} total - 頂点の総数。多角形の辺の数に相当する。
 * @returns {{ x: number, y: number }} SVG 上に描画する座標。
 */
export function valueToPoint(value, index, total) {
  // 回転前の基準点。常に Y 軸上の「真上」方向に置く。
  // x = 0 とし、y を負の値（SVG では上方向）にすることで頂点を真上に取る。
  const x = 0
  // 値が大きいほど中心から離れた位置になる。0.8 は描画スケールの調整係数。
  // 中心点が (x:100, y:100) 半径r:80 の円の中に描画するので、
  // value が 100 の時、円周上にプロットされる。
  const y = -value * 0.8

  // index 番目の頂点に対応する角度（ラジアン）。
  // 一周（2π）を total 等分し、その index 倍を取ることで均等配置する。
  const angle = ((Math.PI * 2) / total) * index
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  // 基準点 (x, y) を原点まわりに angle だけ回転させる回転行列の適用。
  //   x' = x * cos(θ) - y * sin(θ)
  //   y' = x * sin(θ) + y * cos(θ)
  // 最後に +100 することで SVG ビューポート中心 (100, 100) へ平行移動する。
  const tx = x * cos - y * sin + 100
  const ty = x * sin + y * cos + 100

  return {
    x: tx,
    y: ty,
  }
}
