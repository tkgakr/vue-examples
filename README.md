# Vue Examples

[Vue Examples](https://ja.vuejs.org/examples/) を Composition API、SFC、TypeScript で写経する学習用プロジェクトです。

このリポジトリは Mac ローカルでの学習用途を前提にし、外部公開や共同開発は想定していません。ブランチ運用も `main` のみとし、GitHub Actions や Dependabot などの GitHub 側の自動運用は使わず、必要な確認は手元で実行します。

## 構成

- Vue 3
- Vite
- TypeScript
- Vue Router
- ESLint / ESLint Stylistic
- Vitest / Vue Test Utils

## セットアップ

このプロジェクトでは npm と `package-lock.json` を使います。

```sh
npm ci
```

`.npmrc` で公開から 7 日未満のパッケージバージョンを避け、依存パッケージの lifecycle scripts は既定で無効化しています。新しい依存を追加するときは、パッケージと lockfile の差分を確認してから追加してください。

繰り返し使うツールは `npx` で都度取得せず、`devDependencies` に追加して lockfile で固定します。一度だけ実行する場合も `npx example-package@1.2.3` のように明示的なバージョンを指定してください。

## コマンド

日常的に使うコマンドは次の通りです。

```sh
npm run dev
npm run build
npm run check
```

| コマンド | 用途 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動します。 |
| `npm run build` | 型チェックしてから本番用にビルドします。 |
| `npm run preview` | ビルド済みアプリをローカルで確認します。 |
| `npm run test` | Vitest を一回だけ実行します。 |
| `npm run test:watch` | Vitest を監視モードで実行します。 |
| `npm run typecheck` | TypeScript / Vue の型チェックだけ実行します。 |
| `npm run lint` | ESLint で静的解析します。 |
| `npm run lint:fix` | ESLint で自動修正できる問題を修正します。 |
| `npm run check` | 型チェック、Lint、テストをまとめて実行します。 |

## 検証

通常は次のコマンドで確認します。

```sh
npm run check
npm run build
```

依存関係を追加・更新したときや、lockfile の差分を確認したいときだけ、必要に応じて次を実行します。

```sh
npm run check:supply-chain
npm run audit
npm run audit:signatures
npm run sbom
```

ローカル学習用としての依存関係の扱いは [SECURITY.md](./SECURITY.md) を参照してください。
