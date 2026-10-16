# StockLite 改修版 (2026-10-16)

既存のIndexedDB `stocklite` / `state` / `data` を継続使用。データベースの削除・初期化処理は追加していません。

## 機能
- 下部ナビの選択色同期
- 履歴編集・削除・保存期間設定（既存ユーザーは無期限、明示設定時に削除確認）
- 品目URLの追加・編集・リンク
- PWA manifest / service worker / アプリアイコン、iOS Safari画面調整、画像・手入力の代替導線

## GitHub Pages
1. 既存データを設定画面からJSON出力して保管する。
2. テストブランチに `index.html` `manifest.webmanifest` `sw.js` `icon-192.png` `icon-512.png` を同じ階層へ配置する。
3. HTTPS上でAndroid Chrome / iOS Safariでテストする。
4. 検証後に公開ブランチへマージする。キャッシュが古い場合はサイトデータ削除ではなく更新を試す（サイトデータ削除は在庫を消失させる）。

## iPhone
Safariで公開URLを開き、共有 → ホーム画面に追加。カメラが使えない場合はコード手入力または画像から読み取りを使用する。

## 保存
端末内IndexedDBへ自動保存。JSONエクスポート/インポートで手動バックアップ。AndroidとiOSの在庫は自動同期しません。

## テスト
`TEST_REPORT.md` 参照。実機検証は未実施。
