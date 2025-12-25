# SaiNara

## 概要

**旅行間際に欲しい情報を分かりやすい形でまとめたアプリ**

旅行の最後1~2時間は、欲張ると痛い目を見るが、何もしないままでいるには暇である。
そこで、このアプリを使うことで、旅行の最後をより気持ち良く終えて、奈良旅行の締めを飾ってほしいという願いから作成。

[ことてくハッカソン2025](https://kotonara.connpass.com/event/373785/)にて、12月5日から20日の期間で開発

アーバンデータチャレンジ特別賞を獲得

## 機能

* 2種類のマップ
    * フリーWiFi, 充電器、座れる場所などの、休憩したい場所を探せる休憩モード
    * ラスト1~2時間、お土産を買ったり、少し歩いたり、奈良をもう少し堪能したい人の散策モード
    * 切り替えもできるので前半は散策、後半は休憩も
* 一目でわかるほしい情報
    * 時間ごとに収縮するサークル
        * 円内にいれば目的地に間に合うことが直感的、視覚的にわかる
        * 細かい時間計算は不要
    * 休憩場所やお土産屋をピンにて表示
        * 一目でどういう場所がどこにあるかを確認
        * タグなどによるフィルター機能も搭載
        * 求める場所のみを確認
    * 現在地や目的地もピンで表示
        * 行きたい場所と現在地との比較も簡単    
* AI推薦マップ(S-AI)も搭載
    * 文章を入力すると、AIがおすすめの場所を提案
    * 実際にマップにてピンで表示
    * 目的地や現在地との距離感も視認可能


## 使用技術
### フロントエンド
- Next.js
- TypeScript
- leaflet: 地図ライブラリ
- geolocationAPI: 現在地取得
- [Gemini API](https://ai.google.dev/gemini-api/docs?hl=ja): バックエンドで呼び出し

### ホスティングサービス
- Vercel

### 地図上に表示しているデータ参考元
- [OpenStreetMap](https://www.openstreetmap.org): 地図
- [奈良 Free Wi-Fiサービス提供エリア図](https://www.pref.nara.jp/51661.htm)
- [奈良休憩場所+トイレ](https://www3.pref.nara.jp/park/1009.htm)
- [奈良ベンチリスト](https://suwarumap.com/tag/%E8%BF%91%E9%89%84%E5%A5%88%E8%89%AF)
- [近鉄奈良駅周辺充電スポット](https://oasis.mogya.com/map/%E5%A5%88%E8%89%AF%E7%9C%8C%E5%A5%88%E8%89%AF%E5%B8%82%E6%9D%B1%E5%90%91%E4%B8%AD%E7%94%BA29%E3%80%80%E8%BF%91%E9%89%84%E5%A5%88%E8%89%AF%E9%A7%85%E6%A7%8B%E5%86%85?ll=34.6838012,135.828787&z=15)
- [JR奈良駅,近鉄奈良駅周辺の電源カフェ](https://dengen-cafe.com/tags/naraeki)
- [スタバ奈良周辺](https://www.h9v.net/?search_keywords=%E5%A5%88%E8%89%AF&search_keywords_operator=and&search_cat2=0&search_cat3=0)

## prefix
```
feat: 機能追加
chore: インストール関係
refac: リファクタリング
del: コードや機能、ファイルの削除
improve: 機能修正(より改善する、向上する形)
fix: バグ修正
wip: 実装途中だけど一旦保存したい時
revert: 機能を前のものに戻す時
docs: READMEなどのドキュメントに関する編集
change: CSSなどのサイトの見た目やコードの実行順など、improveほど必須ではないが変えたい時
```

## マージ

期間も短いので今回は`main`ブランチにマージ

(一応事故った時に最初に色々インストールした`backup`ブランチを用意)

## 開発メンバー

- [Eztas](https://github.com/Eztas)
- [Kimurash](https://github.com/kimurash)

## その他
このページ（または本リポジトリ）は、

奈良県オープンデータカタログサイトが公開する「奈良 Free Wi-Fiサービス提供エリア図」

を加工して作成しています。

**出典**  
奈良県オープンデータカタログサイト「奈良 Free Wi-Fiサービス提供エリア図」

クリエイティブ・コモンズ 表示 4.0 国際（CC BY 4.0）

https://creativecommons.org/licenses/by/4.0/deed.ja
