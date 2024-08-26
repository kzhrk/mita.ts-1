---
theme: seriph
title: OpenAPI と型
info: |
  ## OpenAPI と型
favicon: 'https://github.githubassets.com/favicons/favicon-dark.png'
class: text-left
drawings:
  persist: false
transition: slide-left
mdc: true
---

# OpenAPI と型

<div>
  <p>Mita.ts#1<time class="ml-4" datetime="2024-08-28">2024/08/28(Wed)</time></p>
  <p>小林 和弘</p>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/kzhrk/mita.ts-1" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# 自己紹介

<div class="container">
  <div class="profile">

  ```json
  {
    "name": "小林 和弘",
    "job": "Frontend Engineer@Medpeer",
    "x_twitter": "@kzhrk0430",
    "github": "kzhrk"
  }
  ```

  </div>
  <figure class="photo">
    <img src="https://ca.slack-edge.com/T01D3LCRA8L-U01M90SPEAH-g09a52a5db19-512" />
  </figure>
</div>

<style>
.container {
  display: flex;
}
.profile {
  align-items: center;
  flex: 1 1 70%;
}
.profile pre {
  display: flex;
  align-items: center;
  height: 100%;
}
.profile code {
  font-size: 1.2rem;
}
.photo {
  flex: 0 0 30%;
}
</style>

---

# OpenAPI とは

https://www.openapis.org/

<div>
  <p class="text-2xl">HTTP API を記述するための標準仕様</p>
  <ul class="text-xl">
    <li>API がどのように機能するか</li>
    <li>API がどのように連携するか</li>
    <li class="font-bold">クライアントコードを生成<strong v-click class="text-red">（型も生成）</strong></li>
    <li>テストを作成</li>
  </ul>
</div>

---

# Example

https://github.com/kzhrk/mita.ts-1/blob/main/spec.yml

<div class="overflow-auto h-5/6">

```yaml
openapi: "3.0.0"
info:
  version: 1.0.0
  title: Sample
paths:
  /items:
    get:
      summary: アイテム一蘭取得
      operationId: getItems
      tags:
        - items
      parameters:
        - name: page
          in: query
          required: false
          schema:
            type: integer
            maximum: 100
            format: int32
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  required:
                    - id
                    - name
                  properties:
                    id:
                      type: integer
                      format: int64
                    name:
                      type: string
                    tag:
                      type: string
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
  /items/{itemId}:
    get:
      summary: アイテム詳細取得
      operationId: getItem
      tags:
        - items
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: object
                required:
                  - id
                  - name
                properties:
                  id:
                    type: integer
                    format: int64
                  name:
                    type: string
                  tag:
                    type: string
        default:
          description: unexpected error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Error"
components:
  schemas:
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string
```

</div>

---

# 型を生成する方法

- OpenAPI generator
- OpenAPI TypeScript

---

# OpenAPI generator

https://openapi-generator.tech/docs/installation/

## Docker

```shell
docker run -t --rm \
  -v ${CURDIR}:/local openapitools/openapi-generator-cli generate \
  -i local/spec.yml \
  -g typescript-axios \
  -o local/sample/openapi-generator
```

<br>

## npm

```shell
npx @openapitools/openapi-generator-cli generate \
  -i ./spec.yml \
  -g typescript-axios \
  -o ./sample/openapi-generator
```

cf. [Generators List](https://openapi-generator.tech/docs/generators)

---

# 出力した型を読み込む

<div>
  <p>OpenAPI で定義した operationId とステータスコードを元に抽象化された型が出力される。</p>
</div>

```typescript
import type { GetItems200ResponseInner } from './sample/typescript-axios';

const item: GetItems200ResponseInner = {
	id: 1,
	name: '',
}
```

---

# OpenAPI TypeScript

https://openapi-ts.dev/

```shell
npx openapi-typescript ./spec.yml -o ./sample/openapi-typescript/schema.d.ts
```

---

# 出力した型を読み込む

<div>
  <p>OpenAPI のパスと operationId の巨大な interface が提供される。</p>
</div>

```typescript
import type { paths, operations } from './sample/openapi-typescript/schema';

type Item = paths['/items/{itemId}']['get']['responses']['200']['content']['application/json'];
type Item2 = operations['getItem']['responses']['200']['content']['application/json'];

const item: Item = {
	id: 1,
	name: '',
};
const item2: Item2 = {
	id: 1,
	name: '',
};
```

---

# まとめ

## OpenAPI generators

<br>

- generator から言語が選べる
- 抽象化した型を提供する

## OpenAPI TypeScript

<br>

- paths, operations の巨大な interface を提供する
- [openapi-fetch](https://openapi-ts.dev/openapi-fetch/) でテストのモックなども提供する

---
layout: center
class: text-center
---

# 👏 ご清聴ありがとうございました 👏
