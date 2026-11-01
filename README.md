# マルバツゲーム (Tic-Tac-Toe) - 設計比較プロジェクト

HTML / CSS / JavaScript で作成したシンプルなマルバツゲームです。
単に機能を実装するだけでなく、**「関数型」「1クラス完結型」「マルチクラス・モジュール分割型」** という 3 つの異なるアーキテクチャへのリファクタリング過程をブランチごとに記録しています。

---

## 🌿 ブランチ構成とアーキテクチャの比較

| ブランチ名 | 設計アプローチ | 特徴・学習ポイント |
|---|---|---|
| **`main`** | **関数型 (Functional)** | ・純粋関数によるゲーム判定ロジックの分離<br>・`UI = f(State)` のデータ駆動設計<br>・即時関数（IIFE）によるスコープ保護 |
| **`arch/single-class`** | **1クラス完結型 (Single Class)** | ・状態と振る舞いを 1 つの `TicTacToe` クラスにカプセル化<br>・プライベートフィールド（`#`）による情報の隠蔽<br>・イベントリスナーと `this` 束縛の適切な制御 |
| **`arch/multi-class-modules`** | **役割分割型 (Multi-Class / SRP)** | ・単一責任の原則（SRP）に基づく 4 クラス分割 (`Board`, `GameJudge`, `GameUI`, `TicTacToeApp`)<br>・ES Modules (`import` / `export`) の活用<br>・コールバック注入による UI とロジックの疎結合化<br>・防衛的コピーによるデータの改ざん防止 |

---

## 📂 ディレクトリ構成 (`arch/multi-class-modules` の場合)

```text
├── index.html          # ゲーム盤面のマークアップ
├── common.css          # スタイルシート
├── main.js             # エントリーポイント
├── Board.js            # 盤面データの保持・配置バリデーション
├── GameJudge.js        # 勝敗・引き分け判定（ルール計算）
├── GameUI.js           # DOM操作・画面描画・イベント監視
└── TicTacToeApp.js     # 全体を統括する進行役（オーケストレーター）
