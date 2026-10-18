# StockLite 現行仕様・状態分類

調査日2026-10-18 JST。根拠: [資料一覧](docs/evidence/SOURCE_INVENTORY.md)、[試験記録](TEST_RESULTS.md)。これは既存仕様の整理であり、機能追加の承認ではない。

## システムと版の区別

StockLiteは数量・タグ中心の端末内在庫管理Webアプリ。うちストック/UchiStockやAndroidメモアプリの仕様を含めない。

| 対象 | コミット/BUILD | 位置づけ |
|---|---|---|
| 調査時GitHub main | `d2ddf7a27edb36dc8289c35486480163fd74e9fb` / v10.2-dev-fullframe-1 | 入口は独立診断ページ。在庫機能を呼ばない |
| 最後の正常動作基準 | v9、ソース参考`55131b330f5b56ce1844ab5512e4d44481e96ca0` | iPhone読取等のユーザー成功報告あり。報告ZIPと当該Gitソースのバイト一致はUNKNOWN |
| ローカル診断最新版 | v10.3-dev-first-read-1 / 開発ブランチ | カウントダウン・一致方式比較。対応する実機JSONなし |
| ローカル本体統合候補 | `1f396c1662a5e1179d08f9ca37ddea4d97074600` / v10.4.2-dev-surface-ready-1 | 起動準備待ち修正まで実装。修正後の実機受入は未確認 |

「最新のコード」「最後に動作報告のある版」「正式リリース」は別。現行Pagesの配信ブランチ・パス・デプロイIDはUNKNOWN。main内容から稼働中サイトの全状態は断定しない。

## 機能一覧と状態

| ID | 機能/操作 | 実装範囲 | 状態・検証範囲 |
|---|---|---|---|
| APP-01 | 品目登録・編集・削除、名称/タグ/コード検索 | v9・ローカル統合版 | IMPLEMENTED。今回の実IndexedDB/UI試験は未実施 |
| APP-02 | 購入/使用をスキャンし数量を確認・確定 | v9・ローカル統合版 | VERIFIEDはv9ユーザー報告の範囲のみ。統合版は模擬試験合格、実機未検証 |
| APP-03 | 未登録コードから品目登録へ | v9・統合版 | IMPLEMENTED。識別子は既存id、コードは検索キー |
| APP-04 | 品目URL、タグ、数量、履歴表示 | v9・統合版 | IMPLEMENTED。URLはhttp/httpsに制限 |
| APP-05 | 履歴編集/削除・保存期間設定 | v9・統合版 | IMPLEMENTED。履歴編集は現在庫を再計算しない |
| APP-06 | 手入力・画像読取 | v9・統合版 | IMPLEMENTED。標準カメラ写真の取込成功はユーザー報告、正確な対象ビルドはUNKNOWN |
| APP-07 | JSONバックアップ/復元 | v9・統合版 | IMPLEMENTED。復元は確認後の全件置換。今回本番バックアップ未取得 |
| APP-08 | PWA、ナビ選択色、iPhone表示調整 | v9・統合版 | IMPLEMENTED。PWA再起動のv9成功報告あり。統合版は実機未確認 |
| SCAN-01 | iOS html5-qrcode 2.3.8によるJAN-8/13/QR | v9、統合版の従来方式 | VERIFIEDはv9報告範囲。JAN認識の遅さはDEFECTとして継続 |
| SCAN-02 | Android BarcodeDetector、未対応時ZXing | v9・統合版 | IMPLEMENTED。Android正常の過去報告はあるが機種/実行エンジン/一致ソースはUNKNOWN |
| SCAN-03 | 全体映像→PNG→ZXing、連続2回一致 | main診断F、ローカル統合版 | VERIFIEDは診断FのJAN-13実測範囲。統合版はIMPLEMENTED、実機未検証 |
| SCAN-04 | iPhoneで従来方式へ切替 | ローカル統合版 | IMPLEMENTED、模擬試験合格 |
| SCAN-05 | start後、映像/canvas準備待ち→pause | v10.4.2統合候補 | IMPLEMENTED。v10.4.1のpause不具合は実機未閉鎖 |
| DIAG-01 | Aライブ/B写真/C静止フレーム比較 | main v10.2 | IMPLEMENTED、限定実測あり。AとCはエンジン・領域とも異なる |
| DIAG-02 | D同一PNGの両エンジン比較 | main v10.2 | VERIFIEDはJAN-13の測定範囲。同一の内部画素列までは保証しない |
| DIAG-03 | E同一フレーム全体/ライブ領域のZXing比較 | main v10.2 | VERIFIEDはJAN-13の測定範囲。切出しと縮小を単独分離していない |
| DIAG-04 | AF/zoom/解像度/fps/qrbox単独条件 | main v10.2 | IMPLEMENTED。能力非公開時は未対応、個別効果は未確定 |
| DIAG-05 | 3秒後開始、consecutive/window比較 | ローカルv10.3 | IMPLEMENTED、模擬合格。実機はUNKNOWN、本体採用はPROPOSED |
| SYNC-01 | 端末間自動同期・クラウド在庫DB | なし | 未実装。追加の確定仕様はないためPROPOSEDにもPLANNEDにも格上げしない |

