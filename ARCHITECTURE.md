# 本配布物の構成

| パス | 役割 |
|---|---|
| index.html | 在庫アプリ本体、UI/IndexedDB/読取コードを内包 |
| stocklite-v10-4-2.html | index.htmlと同一の更新確認用入口 |
| ios-fullframe.js | index内にも同内容を埋め込んだiOSモジュールの参照ソース。実行時に別読込しない |
| manifest.webmanifest / sw.js / icon-*.png | PWA資産 |
| 管理MD8種 / PACKAGE_MANIFEST.json | 現在の配布構成と出所/ハッシュ |
| docs/history | 元の管理文書・統合候補README。原文を履歴として保持 |
| tests/legacy | 元の模擬テスト。配置/参照Git履歴依存あり |

ビルド不要。HTTPSルートへ配置しindex.htmlを開く。Pagesはmainの/(root)を利用する想定。既存配信設定をこちらで変更したわけではない。

iOS: html5-qrcode 2.3.8で取得→video/canvas準備確認→pause(false)→自然解像度全体canvas→PNG Blob→ZXing 0.21.3 decodeFromImageUrl→別フレーム連続2回一致→handleCode。未登録は編集、登録済みはpending→数量確定→persist→IndexedDB。Androidはv9既存分岐を保持。

外部依存はjsDelivrのhtml5-qrcode 2.3.8と@zxing/library 0.21.3。初回オフラインのカメラ解析は保証しない。ブラウザのMediaDevices/video/canvas/Blob/IndexedDB/ServiceWorkerを利用する。package.jsonやコンパイル環境は不要。SWはstocklite-ios-candidate-接頭辞のキャッシュを扱い、同じスコープでPWA資産を取得する。

コードは元のios-candidateのバイトコピー。過去の診断main用indexやdiagnostic.js/paired.js/continuous.jsは本配布物へ混ぜない。原本JSONや写真も含めない。過去のリポジトリ状態はdocs/historyでのみ説明する。
