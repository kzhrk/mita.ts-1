---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: OpenAPI と型
info: |
  ## OpenAPI と型
# apply unocss classes to the current slide
class: text-left
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# OpenAPI と型

<div>
  <p>Mita.ts#1<time class="ml-4" datetime="2024-08-28">2024/08/28(Wed)</time></p>
  <p>小林 和弘</p>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# OpenAPI とは

<div>
  <p>HTTP API を記述するための標準仕様</p>
  <ul class="text-xl">
    <li>API がどのように機能するか</li>
    <li>API がどのように連携するか</li>
    <li class="font-bold">クライアントコードを生成（型も生成）</li>
    <li>テストを作成</li>
  </ul>
</div>

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/features/slide-scope-style
-->

<!--
Here is another comment.
-->

---

# CLI Installation

https://openapi-generator.tech/docs/installation/

## Docker

```shell
docker run -t --rm \
  -v ${CURDIR}:/local openapitools/openapi-generator-cli generate \
  -i local/spec.yml \
  -g typescript-axios \
  -o local/sample/typescript-axios
```

<br>

## npm

```shell
npx @openapitools/openapi-generator-cli generate \
  -i ./spec.yml \
  -g typescript-axios \
  -o ./sample/openapi-generator-cli
```

cf. [Generators List](https://openapi-generator.tech/docs/generators)

---

# 出力した型を読み込む

```typescript
import type { Pet, ShowPetById200Response } from './sample/typescript-axios';

const pet: Pet = {
	id: 1,
	name: '',
}
const response: ShowPetById200Response = {
  id: 1,
  name: '',
  tag: '',
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

```typescript
import type { paths } from './sample/openapi-typescript/schema';

type Pet = paths['/pets/{petId}']['get']['responses']['200']['content']['application/json'];
const pet: Pet = {
	id: 1,
	name: '',
};
```

---

# まとめ

## OpenAPI generators

抽象化した型を出力してくれる。

## OpenAPI TypeScript

---
layout: center
class: text-center
---

# ご清聴ありがとうございました
