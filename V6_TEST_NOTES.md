# StockLite v6 診断テスト版

基準: StockLite_iPhone_Camera_Fix_2026-10-16.zip（GitHub HEADとの差分未検証）

変更: 二重の数量確認UIのうち未使用パネルを削除、カメラ診断表示、コールバック/認識/例外カウント、手動入力時の抑制解除、Service Workerキャッシュ名更新。

確認済み: ZIP展開、JavaScriptのnode --check構文検査。
未確認: iPhone Safari/PWAのJAN-8/JAN-13/QR認識、Android回帰、GitHub HEAD互換性、実機でのIndexedDB保持。

試験手順: 本番とは別のテスト環境に配置。先に本番の設定画面からJSONバックアップを保存。iPhone SafariでテストURLを開き、スキャン画面の「カメラ診断」を開く。映像の寸法、callback回数、検出回数、最終エラーを確認し、EAN-8/EAN-13/QRの実物を試す。認識後の数量確定、手入力、画像読み取り、カメラ停止再開を確認する。

重要: GitHub Pagesの同一URLで上書きするとService Worker更新とIndexedDBのデータ互換性検証が必要。本番mainへの無検証上書きは禁止。
