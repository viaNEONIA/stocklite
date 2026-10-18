# StockLite 開発ルール

対象は本配布物と今後のリポジトリ全体。

## 開始手順

README/SPEC/ARCHITECTURE/TEST_RESULTS/ROADMAPと対象配下のAGENTSを読み、git status、branch、HEAD、remote、origin/mainを確認。未コミット変更を破棄しない。表示BUILDと実行入口を照合する。本配布物の入口はindex.htmlのv10.4.2本体。過去のmain=v10.2診断という記録を現在の配布物へ誤適用しない。

## Git運用と権限

今回、ユーザーがアップロードしてmainを作るための初回配置を許可している。以後は最新mainから作業ブランチを作成、関連文書更新と検証後にPR。無断main直接コミット/マージ、force pushは禁止。今回こちらからpush/公開は行わない。

文書・梱包だけの依頼で機能変更/修正/リファクタリングを始めない。正常基準の上書き、データ消去/初期化、原本測定JSON・カメラ写真・在庫バックアップ・認証情報のGit追加、他プロジェクトの仕様混在をしない。

## 状態と検証

IMPLEMENTED=コード確認、VERIFIED=版・環境・対象操作付きの動作確認。PLANNED=確定済み未実装、PROPOSED=未確定案、DEFECT=既知不具合、UNKNOWN=確認不能。模擬試験を実機試験の成功に読み替えない。ユーザー報告、JSON実測、ソース監査を区別する。

本番操作前はJSONバックアップ。別パスでのDB隔離を仮定せず別オリジンで試験。iPhone Safari/PWAとAndroid Chrome、JAN8/13/QR、数量確定、保存/再起動、停止/権限を回帰確認する。テストの配置・Git履歴依存はtests/README.mdを参照する。

## 継続更新と完了報告

仕様→SPEC、構成→ARCHITECTURE、試験項目→TEST_PLAN、実施→TEST_RESULTS、機能変更→CHANGELOG、予定→ROADMAP、ルール→AGENTS。関係する文書だけ更新する。対象コミット/BUILD、変更、検証/未実施、既知課題、branch/commit/PR/公開状況を報告する。
