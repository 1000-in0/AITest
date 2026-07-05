import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Figma: BtnBrandPrimary
 * https://www.figma.com/design/EactU9SQsOXYD5e50gFPJ3/Library_AI_Test?node-id=11153-21743
 *
 * Figma variant -> React prop 매핑
 *  - size (sm/md/lg)                    -> size
 *  - icon (none/before/after/only)      -> iconPosition ('none'/'left'/'right'/'only')
 *  - state (enabled/hover-pressed/disabled)
 *      - enabled / hover-pressed         -> CSS :hover, :active 의사클래스 (props 아님)
 *      - disabled                        -> disabled?: boolean
 */

export type BtnBrandSize = "sm" | "md" | "lg";
export type BtnBrandIconPosition = "left" | "right" | "only" | "none";

export interface BtnBrandProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** 버튼 크기. Figma: size (sm/md/lg). 기본값 'md'. */
  size?: BtnBrandSize;
  /**
   * 아이콘 위치. Figma: icon (before/after/only/none).
   * 'left' = icon before, 'right' = icon after, 'only' = icon only(텍스트 없음), 'none' = 텍스트만(기본값).
   */
  iconPosition?: BtnBrandIconPosition;
  /**
   * 실제 아이콘 노드. 전달하지 않으면 iconPosition !== 'none'일 때
   * 기본 placeholder box(빈 사각형, `.BtnBrand__iconSlot`)가 자동 렌더링된다.
   * iconPosition === 'none'인 경우 icon을 전달해도 렌더링되지 않는다 (Figma 원본에 아이콘 슬롯 자체가 없음).
   */
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

/**
 * size별 버튼 박스 레이아웃 (텍스트 포함 variant: none/left/right).
 * 토큰: spacing/button,-box/px,py, spacing/button,-box/gap/default, radius/sm(버튼 공통, BASE_CLASSES에 적용)
 */
const SIZE_LAYOUT_CLASSES: Record<BtnBrandSize, string> = {
  sm: "h-[20px] min-w-[36px] px-[var(--spacing-button-box-px-sm)] py-[var(--spacing-button-box-py-sm)] gap-[var(--spacing-button-box-gap-default)]",
  md: "h-[24px] min-w-[44px] px-[var(--spacing-button-box-px-md)] py-[var(--spacing-button-box-py-md)] gap-[var(--spacing-button-box-gap-default)]",
  // TODO: Figma 재확인 필요 - lg+iconPosition='left'+enabled(state=enabled) 조합은
  // get_design_context 응답에서 height:28px 클래스가 다른 lg 조합과 달리 명시적으로 확인되지 않았음.
  // 현재 값은 다른 lg 조합(before/after/none 공통 height)과 py(4px)+line-height(20px) 계산으로 유추한 값.
  lg: "h-[28px] min-w-[48px] px-[var(--spacing-button-box-px-md)] py-[var(--spacing-button-box-py-lg)] gap-[var(--spacing-button-box-gap-default)]",
};

/** size별 icon-only(정사각형) 레이아웃. 텍스트가 없어 gap 불필요. */
const ICON_ONLY_SIZE_CLASSES: Record<BtnBrandSize, string> = {
  sm: "size-[20px] px-[var(--spacing-button-box-px-sm)] py-[var(--spacing-button-box-py-sm)]",
  md: "size-[24px] px-[var(--spacing-button-box-px-md)] py-[var(--spacing-button-box-py-md)]",
  lg: "size-[28px] px-[var(--spacing-button-box-px-md)] py-[var(--spacing-button-box-py-lg)]",
};

/**
 * size별 라벨 타이포그래피.
 * font-size/font-weight/letter-spacing은 토큰(docs/design-tokens.md Typography) 참조.
 * line-height는 현재 디자인 토큰이 존재하지 않아 리터럴 값 사용 (TODO 참고).
 * py(텍스트박스 자체의 padding-top/bottom)도 Figma 재확인 결과 필요하나 전용 토큰이 없어 리터럴 값 사용 (TODO 참고).
 * 	sm=3px는 spacing primitive 스케일(2/4/5/6/8/12...)에 대응값이 없어 특히 임시값.
 */
