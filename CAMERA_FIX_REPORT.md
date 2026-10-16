# StockLite iPhoneカメラ修正報告（2026-10-16）

## 修正
- iOS SafariでBarcodeDetectorがEAN-8/EAN-13/QRを全て提供しない場合、ZXingにフォールバック。
- ZXingの連続読み取りを`decodeFromVideoElementContinuously`へ変更。以前の`decodeOnceFromVideoElement`繰り返し呼び出しを廃止。
- 背面カメラを優先。videoにplaysinline / webkit-playsinline / autoplay / mutedを設定。
- カメラ権限拒否、カメラ未検出、カメラ使用中、非HTTPS、ZXing読込失敗のエラーを分離。
- カメラ終了時にMediaStream全トラックをstop、video srcObjectを解放、ZXingを停止。
- 画像からの読み取り、手動入力、読み取り後の在庫検索・数量確定処理は維持。
- Service Workerキャッシュ名を更新。旧バージョンのシェルキャッシュを削除する設計を維持。

## データ互換性
- IndexedDB: `stocklite` / store `state` / key `data` を変更していない。
- 既存の品目、履歴、設定のスキーマを変更していない。

## 検査結果
- JavaScript構文: 合格（Node.js `--check`）。
- コード検査: JAN-8、JAN-13、QR指定、ZXing連続処理、カメラ停止、エラー区別の実装を確認。
- iPhone Safari実機（JAN-8、JAN-13、QR）: 未実施。
- iOSホーム画面追加PWA実機: 未実施。
- Android Chrome実機回帰: 未実施。
- 実際のカメラ権限拒否試験: 未実施。
- 既存データ保持の実機試験: 未実施。

## 制約
- ZXingは初回利用時にCDNから読み込むため、ネット接続が必要。初回オフラインでは読み取り不可の場合がある。
- GitHub Pages公開版の最新コミットとの完全な差分照合は未実施。直前の納品済みPWA版を修正対象とした。
- 既存データ保護のため、公開前にJSONバックアップを取得すること。

## 公開方法
`index.html` と `sw.js` を既存GitHub Pages公開ディレクトリへ上書き。manifest.webmanifest とアイコンは同梱ファイルを維持。公開後にページを再読み込みし、PWAは完全終了後に再起動して更新を確認。
