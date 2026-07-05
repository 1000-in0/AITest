# 디자인 토큰 매핑 테이블

> Figma 변수명 ↔ CSS custom property 매핑.
> Claude Code가 Figma 디자인 구현 시 이 문서를 참조합니다.
> 토큰 추가/변경 시 이 문서도 업데이트하세요.

## 데이터 출처

- `tokens_raw.json` (Figma Variables 전체 export)
- `textStyles_raw.json` (Figma Text Styles 전체 export)
- 생성: `tokens/color.json`, `tokens/base.json` → `npm run build:tokens` → `src/tokens/_generated.css`

## 네이밍 규칙

Figma `/` → CSS `-` 변환. 예: `color/bg/primary` → `--color-bg-primary`
콤마(,)가 포함된 Figma 원본 키(예: `enabled,-disabled,-selected`)는 콤마를 제거하고 하이픈으로 정규화했습니다.

## Primitive Colors

Semantic 컬러가 참조하는 원시 색상 스케일입니다. 값은 `tokens/color.json`의 `color.primitive.*`에 정의되어 있습니다.

| 그룹    | CSS Property 접두사                    | 스텝 (050~950)                                                                                                                                                                                                                      |
| ------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| white   | `--color-primitive-white`              | #ffffff                                                                                                                                                                                                                             |
| black   | `--color-primitive-black`              | #000000                                                                                                                                                                                                                             |
| alpha   | `--color-primitive-alpha`              | rgba(0, 0, 0, 0) (참고용, 현재 semantic에서 미사용)                                                                                                                                                                                 |
| overlay | `--color-primitive-overlay-gray-900-*` | 0: rgba(42,49,55,0) / 32: rgba(42,49,55,0.32) / 40: rgba(42,49,55,0.4) / 90: rgba(42,49,55,0.9)                                                                                                                                     |
| gray    | `--color-primitive-gray-*`             | 050:#fafbfc 100:#f6f8fa 150:#f2f6f9 200:#eff4f8 250:#ecf1f5 300:#e9eef2 350:#e4e9ed 400:#dadfe4 450:#ccd1d6 500:#c0c4c9 550:#b2b6bb 600:#a5abb1 650:#90969d 700:#767d84 750:#565e66 800:#454e56 850:#3c444b 900:#2a3137 950:#20262a |
| red     | `--color-primitive-red-*`              | 050:#fffbfb 100:#fff6f5 150:#fff0ef 200:#ffeceb 250:#ffe3e1 300:#ffd9d7 350:#ffd0cd 400:#ffc7c3 450:#ffb4af 500:#ff9d98 550:#ff837c 600:#ff695f 650:#ff4337 700:#d2362c 750:#a52921 800:#781c16 850:#621611 900:#4b0f0b 950:#390906 |
| yellow  | `--color-primitive-yellow-*`           | 050:#fffcf8 100:#fffbf4 150:#fff9ef 200:#fff7ea 250:#fff3e1 300:#fff0da 350:#ffe9c8 400:#ffe1b5 450:#ffd390 500:#ffc46b 550:#ffb546 600:#d59638 650:#ab772a 700:#80591c 750:#6b4915 800:#563a0e 850:#412a07 900:#2c1b00 950:#221500 |
| lime    | `--color-primitive-lime-*`             | 050:#fafdf7 100:#f8fcf3 150:#f5fbee 200:#f1fae6 250:#ebf8de 300:#e5f6d6 350:#e0f2cb 400:#d5eeba 450:#c0e697 500:#abdd75 550:#96d552 600:#7cb143 650:#628d34 700:#486826 750:#3b561e 800:#2e4417 850:#21320f 900:#142008 950:#101907 |
| green   | `--color-primitive-green-*`            | 050:#f9fdf9 100:#f5fbf5 150:#f0fcf0 200:#e8f9e9 250:#ddf5df 300:#d4f1d7 350:#bfebc4 400:#aae4b0 450:#7fd688 500:#55c961 550:#2abb39 600:#239b2f 650:#1c7c26 700:#145c1c 750:#114c17 800:#0d3d13 850:#0a2d0e 900:#061d09 950:#051908 |
| sky     | `--color-primitive-sky-*`              | 050:#f7fdfe 100:#f4fcfd 150:#edfafe 200:#e0f8fc 250:#d5f6fb 300:#ccf0f9 350:#b3e8f6 400:#99e1f3 450:#66d1ee 500:#33c2e8 550:#00b3e2 600:#0093ba 650:#007492 700:#00546b 750:#004457 800:#003543 850:#00252f 900:#001b22 950:#00141a |
| teal    | `--color-primitive-teal-*`             | 050:#f7fdfd 100:#f4fcfc 150:#edfbfb 200:#e1faf9 250:#d4f7f5 300:#c7f4f1 350:#b3ede8 400:#99e7e0 450:#66dbd0 500:#33cfc1 550:#00c3b1 600:#00a192 650:#008074 700:#005e55 750:#004d46 800:#003d37 850:#002c27 900:#002420 950:#001513 |
| blue    | `--color-primitive-blue-*`             | 050:#f5fbfe 100:#f0f9fe 150:#e8f6fd 200:#e0f2fc 250:#d4edfa 300:#c5e7f8 350:#aed8f1 400:#84c3e9 450:#6fb9e5 500:#5aafe1 550:#2793d5 600:#0077c8 650:#0066b0 700:#005599 750:#004581 800:#003060 850:#002744 900:#002035 950:#001828 |
| purple  | `--color-primitive-purple-*`           | 050:#f9fafe 100:#f6f7fd 150:#f1f3fc 200:#ebeef9 250:#e2e7f7 300:#d9def5 350:#ccd3f1 400:#c0c9ed 450:#b3beea 500:#99a8e3 550:#8092dc 600:#6978b8 650:#515e94 700:#3a4571 750:#2e385f 800:#222b4d 850:#171e3b 900:#131b3a 950:#101730 |

