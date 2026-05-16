# Vue Examples

[Vue Examples](https://ja.vuejs.org/examples/) を Composition API、SFC、TypeScript で写経する学習用プロジェクトです。

このリポジトリは Mac ローカルでの学習用途を前提にし、外部公開や共同開発は想定していません。ブランチ運用も `main` のみとし、GitHub Actions や Dependabot などの GitHub 側の自動運用は使わず、必要な確認は手元で実行します。

## 構成

このプロジェクトは、Vue 公式サンプルを 1 課題 1 ディレクトリで実装し、Vue Router で一覧と各課題ページをつなぐ構成です。

```text
src/
├── examples/                       # 課題ごとの実装・テスト・学習メモ置き場
│   └── basic/
│       └── hello-world/            # Hello World 課題の実装例（新課題はこの形に合わせる）
├── pages/
│   └── Home.vue                    # exampleRoutes をカテゴリ別に表示するホーム画面
├── router/
│   └── index.ts                    # 課題ページのルート定義（追加するとホーム一覧にも反映）
├── App.vue                         # アプリ全体のレイアウトとルーター表示枠
└── style.css                       # 全体スタイル＆課題ページ共通の見た目
```

主な技術要素は次の通りです。

- Vue 3 / Composition API / SFC
- Vite
- TypeScript
- Vue Router
- ESLint / ESLint Stylistic
- Vitest / Vue Test Utils

## 課題の追加手順

`Hello World` がある `src/examples/basic/hello-world/` と同じ並びに、次の課題として `Handling User Input` を追加する場合の手順です。

1. 課題用ディレクトリを作成します。

   ```sh
   mkdir -p src/examples/basic/handling-user-input
   ```

2. 課題コンポーネントを作成します。

   ```text
   src/examples/basic/handling-user-input/HandlingUserInput.vue
   ```

   既存の `HelloWorld.vue` と同じように、`<script setup lang="ts">`、`<template>`、必要なら `<style scoped>` で構成します。

3. 必要に応じてテストを作成します。

   ```text
   src/examples/basic/handling-user-input/HandlingUserInput.test.ts
   ```

   Vue Test Utils の `mount` を使い、画面表示や入力操作で変わる状態を確認します。

4. 学習メモを作成します。

   ```text
   src/examples/basic/handling-user-input/README.md
   ```

   学んだこと、気になったこと、公式との差分を記録します。

5. `src/router/index.ts` の `exampleRoutes` にルートを追加します。

   ```ts
   {
     path: '/basic/handling-user-input',
     component: () => import('@/examples/basic/handling-user-input/HandlingUserInput.vue'),
     meta: { category: 'Basic', title: 'Handling User Input' },
   },
   ```

   `Home.vue` は `exampleRoutes` を読み取って一覧を作るため、ここへ追加するとホーム画面にも自動で表示されます。

6. 動作確認します。

   ```sh
   npm run check
   npm run build
   ```

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
