# Counter

## 学んだこと

- `ref` で宣言したリアクティブな状態をテンプレートに展開できる。
- テンプレート内では `count++` のようなインラインハンドラーで `ref` の値を直接更新でき、`.value` は不要。
- 状態が更新されると、その値を参照しているテンプレートが自動的に再レンダリングされる。

## 気になったこと

-

## 参考

- [リアクティビティーの基礎 | Vue.js](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [イベントハンドリング | Vue.js](https://ja.vuejs.org/guide/essentials/event-handling.html)