primitive 색상 개수: 178개 (white/black/alpha 3 + overlay 4 + 9개 색상군 × 19스텝 171).

## Semantic Colors

값은 모두 위 primitive를 참조하는 alias(`var(--color-primitive-*)`)입니다. `⚠️`가 붙은 항목은 alias 근거가 약하거나 확인이 필요합니다.

| Figma 변수명 (tokens(color).color.\*)      | CSS Property                                        | 참조 Primitive                                                                                    |
| ------------------------------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| shape/brand                                | `--color-shape-brand`                               | primitive.blue.550                                                                                |
| bg/background                              | `--color-bg-background`                             | primitive.gray.250                                                                                |
| bg/surface-primary                         | `--color-bg-surface-primary`                        | primitive.white                                                                                   |
| bg/surface-secondary                       | `--color-bg-surface-secondary`                      | primitive.gray.050                                                                                |
| bg/surface-tertiary                        | `--color-bg-surface-tertiary`                       | primitive.gray.100                                                                                |
| bg/surface-quaternary                      | `--color-bg-surface-quaternary`                     | primitive.gray.150                                                                                |
| bg/surface-senary                          | `--color-bg-surface-senary`                         | primitive.gray.200                                                                                |
| component/scrollbar                        | `--color-component-scrollbar`                       | primitive.overlay.gray-900-32                                                                     |
| component/datatable/item/enabled           | `--color-component-datatable-item-enabled`          | primitive.white                                                                                   |
| component/datatable/item/hover             | `--color-component-datatable-item-hover`            | primitive.gray.250                                                                                |
| component/datatable/item/selected          | `--color-component-datatable-item-selected`         | primitive.gray.350                                                                                |
| component/datatable/header/enabled         | `--color-component-datatable-header-enabled`        | primitive.gray.050                                                                                |
| component/button/secondary-default         | `--color-component-button-secondary-default`        | primitive.white                                                                                   |
| component/button/secondary-selected        | `--color-component-button-secondary-selected`       | primitive.blue.250                                                                                |
| component/button/secondary-disabled        | `--color-component-button-secondary-disabled`       | primitive.gray.350                                                                                |
| component/button/brand-default             | `--color-component-button-brand-default`            | primitive.blue.550                                                                                |
| component/button/brand-hover               | `--color-component-button-brand-hover`              | primitive.blue.600                                                                                |
| component/button/brand-disabled            | `--color-component-button-brand-disabled`           | primitive.blue.450                                                                                |
| component/button/danger-default            | `--color-component-button-danger-default`           | primitive.red.600                                                                                 |
| component/button/danger-hover              | `--color-component-button-danger-hover`             | primitive.red.650                                                                                 |
| component/button/danger-disabled           | `--color-component-button-danger-disabled`          | primitive.red.500                                                                                 |
| component/button/warning-default           | `--color-component-button-warning-default`          | primitive.yellow.500                                                                              |
| component/button/warning-hover             | `--color-component-button-warning-hover`            | primitive.yellow.550                                                                              |
| component/button/warning-disabled          | `--color-component-button-warning-disabled`         | primitive.yellow.450                                                                              |
| component/button-ghost/ghostbtn-default ⚠️ | `--color-component-button-ghost-ghostbtn-default`   | primitive.overlay.gray-900-0 (전체 primitive 재조회로 확정, 이전 toast 부분집합 조회 때는 미확인) |
| component/button-ghost/ghostbtn-hover      | `--color-component-button-ghost-ghostbtn-hover`     | primitive.gray.250                                                                                |
| component/button-ghost/ghostbtn-activated  | `--color-component-button-ghost-ghostbtn-activated` | primitive.gray.350                                                                                |
| component/button-ghost/ghostbtn-selected   | `--color-component-button-ghost-ghostbtn-selected`  | primitive.blue.250                                                                                |
| component/box/box-default                  | `--color-component-box-box-default`                 | primitive.white                                                                                   |
| component/box/box-disabled                 | `--color-component-box-box-disabled`                | primitive.gray.350                                                                                |
| component/box-ghost/default                | `--color-component-box-ghost-default`               | primitive.gray.250                                                                                |
| component/box-ghost/ghost_box-on_colorbg   | `--color-component-box-ghost-ghost-box-on-colorbg`  | primitive.overlay.gray-900-40                                                                     |
| component/box-ghost/ghost_box-on_darkbg    | `--color-component-box-ghost-ghost-box-on-darkbg`   | primitive.white                                                                                   |
| component/box-ghost/hover                  | `--color-component-box-ghost-hover`                 | primitive.gray.350                                                                                |
| component/box-ghost/disabled               | `--color-component-box-ghost-disabled`              | primitive.gray.350                                                                                |
| component/box-ghost/populated              | `--color-component-box-ghost-populated`             | primitive.purple.200                                                                              |
| component/box-ghost/populated-hover        | `--color-component-box-ghost-populated-hover`       | primitive.purple.250                                                                              |
| component/box-ghost/activated-inputfield   | `--color-component-box-ghost-activated-inputfield`  | primitive.white                                                                                   |
| component/tooltip/bg                       | `--color-component-tooltip-bg`                      | primitive.overlay.gray-900-90                                                                     |
| icon/enabled-1-primary                     | `--color-icon-enabled-1-primary`                    | primitive.gray.750                                                                                |
| icon/enabled-2-secondary                   | `--color-icon-enabled-2-secondary`                  | primitive.gray.700                                                                                |
| icon/enabled-3-muted                       | `--color-icon-enabled-3-muted`                      | primitive.gray.150                                                                                |
| icon/selected                              | `--color-icon-selected`                             | primitive.blue.600                                                                                |
| icon/disabled                              | `--color-icon-disabled`                             | primitive.gray.550                                                                                |
| icon/enabled-white                         | `--color-icon-enabled-white`                        | primitive.white                                                                                   |
| text/gray-0-primary                        | `--color-text-gray-0-primary`                       | primitive.gray.950                                                                                |
| text/gray-1-secondary                      | `--color-text-gray-1-secondary`                     | primitive.gray.900                                                                                |
| text/gray-2-tertiary                       | `--color-text-gray-2-tertiary`                      | primitive.gray.850                                                                                |
| text/gray-3-quaternary                     | `--color-text-gray-3-quaternary`                    | primitive.gray.750                                                                                |
| text/gray-4-quinary                        | `--color-text-gray-4-quinary`                       | primitive.gray.700                                                                                |
| text/gray-5-senary                         | `--color-text-gray-5-senary`                        | primitive.gray.650                                                                                |
| text/gray-6-septenary                      | `--color-text-gray-6-septenary`                     | primitive.gray.550                                                                                |
| text/link ⚠️                               | `--color-text-link`                                 | primitive.purple.650 (전체 primitive 재조회로 확정, 이전 toast 부분집합 조회 때는 미확인)         |
| text/link-hover                            | `--color-text-link-hover`                           | primitive.purple.750                                                                              |
| text/link-opened                           | `--color-text-link-opened`                          | primitive.purple.550                                                                              |
| text/brand                                 | `--color-text-brand`                                | primitive.blue.550                                                                                |
| text/button/brand-default                  | `--color-text-button-brand-default`                 | primitive.white                                                                                   |
| text/button/brand-disabled                 | `--color-text-button-brand-disabled`                | primitive.blue.350                                                                                |
| text/button/secondary-default              | `--color-text-button-secondary-default`             | primitive.gray.850                                                                                |
| text/button/secondary-disabled             | `--color-text-button-secondary-disabled`            | primitive.gray.550                                                                                |
| text/button/secondary-activated            | `--color-text-button-secondary-activated`           | primitive.blue.600                                                                                |
| text/button/danger-default                 | `--color-text-button-danger-default`                | primitive.white                                                                                   |
| text/button/on_danger-disabled             | `--color-text-button-on-danger-disabled`            | primitive.red.300                                                                                 |
| text/button/warning-default                | `--color-text-button-warning-default`               | primitive.white                                                                                   |
| text/button/warning-disabled               | `--color-text-button-warning-disabled`              | primitive.yellow.300                                                                              |
| text/button-ghost/default                  | `--color-text-button-ghost-default`                 | primitive.gray.750                                                                                |
| text/button-ghost/disabled                 | `--color-text-button-ghost-disabled`                | primitive.gray.550                                                                                |
| text/button-ghost/bg-dark                  | `--color-text-button-ghost-bg-dark`                 | primitive.gray.150                                                                                |
| text/danger                                | `--color-text-danger`                               | primitive.red.650                                                                                 |
| text/warning                               | `--color-text-warning`                              | primitive.yellow.600                                                                              |
| text/button-ghost-link/default             | `--color-text-button-ghost-link-default`            | primitive.purple.600                                                                              |
| text/button-ghost-link/disabled            | `--color-text-button-ghost-link-disabled`           | primitive.gray.550                                                                                |
| text/box/default                           | `--color-text-box-default`                          | primitive.gray.850                                                                                |
| text/box/hint                              | `--color-text-box-hint`                             | primitive.gray.650                                                                                |
| text/box/disabled                          | `--color-text-box-disabled`                         | primitive.gray.550                                                                                |
| text/box/selected                          | `--color-text-box-selected`                         | primitive.gray.850                                                                                |
| text/box-ghost/default                     | `--color-text-box-ghost-default`                    | primitive.gray.750                                                                                |
| text/box-ghost/hint                        | `--color-text-box-ghost-hint`                       | primitive.gray.650                                                                                |
| text/box-ghost/selected                    | `--color-text-box-ghost-selected`                   | primitive.gray.850                                                                                |
| text/box-ghost/bg-dark                     | `--color-text-box-ghost-bg-dark`                    | primitive.gray.150                                                                                |
| line/1-primary                             | `--color-line-1-primary`                            | primitive.gray.550                                                                                |
| line/2-secondary                           | `--color-line-2-secondary`                          | primitive.gray.500                                                                                |
| line/3-tertiary                            | `--color-line-3-tertiary`                           | primitive.gray.450                                                                                |
| line/4-quaternary                          | `--color-line-4-quaternary`                         | primitive.gray.400                                                                                |
| line/5-quinary                             | `--color-line-5-quinary`                            | primitive.gray.350                                                                                |
| line/6-senary                              | `--color-line-6-senary`                             | primitive.gray.250                                                                                |
| line/7-septenary                           | `--color-line-7-septenary`                          | primitive.gray.200                                                                                |
| line/datatable-item/x-enabled              | `--color-line-datatable-item-x-enabled`             | primitive.gray.350                                                                                |
| line/datatable-item/x-hover                | `--color-line-datatable-item-x-hover`               | primitive.gray.350                                                                                |
| line/datatable-item/x-selected             | `--color-line-datatable-item-x-selected`            | primitive.gray.400                                                                                |
| line/datatable-item/y-default              | `--color-line-datatable-item-y-default`             | primitive.gray.400                                                                                |
| border/button-secondary/enabled            | `--color-border-button-secondary-enabled`           | primitive.gray.400                                                                                |
| border/button-secondary/hover              | `--color-border-button-secondary-hover`             | primitive.gray.550                                                                                |
| border/button-secondary/activated          | `--color-border-button-secondary-activated`         | primitive.blue.550                                                                                |
| border/button-secondary/activated-hover    | `--color-border-button-secondary-activated-hover`   | primitive.blue.600                                                                                |
| border/button-secondary/selected           | `--color-border-button-secondary-selected`          | primitive.gray.450                                                                                |
| border/button-secondary/selected-hover     | `--color-border-button-secondary-selected-hover`    | primitive.gray.500                                                                                |
| border/focused                             | `--color-border-focused`                            | primitive.blue.600                                                                                |
| border/box/`enabled,-disabled,-selected`   | `--color-border-box-enabled-disabled-selected`      | primitive.gray.450                                                                                |
| border/box/`hover,-selected_hover`         | `--color-border-box-hover-selected-hover`           | primitive.gray.550                                                                                |
| border/box/select-activated                | `--color-border-box-select-activated`               | primitive.blue.550                                                                                |
| border/box-ghost/disabled                  | `--color-border-box-ghost-disabled`                 | primitive.gray.400                                                                                |
| border/box-ghost/populated                 | `--color-border-box-ghost-populated`                | primitive.purple.250                                                                              |