const TEXT_SIZE_CLASSES: Record<BtnBrandSize, string> = {
  // TODO: line-height, py 디자인 토큰 부재 - 토큰 추가 시 leading-[14px]/py-[3px]를 var(--*) 토큰으로 교체
  // TODO: py-[3px] - spacing primitive에 3 자체가 없음. 디자인 시스템 전체 검토 시 정식 토큰 승격 여부 결정 필요.
  sm: "text-[length:var(--typography-label-xs-12-400-font-size)] tracking-[var(--typography-label-xs-12-400-letter-spacing)] [font-weight:var(--typography-font-weight-regular)] leading-[14px] py-[3px]",
  // TODO: line-height, py 디자인 토큰 부재 - 토큰 추가 시 leading-[20px]/py-[2px]를 var(--*) 토큰으로 교체
  md: "text-[length:var(--typography-label-md-14-400-font-size)] tracking-[var(--typography-label-md-14-400-letter-spacing)] [font-weight:var(--typography-font-weight-regular)] leading-[20px] py-[2px]",
  // TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[20px]를 var(--typography-*-line-height)로 교체
  // 참고: lg의 텍스트박스 py는 Figma 재확인 전이라 기존 값(padding 없음) 유지.
  lg: "text-[length:var(--typography-label-lg-14-500-font-size)] tracking-[var(--typography-label-lg-14-500-letter-spacing)] [font-weight:var(--typography-font-weight-medium)] leading-[20px]",
};

/** 버튼 공통 스타일. hover/active/disabled는 CSS 의사클래스로 처리 (Figma의 hover/pressed 통합 variant 반영). */
const BASE_CLASSES = [
  "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
  "border-0 cursor-pointer",
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "rounded-[var(--radius-sm)]",
  "bg-[var(--color-component-button-brand-default)]",
  "hover:bg-[var(--color-component-button-brand-hover)]",
  "active:bg-[var(--color-component-button-brand-hover)]",
  "disabled:bg-[var(--color-component-button-brand-disabled)]",
  "text-[color:var(--color-text-button-brand-default)]",
  "disabled:text-[color:var(--color-text-button-brand-disabled)]",
  "disabled:cursor-not-allowed disabled:pointer-events-none",
].join(" ");

/**
 * 아이콘 placeholder box. 16x16 고정 (Figma 아이콘 슬롯 크기 - 별도 spacing 토큰 없이 컴포넌트 고정값).
 * 배경 투명 + border: 1px solid currentColor. 버튼 텍스트 색(enabled=white, disabled=blue-350)을 그대로 상속한다.
 */
const ICON_SLOT_CLASSES =
  "BtnBrand__iconSlot inline-block shrink-0 size-[16px] rounded-[var(--radius-xs)] border border-solid border-current";

function joinClassNames(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

export function BtnBrand({
  size = "md",
  iconPosition = "none",
  icon,
  disabled = false,
  children,
  className,
  type = "button",
  ...rest
}: BtnBrandProps) {
  const isIconOnly = iconPosition === "only";
  const showLeftIcon = iconPosition === "left";
  const showRightIcon = iconPosition === "right";
  const showIcon = isIconOnly || showLeftIcon || showRightIcon;

  const sizeClasses = isIconOnly
    ? ICON_ONLY_SIZE_CLASSES[size]
    : SIZE_LAYOUT_CLASSES[size];

  const iconNode = showIcon
    ? (icon ?? <span className={ICON_SLOT_CLASSES} aria-hidden="true" />)
    : null;

  return (
    <button
      type={type}
      disabled={disabled}
      className={joinClassNames(BASE_CLASSES, sizeClasses, className)}
      {...rest}
    >
      {showLeftIcon && iconNode}
      {!isIconOnly && children != null && (
        <span
          className={joinClassNames("BtnBrand__label", TEXT_SIZE_CLASSES[size])}
        >
          {children}
        </span>
      )}
      {showRightIcon && iconNode}
      {isIconOnly && iconNode}
    </button>
  );
}
