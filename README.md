# Replaying Furucombo Hack

模擬 Furucombo 被攻擊事件

https://rekt.news/furucombo-rekt/

## 環境設定

- 安裝 dependency

```
yarn
```

## 環境參數

如想環境獨立使用環境變數，可以更改 `dotenv.config({ path: '.env' });` 指定想要的環境變數檔案位置

## 開發

1. Build (會產生 web3 跟 hardhat test 用的 type definition)

```
yarn build
```

2. Test

```
yarn test
```