semantic 색상 개수: 103개.

### 제외된 항목 (Figma 원본에 존재하나 토큰화하지 않음)

다음은 값(hex)이 채도 높은 비정상적인 색(hot magenta/orange)이고, 서로 다른 콜렉션에 동일 값이 중복 등장하는 패턴으로 미루어 Figma 파일 내부 QA/가이드 마커로 판단되어 제외했습니다. 실제로 사용해야 한다면 알려주세요.

- `color/guide` (#f000ff), `color/guide-section` (rgba(244,69,255,0.9)), `color/guide-margin` (rgba(255,201,145,0.5))
- `color/text/text` (#be00ca) — 이름이 자기참조적("text.text")이고 값도 동일 계열의 비정상 색상

## Radius

| Figma 변수명 (primitives(atomic).light.radious / tokens(color).radius) | CSS Property           | 값  | 참조                                |
| ---------------------------------------------------------------------- | ---------------------- | --- | ----------------------------------- |
| radious/1 (primitive)                                                  | `--radius-primitive-1` | 1px | —                                   |
| radious/2 (primitive)                                                  | `--radius-primitive-2` | 2px | —                                   |
| radious/4 (primitive)                                                  | `--radius-primitive-4` | 4px | —                                   |
| radious/6 (primitive)                                                  | `--radius-primitive-6` | 6px | —                                   |
| radious/8 (primitive)                                                  | `--radius-primitive-8` | 8px | —                                   |
| radius/none                                                            | `--radius-none`        | 0px | 리터럴(0에 해당하는 primitive 없음) |
| radius/xs                                                              | `--radius-xs`          | 1px | radius.primitive.1                  |
| radius/sm                                                              | `--radius-sm`          | 2px | radius.primitive.2                  |
| radius/md                                                              | `--radius-md`          | 4px | radius.primitive.4                  |
| radius/lg                                                              | `--radius-lg`          | 6px | radius.primitive.6                  |
| radius/xl                                                              | `--radius-xl`          | 8px | radius.primitive.8                  |

> Figma 원본 키 이름은 `radious`(오타로 추정)이며, JSON/CSS에서는 `radius`로 정규화했습니다.

## Spacing

### 범용 스케일 (tokens(color).spacing)

| Figma 변수명 | CSS Property     | 값   | 참조                 |
| ------------ | ---------------- | ---- | -------------------- |
| spacing/none | `--spacing-none` | 0px  | 리터럴               |
| spacing/5xs  | `--spacing-5xs`  | 2px  | spacing.primitive.2  |
| spacing/4xs  | `--spacing-4xs`  | 4px  | spacing.primitive.4  |
| spacing/3xs  | `--spacing-3xs`  | 5px  | spacing.primitive.5  |
| spacing/2xs  | `--spacing-2xs`  | 6px  | spacing.primitive.6  |
| spacing/xs   | `--spacing-xs`   | 8px  | spacing.primitive.8  |
| spacing/sm   | `--spacing-sm`   | 12px | spacing.primitive.12 |
| spacing/md   | `--spacing-md`   | 16px | spacing.primitive.16 |
| spacing/lg   | `--spacing-lg`   | 20px | spacing.primitive.20 |
| spacing/xl   | `--spacing-xl`   | 24px | spacing.primitive.24 |
| spacing/2xl  | `--spacing-2xl`  | 28px | spacing.primitive.28 |
| spacing/3xl  | `--spacing-3xl`  | 32px | spacing.primitive.32 |
| spacing/4xl  | `--spacing-4xl`  | 36px | spacing.primitive.36 |
| spacing/5xl  | `--spacing-5xl`  | 40px | spacing.primitive.40 |

primitive 스케일(2/4/5/6/8/12/16/20/24/28/32/36/40px)은 `--spacing-primitive-*`로 노출됩니다.

### 컴포넌트 전용 (tokens(spacing).spacing['button,-box'])

| Figma 변수명                    | CSS Property                       | 값   |
| ------------------------------- | ---------------------------------- | ---- |
| spacing/button,-box/px/2xs      | `--spacing-button-box-px-2xs`      | 2px  |
| spacing/button,-box/px/xs       | `--spacing-button-box-px-xs`       | 4px  |
| spacing/button,-box/px/sm       | `--spacing-button-box-px-sm`       | 6px  |
| spacing/button,-box/px/md       | `--spacing-button-box-px-md`       | 8px  |
| spacing/button,-box/px/lg       | `--spacing-button-box-px-lg`       | 12px |
| spacing/button,-box/px/xl       | `--spacing-button-box-px-xl`       | 16px |
| spacing/button,-box/py/sm       | `--spacing-button-box-py-sm`       | 0px  |
| spacing/button,-box/py/md       | `--spacing-button-box-py-md`       | 2px  |
| spacing/button,-box/py/lg       | `--spacing-button-box-py-lg`       | 4px  |
| spacing/button,-box/py/xl       | `--spacing-button-box-py-xl`       | 6px  |
| spacing/button,-box/py/2xl      | `--spacing-button-box-py-2xl`      | 8px  |
| spacing/button,-box/py/3xl      | `--spacing-button-box-py-3xl`      | 12px |
| spacing/button,-box/gap/sm      | `--spacing-button-box-gap-sm`      | 2px  |
| spacing/button,-box/gap/default | `--spacing-button-box-gap-default` | 4px  |

## Typography

`textStyles_raw.json`(21개 텍스트 스타일) 기준. font-family/font-weight는 아래 primitive를 공통 참조합니다.

- `--typography-font-family-pretendard-gov`: 'Pretendard GOV' ⚠️ (foundations(style)의 원본 값 'ptdg'는 CSS에 부적합해 실사용 표기로 대체 — 확인 필요)
- `--typography-font-family-samsung-sharp-sans`: 'Samsung Sharp Sans'
- `--typography-font-weight-regular`: 400 / `--typography-font-weight-medium`: 500 / `--typography-font-weight-semibold`: 600 / `--typography-font-weight-bold`: 700 (Regular/Medium/SemiBold는 표준 CSS 매핑 관례 적용, Bold만 foundations(style) 원본과 매칭 확인됨)

| Figma 텍스트 스타일    | CSS Property 접두사                     | font-family        | font-weight | font-size                                                       | letter-spacing | text-transform |
| ---------------------- | --------------------------------------- | ------------------ | ----------- | --------------------------------------------------------------- | -------------- | -------------- |
| label/xl-16-500        | `--typography-label-xl-16-500-*`        | Pretendard GOV     | 500         | 16px                                                            | 0              | none           |
| label/lg-14-500        | `--typography-label-lg-14-500-*`        | Pretendard GOV     | 500         | 14px                                                            | 0              | none           |
| label/md-14-400        | `--typography-label-md-14-400-*`        | Pretendard GOV     | 400         | 14px                                                            | 0              | none           |
| label/sm-12-500        | `--typography-label-sm-12-500-*`        | Pretendard GOV     | 500         | 12px                                                            | 0              | none           |
| label/xs-12-400        | `--typography-label-xs-12-400-*`        | Pretendard GOV     | 400         | 12px                                                            | 0              | none           |
| label/xxs-11-400       | `--typography-label-xxs-11-400-*`       | Pretendard GOV     | 400         | 11px                                                            | 0              | none           |
| body/lg-16-500         | `--typography-body-lg-16-500-*`         | Pretendard GOV     | 500         | 16px                                                            | 0              | none           |
| body/md-14-400         | `--typography-body-md-14-400-*`         | Pretendard GOV     | 400         | 14px                                                            | 0              | none           |
| body/sm-12-400         | `--typography-body-sm-12-400-*`         | Pretendard GOV     | 400         | 12px                                                            | 0              | none           |
| heading/2xl-44-600 ⚠️  | `--typography-heading-2xl-44-600-*`     | Pretendard GOV     | 600         | 44px (font-size는 원본 키 `sok_heading` 추정값 참조, 확인 필요) | 0              | none           |
| heading/xl-32-600      | `--typography-heading-xl-32-600-*`      | Pretendard GOV     | 600         | 32px                                                            | 0              | none           |
| heading/lg-24-600      | `--typography-heading-lg-24-600-*`      | Pretendard GOV     | 600         | 24px                                                            | 0              | none           |
| heading/md-20-600      | `--typography-heading-md-20-600-*`      | Pretendard GOV     | 600         | 20px                                                            | 0              | none           |
| heading/sm-16-600      | `--typography-heading-sm-16-600-*`      | Pretendard GOV     | 600         | 16px                                                            | 0              | none           |
| heading/xs-14-500      | `--typography-heading-xs-14-500-*`      | Pretendard GOV     | 500         | 14px                                                            | 0              | none           |
| heading/2xs-12-500     | `--typography-heading-2xs-12-500-*`     | Pretendard GOV     | 500         | 12px                                                            | 0              | none           |
| heading-sss/2xl-40-700 | `--typography-heading-sss-2xl-40-700-*` | Samsung Sharp Sans | 700         | 40px                                                            | 0              | none           |
| heading-sss/xl-28-700  | `--typography-heading-sss-xl-28-700-*`  | Samsung Sharp Sans | 700         | 28px                                                            | 0              | none           |
| heading-sss/lg-22-700  | `--typography-heading-sss-lg-22-700-*`  | Samsung Sharp Sans | 700         | 22px                                                            | 0              | none           |
| heading-sss/md-19-700  | `--typography-heading-sss-md-19-700-*`  | Samsung Sharp Sans | 700         | 19px                                                            | 0              | none           |
| heading-sss/sm-13-700  | `--typography-heading-sss-sm-13-700-*`  | Samsung Sharp Sans | 700         | 13px                                                            | 0              | none           |

각 스타일은 5개의 CSS 커스텀 프로퍼티(`-font-family`, `-font-weight`, `-font-size`, `-letter-spacing`, `-text-transform`)로 분해되어 있습니다 (예: `--typography-label-md-14-400-font-size`).

## 보류 항목 — Dark 모드 (미포함, 결정 필요)

`tokens_raw.json`의 `primitives(atomic).dark`에 라이트와 병렬 구조의 dark 섹션이 존재하지만, 이번 토큰화에는 **포함하지 않았습니다.** 이유:

1. `dark.colors.red.*` 전 스텝(050~950)이 예외 없이 전부 `#ffffff`로만 채워져 있어, 정상적인 색상 스케일이 아니라 미완성/placeholder 데이터로 판단됨.
2. `dark.sok_heading`의 값이 숫자가 아니라 리터럴 문자열 `"String value"`로, Figma가 값이 지정되지 않은 변수에 자동으로 채우는 기본 placeholder로 보임.
3. `dark.spacing.5`가 `4px`로 되어 있어 light의 동일 키(`5px`)와 불일치 — spacing은 원래 테마 불문 동일해야 하므로 데이터 신뢰도 문제로 판단됨.
4. 이 프로젝트(코드/가이드 어디에도) 다크 테마 CSS 적용 방식(`[data-theme]` 속성 vs `prefers-color-scheme` 미디어쿼리 vs 별도 파일)에 대한 기존 컨벤션이 없어, 데이터 품질과 별개로 아키텍처 결정이 필요함.

**진행하려면:** (a) dark 데이터를 Figma에서 다시 정리/완성해야 하는지, (b) 완성되면 어떤 방식으로 CSS에 반영할지 결정이 필요합니다. 결정 전까지 라이트 테마만 지원합니다.

## Claude용 규칙

1. Figma MCP가 hex 색상 반환 → 이 테이블에서 찾아서 `var(--color-*)` 사용
2. Figma가 스페이싱/라디우스 숫자 반환 → `var(--spacing-*)` / `var(--radius-*)` 매핑
3. Figma 텍스트 스타일 → `var(--typography-*)` 세트(font-family/weight/size/letter-spacing/text-transform) 매핑
4. 테이블에 없는 값 → 새 변수 만들지 말고 `/* ⚠️ 누락된 토큰 */` 플래그
5. `⚠️` 표시된 항목은 alias/값이 추정이므로 실제 사용 전 Figma 원본 재확인 권장
