# StockLite v9 iOS html5-qrcode 試験版

## 基準
- StockLite_v8_Diagnostic_TEST.zip を展開したものを基準に変更。
- 本番 GitHub HEAD との一致は未確認。**main への上書きは禁止**。

## 変更
- iPhone/iPad判定時のみ html5-qrcode 2.3.8 をCDNからロード。
- JAN-8 / JAN-13 / QR の認識、背面カメラ優先。
- 認識成功時は v8 の handleCode を再利用し、数量確認とIndexedDB保存を維持。
- カメラ停止、再入時のセッション無効化、ビルド表示を追加。
- Androidの既存 BarcodeDetector / ZXing 処理を保持。
- sw.js のキャッシュ名を変更。

## 検査結果
- JavaScript構文検査: node --check 合格。
- iPhone Safari / ホーム画面PWA: 未実施。
- Android Chrome: 未実施。
- GitHub HEADとの差分照合: 未実施。
- IndexedDBデータ保持実機試験: 未実施。

## 手動受入試験
1. **本番のJSONバックアップを取得**する。
2. 本番とは別のoriginでこのZIPをHTTPS公開する。GitHub Pagesの別パスだけではIndexedDBが共有される可能性がある。
3. iPhone Safariで「スキャン」を開き、診断表示が v9 でエンジンが html5-qrcode であることを確認する。
4. JAN-8、JAN-13、QRを各読み取り、登録済・未登録、数量確認、確定、保存を検査する。
5. 画面離脱・再入、権限拒否、手入力、画像読取、同一コードの再読み取りを検査する。
6. Androidで同じ試験を実施し、既存スキャナが動くことを確認する。
7. ブラウザ再起動後の在庫・履歴・URL・設定保持、JSONエクスポート／インポートを検査する。

## 留意事項
- html5-qrcodeはCDN依存。初回オフライン時にはロードできない場合がある。
- 認識精度とiOS Safari/PWAの実機動作は未確認。
- 問題発生時はテスト版を停止し、v8 ZIPに戻す。サイトデータは削除しない。