確定した未実装のアプリ追加機能は、今回の証拠では確認できない。ロット、期限通知、買い物モード等を別プロジェクトから持ち込まない。

## 本体の画面・操作

- 在庫: 検索、数量、タグ、コード、編集、登録URLへのリンク。
- 品目編集: 品名、コード、タグ（カンマ区切り）、URL、数量、保存/削除/戻る。
- スキャン: 購入＋/使用−、変更数量（初期1）、カメラ、数量確認、手入力、画像入力、終了。iPhone統合候補だけ方式選択/再起動を追加済み。
- 数量確認は読取から分離。キャンセルは保存しない。使用で在庫不足なら確定しない。未登録はコードを引き継いで登録画面へ。
- 履歴: 最大300件を表示し、編集/削除可能。履歴編集・削除は現在庫に影響しない。
- 設定: 履歴保存期間（無期限/30/90/180/365日）、JSON入出力、バックアップ案内。
- 下部ナビは在庫/スキャン/履歴/設定。ホームダッシュボードやロット画面はStockLiteの確定仕様ではない。

## データ構造（main診断ページにはこのDB処理はない）

IndexedDB名`stocklite`、DB version=1、store=`state`、key=`data`。値は`{items, logs, settings:{retention}, version:2}`。JSON versionとIndexedDB versionを混同しない。

| データ | フィールドと制約 |
|---|---|
| 品目 | id(UUID文字列)、name、code(文字列)、url、tags(文字列配列)、quantity(0以上の安全な整数)。空でないcodeの重複禁止 |
| 履歴 | at(ISO日時)、type(create/edit/delete/buy/use)、id、name、before、after、delta(任意) |
| 設定 | retention=forever/30/90/180/365 |
| JSON復元 | version1/2を受理。40MiB以下、品目10万件/履歴50万件以下。ID/コード重複、数量、URL等を検査し確認後に置換 |
| 診断記録 | build、userAgent、rows、版によってerrors。rowsはmode/format/condition/時間/正否/カメラ情報等。コミットSHAは未記録 |

通常保存は端末内。自動同期はない。品目codeは本体データとして保存するが、診断JSONには認識文字列/期待値/画像を永続保存しない。

## 処理と例外

本体: カメラ/手入力/画像→handleCode→既知品目はpending→commitPending→数量/履歴更新→persist。未登録は編集へ。二重確定をscanBusyで抑止。購入/使用の保存失敗は数量・履歴を巻き戻す。

品目登録/削除や履歴保存を含む全書込みが同じ巻戻し保証を持つとは断定しない。該当実装のエラー経路は別途確認が必要。

診断main: ライブラリ読込→カメラ→A/B/C/D/E/F→メモリ上のrows→JSON手動出力。読取不可not-found、例外error、中断cancelled、期限timeoutを区別。古いログのnot-found-or-errorは分類不能。

## 対応環境・確定事項・未確定事項

想定はHTTPSのiPhone Safari/ホーム画面PWA、Android Chrome。デスクトップはlocalhostで構造確認可。特定の最低OS/機種保証はUNKNOWN。User-AgentのOS表記を実端末バージョンの確認とみなさない。

確定: 既存DB互換、数量確定別操作、Android経路保護、F方式の暫定継続、初回認識前からの統一計測、別オリジン試験、main無断反映禁止。

未確定: v10.4.2修正後の起動、JAN-8/QR回帰、最新Pages配信元、正常基準ZIPとGitの一致、iPhone機種、Android実行エンジン、速度差の単一原因、AF/ズーム個別効果、正式リリース版。詳細はROADMAP参照。
