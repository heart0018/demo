# Vercel Deployment Guide

## 🚀 Vercelにデプロイする方法

### 1. Vercelアカウントの準備
- [Vercel](https://vercel.com)にアクセス
- GitHubアカウントでサインアップ

### 2. プロジェクトのデプロイ

#### 方法1: Vercel CLIを使用
```bash
# Vercel CLIのインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ
vercel --prod
```

#### 方法2: Git連携（推奨）
1. GitHubリポジトリを作成
2. コードをプッシュ
3. Vercelダッシュボードで「New Project」
4. GitHubリポジトリを選択
5. 自動デプロイ設定完了

### 3. 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定：

```
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_API_URL=your_backend_api_url
VITE_DEV_MODE=false
```

### 4. Google OAuth設定

Google Cloud Consoleで：
1. OAuth 2.0 Client IDを作成
2. 承認済みオリジンにVercelのURLを追加
3. Client IDを環境変数に設定

### 5. ビルド設定

Vercelは自動的に以下を実行：
- `npm install`
- `npm run build`
- `dist/`フォルダからサーブ

### 6. カスタムドメイン（オプション）

Vercelダッシュボードで独自ドメインを設定可能

## 📦 デプロイ前のチェックリスト

- [ ] Google OAuth Client IDの設定
- [ ] 環境変数の設定
- [ ] ビルドエラーの確認 (`npm run build`)
- [ ] ESLintエラーの修正 (`npm run lint`)
- [ ] レスポンシブデザインの確認

## 🔧 トラブルシューティング

### ビルドエラー
```bash
# ローカルでビルドテスト
npm run build
npm run preview
```

### 環境変数が読み込まれない
- 変数名が`VITE_`で始まっているか確認
- Vercelダッシュボードで正しく設定されているか確認

### OAuth認証エラー
- Google Cloud Consoleで承認済みオリジンを確認
- Client IDが正しく設定されているか確認
