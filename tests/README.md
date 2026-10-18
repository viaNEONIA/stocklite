# 試験コードの出所

legacy/verify-ios-candidate.cjsは元の統合試験版verify.cjsのバイトコピー。元の配置ios-candidate/と、v9参照コミット55131b3のGit履歴を前提とする。新規リポジトリにファイルをアップロードしただけでは、そのまま実行できない。履歴と配置への依存を解消する試験基盤移行は未実施であり、今回テストコードは書き換えていない。

元の開発worktreeでは2026-10-18にnode ios-candidate/verify.cjsが合格。模擬DOM/デコーダ/保存を使った制御試験であり実機動作の保証ではない。
