# Swipe App

「なんとなく開いたら、なんとなくやることが決まる」意思決定のきっかけを与えるWebサービス

## 🎯 アプリの概要

Swipeは、スワイプ操作で簡単に今日の行動を決められるWebアプリケーションです。食事、外出、エンターテイメントなど、様々なカテゴリから直感的に選択できます。

## 🚀 主な機能

- **スワイプ操作**: 左右スワイプで簡単に選択
- **地域選択**: 7つの地域から選択可能
- **カテゴリ別提案**: 食べる/飲む、でかける、休む（アニメ・ドラマ）
- **マイリスト**: 気になったアイテムを保存・管理
- **外部リンク**: Google Maps、Netflix、Amazon Primeなどに直接アクセス

## 🛠️ 技術構成

- **フロントエンド**: React + Vite
- **UI**: Lucide React (アイコン)
- **認証**: Google OAuth 2.0
- **スタイリング**: CSS
- **デプロイ**: Vercel

## 📦 インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## 🌐 使用方法

1. **ログイン**: Googleアカウントまたはデモログインでアクセス
2. **地域選択**: 住んでいる地域を選択
3. **カテゴリ選択**: 食べる/飲む、でかける、休むから選択
4. **スワイプ**: 提案されたカードを左右にスワイプ
5. **マイリスト**: 保存したアイテムを後から確認

## 🎨 画面構成

- **ログイン画面**: Google OAuth認証
- **ホーム画面**: ナビゲーション付きメイン画面
- **気分選択画面**: カテゴリ別の詳細選択
- **スワイプ画面**: カード形式の提案画面
- **マイリスト画面**: 保存したアイテムの一覧

## 🔧 開発

```bash
# 開発サーバー起動
npm run dev

# ESLint実行
npm run lint

# ビルド
npm run build

# プレビュー
npm run preview
```

## 🚀 デプロイ

Vercelを使用してデプロイ：

```bash
# Vercel CLIインストール
npm install -g vercel

# デプロイ
vercel --prod
```

## 📝 今後の拡張予定

- バックエンド（Rails API）との連携
- データベース（MySQL）との連携
- より多くのデータ（2,340件の提案アイテム）
- 機械学習による提案精度向上
- ユーザーの好みに基づく学習機能

## 📄 ライセンス

MIT License+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# demo
