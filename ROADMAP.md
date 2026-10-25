# 継続開発計画

| 優先 | 状態/対象 | 完了条件 |
|---|---|---|
| 完了/一部未確認 | 初回main配置 | main 3cab471af4d7c2fb8c3bb261288d37a5f5bbfee1を確認。表示版はユーザー報告で確認。公開設定/実機配信コミットの照合は未実施 |
| 受入合格 | pause起動不具合 | iPhone Safari/PWAの起動・5回再入で再発なし（ユーザー報告、TEST_RESULTS参照）。環境の詳細は未記録 |
| P1 | 一部VERIFIED：読取統合・Android回帰 | iPhone Safari/PWAのJAN8/13/QR、数量/保存/再起動は報告で合格。Android Chrome A1〜A7も報告で合格。iPhone/AndroidのJSONバックアップ復元B1〜B5も報告で合格。C1〜C5の権限拒否/復帰・iPhone方式切替/再入も報告で合格。残りはPWA更新/旧キャッシュほかTEST_RESULTSの未確認項目 |
| P1 | DEFECT/課題：iOS速度と負荷 | 初回条件を統一した測定、誤読/timeout/負荷を含む採用判断 |
| P1 | UNKNOWN：新repoのテスト基盤 | 元テストの配置/古いGitコミット依存を別作業で整理し、再現可能にする |
| P2 | PROPOSED：window方式の標準化 | 診断比較の結果とユーザー採否を確認。現標準は連続2回 |

受入報告を記録。Android向け写真OCRはユーザー指示で実装（v10.5.0-dev）。P1：TEST_PLAN O1〜O7の実機受入。完了条件は候補確認後に品名保存可能、取消後の混入なし、既存読取/保存回帰合格。精度/速度は実測して採否判断。
