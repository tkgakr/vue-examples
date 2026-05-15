# Vue Examples

[Vue Examples](https://ja.vuejs.org/examples/) を Composition API、SFC、TypeScript で写経する学習用プロジェクトです。

## 構成

- Vue 3
- Vite
- TypeScript
- Vue Router
- ESLint / Prettier
- Vitest / Vue Test Utils

## セットアップ

このプロジェクトでは npm と `package-lock.json` を使います。

```sh
npm ci
```

`.npmrc` で依存パッケージの lifecycle scripts は既定で無効化しています。新しい依存を追加するときは、パッケージと lockfile の差分を確認してから追加してください。

繰り返し使うツールは `npx` で都度取得せず、`devDependencies` に追加して lockfile で固定します。一度だけ実行する場合も `npx example-package@1.2.3` のように明示的なバージョンを指定してください。

## コマンド

```sh
npm run dev
npm run build
npm run check
```

## 検証

```sh
npm run build
npm run check
npm run audit
npm run audit:signatures
```

サプライチェーン対策の運用ルールは [SECURITY.md](./SECURITY.md) を参照してください。
