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


## Android OCR追加（v10.5.0-dev）

index.html → ocr-name.js → 必要時Tesseract.js 5.1.1 worker（jpn/eng）→ canvas切抜き → 行候補 → 品名の下書き。Tesseract.js / core 5.1.1はjsDelivr、モデルはtessdata.projectnaptha.com/4.0.0。写真を送るAPIは使用しない。ローカルocr-name.jsをSW shellに追加、cache名を更新。index.htmlの更新版はv10.5.0-dev。stocklite-v10-4-2.htmlは旧版入口として保持し同一内容ではなくなる。旧版と現行は同じDBを共有する。


## v10.5.1-dev OCR精度改善候補（2026-10-25）

ユーザーから写真OCRの認識精度不良の報告。対象写真・正解文字・誤認識結果は未取得で、原因を画像縮小だけに断定しない。元画像の先行1600px縮小を廃止し、選択範囲を元画素から切り出して最大辺2400px（小さい画像は最大2倍）へ変換。プレビュー1600pxと解析画像を分離。Tesseractの文字配置を疎な文字向けPSM 11に設定。写真外部送信なしを維持。元画像展開のメモリ負荷が増える可能性あり。実写真の改善率/速度/メモリは未検証。
