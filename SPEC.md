# StockLite v10.4.2-dev 仕様

この配布物はv10.4.2統合候補本体をmain初回配置用にまとめたもの。正本はviaNEONIA/stocklite。初回配置コミットは3cab471af4d7c2fb8c3bb261288d37a5f5bbfee1。v10.4.2-devはiPhone Safari/PWAの項目1〜6がユーザー報告で合格。確認範囲と環境情報の不足は[試験記録](TEST_RESULTS.md)参照。全実機受入は未完了。詳しい既存仕様・状態一覧は[移行時仕様](docs/history/baseline-20261018/SPEC.md)を参照。そちらのmain=v10.2という記載は当時の観測である。

| 機能 | 本配布物での状態 |
|---|---|
| 品目登録/編集/削除、名称/タグ/コード検索、URL | IMPLEMENTED |
| 購入/使用→数量確認→確定→在庫/履歴保存 | IMPLEMENTED。v9ユーザー報告と元配置での模擬合格あり、iPhone Safari/PWAの数量確定・保存・再起動はVERIFIED（ユーザー報告）。購入/使用双方など未個別確認の分岐は未検証 |
| 未登録コード→登録画面、手入力、写真入力 | IMPLEMENTED |
| 履歴編集/削除/保存期間、JSON入出力 | IMPLEMENTED。履歴編集は現在庫を変えない |
| iOS全体映像ZXing、別フレームで連続2回/1秒以内 | IMPLEMENTED。診断FのJAN13実測はあるが本体のJAN8/13/QR読取→数量確認はVERIFIED（ユーザー報告）。2回一致/1秒内部条件の実機計測は未実施 |
| iOS従来html5方式への切替、再起動 | IMPLEMENTED、模擬検証のみ |
| Android BarcodeDetector全3形式対応時採用、他はZXing | IMPLEMENTED。v9分岐を保持、統合版回帰未実施 |
| PWA、保存後の再起動 | IMPLEMENTED。iPhone PWAの起動・読取・数量確定・再起動後保持はVERIFIED（ユーザー報告）。更新は未確認 |
| pause前に映像/canvasを最大8秒待つ起動修正 | IMPLEMENTED。iPhone Safari/PWAの起動・5回再入で再発なし、VERIFIED（ユーザー報告） |
| window一致方式/3秒カウントダウン/診断A〜F | 本配布物には含めない。過去の独立診断版機能 |

画面は在庫、品目編集、スキャン、履歴、設定。下部ナビは在庫/スキャン/履歴/設定。スキャンでは購入/使用と数量（初期1）、認識後の確認数量を扱い、確定前に在庫を変えない。在庫不足は確定拒否、保存失敗は購入/使用の数量と履歴を巻き戻す。

DB名stocklite、DB version1、store state、key data。値はitems/logs/settings.retention/version2。品目はid/name/code/url/tags/quantity。コードは文字列で検索用、idとは別。JSON version1/2を受理し、確認後に全件置換。データ初期化やスキーマ変更なし。端末同期は未実装で確定追加仕様なし。

JANは形式・桁数・チェックデジットを検査。QRはZXingの形式情報で受付。読取は順次で約200ms間隔。数量確認中は追加解析を休止。同じコードの重複通知を抑止する。iOS映像はhtml5-qrcodeで取得し解析をpause、全体PNGをZXingへ渡す。

残課題はiOS読取速度・負荷、Android回帰、PWA更新、権限拒否/復帰などの未確認項目。起動不具合は報告されたiPhone受入範囲では再発なし。最低対応OS、機種、現行配信元、v9報告ZIPとGitの一致はUNKNOWN。未確認をVERIFIEDにしない。
