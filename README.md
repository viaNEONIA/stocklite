# StockLite PWA

GitHub Pagesで動作する数量・タグ管理アプリです。元のstocklite.htmlのIndexedDB（`stocklite` / `state` / `data`）およびJSON形式を維持しています。

## 公開手順
1. GitHubで公開リポジトリ `stocklite` を作成します（無料プランでのGitHub Pages利用を想定）。
2. このフォルダの **中身** をリポジトリのルートへアップロードし、mainブランチにコミットします。
3. Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/(root)` → Save。
4. `https://ユーザー名.github.io/stocklite/` にアクセスします（反映まで時間がかかることがあります）。
5. Android Chromeでサイトを開き、メニューから「アプリをインストール」または「ホーム画面に追加」を選択します。
6. カメラ使用許可を求められたら許可します。

## 注意
- `content://` でHTMLを直接開いてもPWAとして動作しません。HTTPSの公開URLを使ってください。
- IndexedDBは公開元（オリジン）単位で分離されるため、以前のローカルHTMLで保存したデータは自動移行されません。**旧版の設定からJSONを出力し、PWA側でインポート**してください。
- データは端末内のIndexedDBへ自動保存され、GitHubへは送信されません。定期的にJSONバックアップを出力してください。
- カメラでの検出にはブラウザの`BarcodeDetector`対応が必要です。未対応の場合は手入力をご利用ください。
- アプリ更新時は `service-worker.js` の `CACHE` 名を変更すると古いキャッシュを破棄できます。
- GitHub Pagesは公開サイトです。アプリのコードは公開されますが、IndexedDBの在庫データは公開されません。
