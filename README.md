# japan-population-graph

## 都道府県別の総人口推移グラフです。

### プリミティブカラー

| キーカラー | name      | カラーコード |
| ---------- | --------- | ------------ |
| Primary    | blue-900  | #0017C1      |
| Secondary  | blue-700  | #264AF4      |
| Tertiary   | blue-1000 | #00118F      |
| Background | blue-50   | #E8F1FE      |

### タイポグラフィ

| タグ   | name     | px   | weight  | line-height | rem  |
| ------ | -------- | ---- | ------- | ----------- | ---- |
| `h1`   | headingL | 36px | Regular | 1.4         | 2.25 |
| `h2`   | headingM | 32px | Regular | 1.5         | 2    |
| `本文` | textL    | 20px | Regular | 1.7         | 1.25 |

### 環境変数

[RESAS API詳細仕様](https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html)<br>
こちらのリンクからAPIキーを利用申請し、下記を`.env.local`に記述してください。

```
X_API_KEY=発行したキー
```

### 開発環境実行

```
yarn dev
```
