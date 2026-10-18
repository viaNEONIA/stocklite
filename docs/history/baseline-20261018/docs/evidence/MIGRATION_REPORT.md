# 文書移行・検証報告

対象StockLiteのみ。整備日2026-10-18 JST。

## 基点と変更範囲

- 調査時main: d2ddf7a27edb36dc8289c35486480163fd74e9fb。
- 文書ブランチ: docs/project-baseline。mainへの直接コミット/マージなし。
- 元の開発branch diagnostics/v10-photo-liveは保持。mainの実行コード/テスト/SW/manifest/アイコンはバイト不変。
- 8管理MDと、測定集計・出所・ハッシュの台帳を整備。READMEは既存原文を末尾に完全保持。

## 検証

既存mainファイルはREADME以外をGit blobとバイト一致で確認。測定JSON原本5件は控えとSHA256一致。管理文書存在・相対リンク・Node構文等の80チェックは原本付きローカル版で合格。GitHub用に原本を除外した後も文書リンクと実行ファイルのバイト一致を再検査する。

既存模擬試験はmain verify.cjs、開発版diagnostics-v10/verify.cjs、ios-candidate/verify.cjsを再実行してPASS。TEST_RESULTS参照。新規実機/実カメラ/実ブラウザ/実IndexedDB試験は未実施。

## 原本の扱いと自動レビュー拒否

測定JSON原本・引き継ぎ原文を含む最初のpushは、自動承認レビューが公開先への機微情報持ち出しの可能性を理由に拒否した。拒否を回避して原本を送信することはしない。

原本はユーザー添付とローカル控えに保持。原本付きローカルコミット3fea977はローカル専用branch docs/project-baseline-local-evidenceとして保持する。GitHub用branchは最新mainを親に作り直し、原本を含むコミットを祖先に含めない。GitHubへ送信するのは仕様・測定集計・ハッシュ・出所・検証結果のみ。原本は非Git控えstocklite-private-evidenceに保存し、元ファイルの削除/初期化はしない。

## GitHub反映

公開read/fetchは成功。GitHubプラグイン未インストール、gh未導入。直近に接続提案済み。原本を除外した文書コミットのpush結果は作成後に追記する。PR/マージ/公開は現時点で未実施。

## 未解決

mainが診断ページ、統合候補がローカルのみ、v9報告ZIPとGitの一致未確認、v10.4.2実機未閉鎖、Pages配信設定未確認。この移行作業では修正や追加実装を行わない。

## 最終反映状況

原本を含まない文書branchのpushは、GitHubのユーザー名/認証情報を取得できず失敗（terminal prompts disabled）。リモートbranch/PRは未作成。mainは未変更。最終成果物はローカルdocs/project-baselineのコミットと、文書のみのZIP/適用パッチ。

最終再検証: 既存mainファイルはREADME原文保持・それ以外バイト一致。原本を除外した文書リンク/測定ハッシュを確認。GitHub用HEADのツリーに原本JSON/引き継ぎ原文が含まれないことを確認。ローカルに残る原本控えは追跡対象外で、ZIP/パッチへ追加しない。
