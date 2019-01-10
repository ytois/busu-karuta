## 構成

- RDMS・・・カードマスタの管理
- Redis・・・ゲーム状態の管理

## routes

- /
- /room
- /room/:id

## Pages

- Index
- Room
  - Question
  - Result

## Component

### Room

- status
  - score
  - room status
  - remining number
- card list
  - card
    - button
- question
  - sentence
- anser
  - correct / fail
  - anser time

## socket method

- anser

## Flow

### 基本

- socket からは store の action 名でクライアントへイベントを送信する
- store で待ち受けて action を発火させる

### サイトアクセス時

- クッキーに ID とユーザー名を登録 ※非 socket

### 部屋アクセス時

- ID とユーザー名を登録

### 開始時

- カードの初期化

### ゲーム中

#### 問題

- Client: 画面初期化、問題の待受
- Server: 残りカードから選択、クライアントへ送信

#### 回答

- Client: 回答の送信、次の回答までブロック
- Server: 残りカードから選択、クライアントへ送信
  - ブロック状態の照合
