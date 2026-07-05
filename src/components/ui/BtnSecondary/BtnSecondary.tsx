import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Figma: btn_2ndary
 * https://www.figma.com/design/EactU9SQsOXYD5e50gFPJ3/Library_AI_Test?node-id=13826-18407
 *
 * Figma variant -> React prop 매핑
 *  - size (sm/md/lg)                         -> size
 *  - icon (none/before/after/only)           -> iconPosition ('none'/'left'/'right'/'only')
 *  - state (enabled/hover-pressed/disabled/activated/activated_hover/selected)
 *      - enabled / hover-pressed              -> state='default' + CSS :hover, :active 의사클래스 (props 아님)
 *      - activated / activated_hover          -> state='activated' + CSS :hover, :active 의사클래스
 *      - selected                              -> state='selected' (Figma에 hover variant 없음)
 *      - disabled                              -> disabled?: boolean (state와 무관하게 항상 우선 적용)
 */

export type BtnSecondarySize = "sm" | "md" | "lg";
export type BtnSecondaryIconPosition = "left" | "right" | "only" | "none";
export type BtnSecondaryState = "default" | "activated" | "selected";

export interface BtnSecondaryProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** 버튼 크기. Figma: size (sm/md/lg). 기본값 'md'. */
  size?: BtnSecondarySize;
  /**
   * 아이콘 위치. Figma: icon (before/after/only/none).
   * 'left' = icon before, 'right' = icon after, 'only' = icon only(텍스트 없음), 'none' = 텍스트만(기본값).
   */
  iconPosition?: BtnSecondaryIconPosition;
  /**
   * 실제 아이콘 노드. 전달하지 않으면 iconPosition !== 'none'일 때
   * 기본 placeholder box(빈 사각형, `.BtnSecondary__iconSlot`)가 자동 렌더링된다.
   */
  icon?: ReactNode;
  /**
   * Figma state 중 activated/selected에 대응. 'default'는 enabled/hover-pressed를 포함(CSS 의사클래스 처리).
   * disabled=true일 때는 state 값과 무관하게 항상 disabled 스타일이 우선 적용된다 (Figma에 disabled+activated/selected 조합 없음).
   */
  state?: BtnSecondaryState;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

/** size별 버튼 박스 height/min-width. 아이콘 위치와 무관하게 고정. */
const HEIGHT_CLASSES: Record<BtnSecondarySize, string> = {
  sm: "h-[20px] min-w-[36px]",
  md: "h-[24px] min-w-[44px]",
  lg: "h-[28px] min-w-[48px]",
};

/** size별 버튼 박스 padding-top/bottom. 토큰: spacing/button,-box/py/{sm,md,lg} */
const PY_CLASSES: Record<BtnSecondarySize, string> = {
  sm: "py-[var(--spacing-button-box-py-sm)]",
  md: "py-[var(--spacing-button-box-py-md)]",
  lg: "py-[var(--spacing-button-box-py-lg)]",
};

/**
 * size별 버튼 박스 padding-left/right.
 * md 사이즈만 아이콘 위치(before/after)에 따라 좌우 padding이 비대칭 - Figma 원본 값 그대로 재현.
 * sm/lg는 아이콘 위치와 무관하게 항상 대칭 (Figma 소스 자체의 일관성 이슈로 보이나 원본 충실 재현 우선).
 */
function getPxClasses(
  size: BtnSecondarySize,
  iconPosition: BtnSecondaryIconPosition,
): string {
  if (size === "md") {
    if (iconPosition === "left") {
      return "pl-[var(--spacing-button-box-px-sm)] pr-[var(--spacing-button-box-px-md)]";
    }
    if (iconPosition === "right") {
      return "pl-[var(--spacing-button-box-px-md)] pr-[var(--spacing-button-box-px-sm)]";
    }
    return "px-[var(--spacing-button-box-px-md)]";
  }
  if (size === "sm") {
    return "px-[var(--spacing-button-box-px-sm)]";
  }
  return "px-[var(--spacing-button-box-px-md)]";
}

/** size별 icon-only(정사각형) 레이아웃. 텍스트가 없어 gap 불필요. */
const ICON_ONLY_SIZE_CLASSES: Record<BtnSecondarySize, string> = {
  sm: "size-[20px] px-[var(--spacing-button-box-px-sm)] py-[var(--spacing-button-box-py-sm)]",
  md: "size-[24px] px-[var(--spacing-button-box-px-md)] py-[var(--spacing-button-box-py-md)]",
  lg: "size-[28px] px-[var(--spacing-button-box-px-md)] py-[var(--spacing-button-box-py-lg)]",
};

/**
 * size별 라벨 타이포그래피.
 * 텍스트 레이어 자체에는 padding이 없음 (Figma에서 명시적으로 확인 - BtnBrand와 다른 점).
 * line-height는 디자인 토큰이 존재하지 않아 리터럴 값 사용.
 */
