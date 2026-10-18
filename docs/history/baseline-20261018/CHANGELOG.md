# StockLite 変更履歴

確認できるコード/既存資料/会話の事実だけを記す。コミット名とBUILDが一致しない場合はBUILDを優先して版を識別する。日付はJST。

| 日付/版 | 根拠 | 確認した変更・注意 |
|---|---|---|
| 2026-10-18 管理移行 | docs/project-baseline | 8管理MDと証拠台帳整備。既存実行ファイル変更なし |
| 2026-10-17 main更新 | `d2ddf7a27edb36dc8289c35486480163fd74e9fb` | ルート入口をv10.2独立診断へ変更した既存コミット。今回行った変更ではない |
| 2026-10-17 v10.4.2 | ローカル`1f396c1662a5e1179d08f9ca37ddea4d97074600` | 映像/canvasを最大8秒待ってpauseする起動修正。実機未検証 |
| 2026-10-17 v10.4.1 | ローカル0436ec4 | カメラ→ZXingの読込順、同期clearの扱い、TypeError表示、再起動。pause UI未準備の実機失敗報告あり |
| 2026-10-17 v10.4 | ローカルe2daea2 | v9参考ソースを基にiOS全体映像ZXing方式を統合、従来方式へ切替を追加 |
| 2026-10-17 v10.3 | ローカルaf882f7 | 診断Fに3秒カウントダウン、consecutive/window比較。新しい実機記録なし |
| 2026-10-17 v10.2単一HTML | ローカルedca590 | 固有名stocklite-v10-2-f.htmlとFボタン強調 |
| 2026-10-17 v10.2 | ローカル0f6127c | F全体映像ZXing逐次解析、2フレーム一致、10秒期限 |
| 2026-10-17 v10.1.1 | ローカル5fb610d | D/E後のカメラ維持、入力/読取/APIエラー区分 |
| 2026-10-17 v10.1 | ローカルd7ba2aa | D同一画像/E領域比較、期待値自動照合 |
| 2026-10-17 v10.0診断 | ローカル11efe2b | A/B/C独立診断とソース監査 |
| 2026-10-17 v9.4.1 | `5b58f2b2de4a9677815bc0b76c7d0c7ea0debc9f` BUILD、README_V9_4_1.md | 存在しないdecodeFromCanvasからJPEG/decodeFromImageElementへ比較実装変更。実機採用確認なし |
| 2026-10-16〜17 v9.1〜9.4 | README_V9_1〜V9_4、Git履歴 | fps/形式/解像度/native/AF/zoom/フレーム比較を段階追加。正確なZIP対応はUNKNOWN |
| 2026-10-16 v9 | `55131b330f5b56ce1844ab5512e4d44481e96ca0`、V9_TEST_REPORT.md | iOSをhtml5-qrcode 2.3.8へ。数量確認/保存とAndroid経路を維持。ユーザー成功報告あり |
| 2026-10-16 v6/v7/v8 | V6_TEST_NOTES〜V8_TEST_NOTES | コールバック/API/Promise/経過時間の診断を追加。iPhone映像はあるがcallback0の報告 |
| 2026-10-16 本体改修 | TEST_REPORT.md、旧README | URL、履歴編集/保存期間、ナビ同期、PWA等。これ以前の厳密な版番号はUNKNOWN |

v9.3を既知基準とする古い比較版READMEと、v9を基準とするユーザー確定事項は一致しない。正常動作基準はSPEC/TEST_RESULTSの証拠限定定義を使用する。ローカルコミットの存在はGitHubで取得可能であることを意味しない。
