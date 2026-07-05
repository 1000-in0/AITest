import StyleDictionary from "style-dictionary";

// ── size/px 커스텀 transformGroup ──
// style-dictionary 기본 "css" transformGroup은 size/rem을 사용해 dimension 값에
// 단위 변환 없이 "rem"을 그대로 붙인다 (예: "4" -> "4rem", 의도한 "4px"가 아님).
// docs/style-dictionary-guide.md 컨벤션(dimension은 px로 출력)에 맞추기 위해
// 기본 css transformGroup과 동일한 트랜스폼 목록에서 size/rem만 size/px로 교체한다.
StyleDictionary.registerTransformGroup({
  name: "css-px",
  transforms: [
    "attribute/cti",
    "name/kebab",
    "time/seconds",
    "html/icon",
    "size/px",
    "color/css",
    "asset/url",
    "fontFamily/css",
    "cubicBezier/css",
    "strokeStyle/css/shorthand",
    "border/css/shorthand",
    "typography/css/shorthand",
    "transition/css/shorthand",
    "shadow/css/shorthand",
  ],
});

// ── 빌드 설정 ──
const sd = new StyleDictionary({
  source: ["tokens/**/*.json"],
  platforms: {
    // CSS 출력 (React용)
    css: {
      transformGroup: "css-px",
      buildPath: "src/tokens/",
      files: [
        {
          destination: "_generated.css",
          format: "css/variables",
          options: {
            outputReferences: true, // var(--xxx) 참조 구조 유지
          },
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log("\n✅ Style Dictionary 빌드 완료");
console.log("   CSS → src/tokens/_generated.css");
