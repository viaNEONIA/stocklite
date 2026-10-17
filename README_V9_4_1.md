# StockLite v9.4.1 ZXing API修正版（試験用）

## 修正
- v9.4 Dモードで存在しなかった `decodeFromCanvas` 呼び出しを廃止。
- CanvasをJPEGデータURLに変換し、画像をロードして `BrowserMultiFormatReader.decodeFromImageElement()` で読み取る試験実装へ変更。
- JAN-8/JAN-13の形式制限、既存の認識結果処理を維持。

## 注意
- この方法はフレームごとの画像変換負荷があり、高速化を保証しません。
- CDNで取得するZXingの実行時API互換性とiPhone実機動作は未確認です。
- Dモードが失敗したらAモードを使用してください。
- v9.3を既知の動作基準として維持し、既存データのJSONバックアップを取得してから試験してください。
- 本番環境とは別オリジンで試験してください。
