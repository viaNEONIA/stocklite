# StockLite v10.4.2-dev

数量・タグ中心の端末内在庫管理Webアプリ。GitHubへ手動アップロードしてmainを作成するためのソース・管理文書一式です。**ルートのindex.htmlは在庫アプリ本体**です。診断専用ページではありません。

## アップロード

1. ZIPを展開し、**index.htmlがリポジトリ直下になるように中身一式をアップロード**する。ZIPそのものや外側のフォルダーだけをアップロードしない。
2. 新しいリポジトリではmainとして初回コミットする。既存リポジトリを使う場合はバックアップを取り、既存ファイルとの差分を確認する。以前の診断用diagnostic.js/paired.js/continuous.js等はこの配布物に含まれず、本体の必須ファイルでもない。既存の不要ファイル削除は今回自動実施しない。
3. 公開する場合、GitHub Pagesの配信元をmainの/(root)に設定する。こちらからのGitHubアップロード・main作成・公開操作は行っていない。
4. 公開URLのindex.htmlをSafari/Chromeで開く。画面上部がv10.4.2-devなら本体。更新確認用のstocklite-v10-4-2.htmlも同じ内容。

## 利用

在庫から品目を登録し、スキャンで購入/使用を選択。認識後に数量を確認して「確定」で保存。iPhoneの標準候補は全体映像ZXing・連続2回確認で、従来方式へ切替可能。手入力/画像入力、履歴、JSONバックアップもあります。

データはIndexedDB stocklite/state/dataへ保存。端末間の自動同期なし。既存データのJSONバックアップを先に取得し、サイトデータを消去しない。同一GitHub Pagesオリジンの別パス/別リポジトリではDBが共有される場合がある。未検証版は別オリジンで試験する。

## 実行・確認

ビルド不要。カメラにはHTTPSまたはlocalhostが必要。初回オンラインでhtml5-qrcode 2.3.8とZXing 0.21.3をCDNから取得。PWA用manifest、SW、アイコンを同梱。

PC構造確認はpython3 -m http.server 8000を起動しlocalhostへ接続。iPhoneからLANのHTTPではカメラ試験をしない。

**コードはv10.4.2のまま再配置し、機能変更なし。構文/元の模擬試験は合格、v10.4.2の実機受入は未確認。** mainへの格納は正式リリース検証済みという意味ではありません。

## 管理文書

[開発ルール](AGENTS.md) / [仕様](SPEC.md) / [構成](ARCHITECTURE.md) / [試験計画](TEST_PLAN.md) / [試験記録](TEST_RESULTS.md) / [変更履歴](CHANGELOG.md) / [計画](ROADMAP.md) / [ファイル出所](PACKAGE_MANIFEST.json)。

[以前の管理移行記録](docs/history/baseline-20261018/README.md)は調査当時のGitHub mainがv10.2診断ページだった事実を保存した履歴です。今回の配布物の入口とは区別してください。
