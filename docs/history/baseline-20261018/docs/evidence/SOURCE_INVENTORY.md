# 調査ソース・資料台帳

日付2026-10-18 JST。リポジトリhttps://github.com/viaNEONIA/stocklite 。[機械可読台帳](source-inventory.json)にファイルとSHA256/Git blobを記録。

## ソース

| 対象 | コミット | 調査範囲 |
|---|---|---|
| 最新取得main | `d2ddf7a27edb36dc8289c35486480163fd74e9fb` | 全ファイル一覧、index/diagnostic/paired/continuous/verify、manifest/SW/README群 |
| 前回main参考 | `5b58f2b2de4a9677815bc0b76c7d0c7ea0debc9f` | v9.4.1 BUILD、html5/ZXing/nativeの選択、画像/在庫経路 |
| v9ソース参考 | `55131b330f5b56ce1844ab5512e4d44481e96ca0` | init/persist/handleCode/commitPending、品目/履歴/JSON、Android経路 |
| ローカル開発 | `1f396c1662a5e1179d08f9ca37ddea4d97074600` | diagnostics-v10 v10.3、ios-candidate v10.4.2、テスト/README/キャッシュ |

最新mainは公開read取得で確認。ローカルmainブランチ自体は旧SHAを保持し、origin/mainの追跡参照をfetchで更新した。文書branchは最新origin/mainから分離worktreeで作成し、元の開発branchを変更していない。

## 既存資料

README.md、README_V9.md、README_V9_1.md、README_V9_2.md、README_V9_3.md、README_V9_4.md、README_V9_4_1.md、TEST_REPORT.md、V9_TEST_REPORT.md、CAMERA_FIX_REPORT.md、V6_TEST_NOTES.md、V7_TEST_NOTES.md、V8_TEST_NOTES.md、ローカルdiagnostics-v10/README.md、ios-candidate/README.mdを確認。

引き継ぎ書原本（ローカル証拠控え）はユーザー添付StockLite_v10_Work_Handover_iOS_JAN_Photo_vs_Live_20261017(2).mdのバイトコピー。参照される別の設計引き継ぎ書やv9/v9.3/v9.4.1 ZIPを今回新たに取得して照合したわけではない。

[測定原本一覧](source-inventory.json)の5 JSONを内容確認・集計。原本の改変/正規化はせず、ローカル控えの配置名のみ空白を避けて変更。原本JSON・引き継ぎ書原文はGitHub送信対象から除外し、集計/ハッシュ/出所だけを管理する。対象コミットはログ未記録。撮影画像1000105438.jpgはこの会話で読めるエラー表示を証拠として使用し、画像自体をGitへ保存しない。

## 会話の根拠と限界

この会話に見えるv9正常報告を引き継ぐ資料、方式採用の暫定指示、起動失敗報告、D/Eの認識前後の条件差、今回の管理移行指示を使用。別チャットの全文は取得していない。会話要約の「最新版で速くなった」等から対象版の実機合格を推定しない。

## 既存資料の矛盾と扱い

- 現行READMEは過去時点の「main未反映」を含むが、現行main自体に診断ページが存在する。README原文を削除せず前置きで区別した。
- 旧比較版READMEのv9.3基準と、ユーザー確定のv9基準は別。v9を正常報告の基準とする。
- 旧V7資料の「別パスで試験」はDB隔離を保証しない。新しい管理文書では別オリジンを採用。
- 旧テスト報告の「実機未実施」は各資料作成時点。今回のJSON実測の存在を否定しない。
- Gitコミット名v9の7512aa8はコード上で後続比較モードを含む。名前だけで版を確定しない。

コードと資料が違う箇所は勝手に修正せず、対象版・状態・不明点として管理する。
