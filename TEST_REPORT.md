# StockLite 2026-10-16 検証報告

## 実施済み
- 既存納品版 `index.html` の構造・IndexedDB名 `stocklite`、ストア `state`、キー `data` を確認。
- 変更後のインラインJavaScriptについて Node.js `--check` 構文検査：合格。
- PWA manifest、Service Worker、192/512pxアイコン生成済み。
- URL入力・リンク、履歴編集・保存期間、ナビ同期について既存改修コードを保持。
- Safari向けセーフエリア、タップ領域、文字入力サイズ、画像選択代替、カメラ停止処理を追加。

## 未検証
- Android Chrome / iOS Safari 実機でのUI、カメラ権限、連続読み取り、IndexedDB永続性、PWAインストール。
- Playwrightによるブラウザ回帰テスト（以前の環境ではERR_BLOCKED_BY_ADMINISTRATOR）。
- ZXingの画像読取の実機互換性、オフライン時の外部ZXing読み込み。
- GitHub現行HEADとの完全一致（git直接接続不可）。

## 既知の制約
- 既存履歴は削除前にJSONバックアップを作成すること。
- PWAシェルはオフライン動作するが、ZXingをオンライン取得できない場合、カメラ読み取り・画像読み取りは動作しないことがある。手入力は利用可能。
- iOS Safariとホーム画面追加版では保存領域が異なる場合がある。端末間自動同期はしない。
- 既存の履歴編集では履歴の数値と現在庫は再計算・同期されない。

## 公開判定
実機・ブラウザ動的テスト未完了のため本番上書きは保留。テストブランチで検証後に公開。
