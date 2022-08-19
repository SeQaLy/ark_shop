# 作成背景
ARK:SurvivalEvolvedのサーバー内にて時間経過でもらえるポイントがあるが、使用用途が少なく余るためポイントを通貨としてゲーム内アイテムの購入ができるサイトを作成する

# 必要環境
- Python 3.9.6

# 構成
```
│/
┣static         
┃┣css                   スタイルシート格納
┃┣image                 各種画像格納 
┃┣js                    JavaScriptファイル格納
┣template       
┃┣index.html            メインhtmlファイル
┣app.py                 Flask関連
┣notify.py              Line通知送信
┣db_control.py          DB操作関連
┣README.md              現在読んでいるファイル
┣requirements.txt       必要ライブラリ
┣runtime.txt            Pythonバージョン
┣shop_data.json         商品データ
┣stock.db               SQLite
```

# 利用ライブラリと用途
- ## Flask
  - PythonのWebアプリケーションフレームワーク
  - [公式リファレンス](https://msiz07-flask-docs-ja.readthedocs.io/ja/latest/)
  
- ## line-bot.sdk
  - LINE Messaging APIのクライアントライブラリ
  - [公式リファレンス](https://developers.line.biz/ja/docs/messaging-api/line-bot-sdk/)

- ## requests
  - URLを開くためのライブラリ
  - [公式リファレンス](https://requests-docs-ja.readthedocs.io/en/latest/)