const TEXT_SIZE_CLASSES: Record<BtnSecondarySize, string> = {
  // TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[14px]를 var(--typography-*-line-height)로 교체
  sm: "text-[length:var(--typography-label-xs-12-400-font-size)] tracking-[var(--typography-label-xs-12-400-letter-spacing)] [font-weight:var(--typography-font-weight-regular)] leading-[14px]",
  // TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[20px]를 var(--typography-*-line-height)로 교체
  md: "text-[length:var(--typography-label-md-14-400-font-size)] tracking-[var(--typography-label-md-14-400-letter-spacing)] [font-weight:var(--typography-font-weight-regular)] leading-[20px]",
  // TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[20px]를 var(--typography-*-line-height)로 교체
  lg: "text-[length:var(--typography-label-lg-14-500-font-size)] tracking-[var(--typography-label-lg-14-500-letter-spacing)] [font-weight:var(--typography-font-weight-medium)] leading-[20px]",
};

/**
 * 버튼 공통 스타일. 배경/보더/텍스트는 상태(state)와 무관한 부분만 여기 포함.
 * disabled는 state보다 항상 우선 (Figma에 disabled+activated/selected 조합이 없음).
 */
const BASE_CLASSES = [
  "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
  "border border-solid cursor-pointer",
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "rounded-[var(--radius-sm)]",
  "bg-[var(--color-component-button-secondary-default)]",
  "disabled:bg-[var(--color-component-button-secondary-disabled)]",
  "disabled:border-[var(--color-border-button-secondary-enabled)]",
  "disabled:text-[color:var(--color-text-button-secondary-disabled)]",
  "disabled:cursor-not-allowed disabled:pointer-events-none",
].join(" ");

/**
 * state별 보더/텍스트 색상.
 *  - default: hover/pressed 시 보더만 hover색으로 변경 (배경 유지 - 의도된 디자인)
 *  - activated: hover/pressed 시 보더가 activated-hover(focused)색으로 변경 (배경 유지)
 *  - selected: Figma에 hover variant가 없어 hover 스타일 미적용, 배경도 selected 전용색 사용
 */
const STATE_CLASSES: Record<BtnSecondaryState, string> = {
  default: [
    "border-[var(--color-border-button-secondary-enabled)]",
    "hover:border-[var(--color-border-button-secondary-hover)]",
    "active:border-[var(--color-border-button-secondary-hover)]",
    "text-[color:var(--color-text-button-secondary-default)]",
  ].join(" "),
  activated: [
    "border-[var(--color-border-button-secondary-activated)]",
    "hover:border-[var(--color-border-button-secondary-activated-hover)]",
    "active:border-[var(--color-border-button-secondary-activated-hover)]",
    "text-[color:var(--color-text-button-secondary-activated)]",
  ].join(" "),
  selected: [
    "bg-[var(--color-component-button-secondary-selected)]",
    "border-[var(--color-border-button-secondary-selected)]",
    "text-[color:var(--color-text-button-secondary-activated)]",
  ].join(" "),
};

/**
 * 아이콘 placeholder box. 16x16 고정 (Figma 아이콘 슬롯 크기 - 별도 spacing 토큰 없이 컴포넌트 고정값).
 * 배경 투명 + border: 1px solid currentColor. 버튼 텍스트 색을 그대로 상속한다.
 */
const ICON_SLOT_CLASSES =
  "BtnSecondary__iconSlot inline-block shrink-0 size-[16px] rounded-[var(--radius-xs)] border border-solid border-current";

function joinClassNames(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

export function BtnSecondary({
  size = "md",
  iconPosition = "none",
  icon,
  state = "default",
  disabled = false,
  children,
  className,
  type = "button",
  ...rest
}: BtnSecondaryProps) {
  const isIconOnly = iconPosition === "only";
  const showLeftIcon = iconPosition === "left";
  const showRightIcon = iconPosition === "right";
  const showIcon = isIconOnly || showLeftIcon || showRightIcon;

  const sizeClasses = isIconOnly
    ? ICON_ONLY_SIZE_CLASSES[size]
    : joinClassNames(
        HEIGHT_CLASSES[size],
        getPxClasses(size, iconPosition),
        PY_CLASSES[size],
        showIcon && "gap-[var(--spacing-button-box-gap-default)]",
      );

  const iconNode = showIcon
    ? (icon ?? <span className={ICON_SLOT_CLASSES} aria-hidden="true" />)
    : null;

  return (
    <button
      type={type}
      disabled={disabled}
      className={joinClassNames(
        BASE_CLASSES,
        sizeClasses,
        STATE_CLASSES[state],
        className,
      )}
      {...rest}
    >
      {showLeftIcon && iconNode}
      {!isIconOnly && children != null && (
        <span
          className={joinClassNames(
            "BtnSecondary__label",
            TEXT_SIZE_CLASSES[size],
          )}
        >
          {children}
        </span>
      )}
      {showRightIcon && iconNode}
      {isIconOnly && iconNode}
    </button>
  );
}
