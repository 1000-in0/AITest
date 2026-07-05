import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Figma: text-single (Box > Text > text-single)
 * https://www.figma.com/design/EactU9SQsOXYD5e50gFPJ3/Library_AI_Test?node-id=13828-11147
 *
 * Figma variant -> React 구현 매핑
 *  - size (sm/md/lg)                    -> size
 *  - state (enabled/hover-pressed/disabled/activated(inputfield)/populated/populated_hover)
 *      -> 실제 <input> 요소의 네이티브 상태를 그대로 사용 (별도 state prop 없음):
 *         enabled/hover-pressed -> CSS :hover
 *         activated(inputfield) -> CSS :focus (focus-within, 컨테이너 보더)
 *         populated/populated_hover -> CSS :not(:placeholder-shown) (+ :hover)
 *         disabled -> disabled?: boolean (다른 상태보다 항상 우선)
 *  - activated 상태 텍스트/보더 색상: Figma는 text/gray-2-tertiary, border/button-secondary/activated를
 *    참조하지만(값은 동일), box 전용 시맨틱 토큰(--color-text-box-default, --color-border-box-select-activated)으로
 *    정규화해서 사용 (사용자 승인 결정).
 *  - buttonInfo/xDelete -> showInfoButton/showClearButton (+ infoIcon/clearIcon으로 커스텀 아이콘 대체 가능).
 *    실제 클릭 핸들러 로직(정보 툴팁, 값 지우기)은 이번 구현 범위 밖 - 표시 여부만 제어.
 *  - textMessageDefault/Emphasized/Danger -> message + messageType('default'|'emphasized'|'danger')
 */

export type BoxTextSingleSize = "sm" | "md" | "lg";
export type BoxTextSingleMessageType = "default" | "emphasized" | "danger";

export interface BoxTextSingleProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** 텍스트박스 크기. Figma: size (sm/md/lg). 기본값 'md'. */
  size?: BoxTextSingleSize;
  /** 하단에 표시할 메시지 텍스트. 없으면 메시지 영역 자체가 렌더링되지 않는다. */
  message?: string;
  /** 메시지 색상 타입. Figma의 상호 배타적인 boolean 3종(default/emphasized/danger)을 단일 enum으로 정규화. */
  messageType?: BoxTextSingleMessageType;
  /** info 아이콘 슬롯 표시 여부. */
  showInfoButton?: boolean;
  /** clear(x) 아이콘 슬롯 표시 여부. */
  showClearButton?: boolean;
  /** info 아이콘 커스텀 노드. 전달하지 않으면 기본 placeholder box가 렌더링된다. */
  infoIcon?: ReactNode;
  /** clear 아이콘 커스텀 노드. 전달하지 않으면 기본 placeholder box가 렌더링된다. */
  clearIcon?: ReactNode;
}

/**
 * size별 컨테이너 height / min-width / 좌우 padding.
 * md 사이즈 이상은 pl=px-md(8)/pr=px-sm(6), sm만 pl=px-sm(6)/pr=px-xs(4) - Figma 원본 값 그대로.
 * padding-top/bottom은 컨테이너 자체에는 없음 (0) - 세로 정렬은 아래 텍스트 wrapper의 py로 처리.
 */
const SIZE_CONTAINER_CLASSES: Record<BoxTextSingleSize, string> = {
  sm: "h-[20px] min-w-[120px] pl-[var(--spacing-button-box-px-sm)] pr-[var(--spacing-button-box-px-xs)]",
  md: "h-[24px] min-w-[120px] pl-[var(--spacing-button-box-px-md)] pr-[var(--spacing-button-box-px-sm)]",
  lg: "h-[28px] min-w-[120px] pl-[var(--spacing-button-box-px-md)] pr-[var(--spacing-button-box-px-sm)]",
};

/**
 * size별 텍스트 wrapper 자체의 padding-top/bottom (컨테이너 padding과 별개의 레이어).
 * sm만 3px, md/lg는 4px - Figma에서 sm/md/lg 각 state를 개별 재조회해 확인함
 * (3+line-height14+3=20px, 4+line-height20+4=28px로 각 컨테이너 실측 height와 정확히 일치 - 근거 확인 완료).
 * TODO: textbox 전용 spacing 토큰 부재. md/lg의 4px는 --spacing-button-box-py-lg 값과 동일하지만
 * 이름 그대로 버튼 전용 토큰이라 재사용 시 의도치 않게 두 컴포넌트가 결합될 수 있어 리터럴 값 유지 (사용자 결정).
 * 추후 textbox 전용 spacing 토큰 필요성을 별도로 검토할 것.
 */
const TEXT_WRAP_PY_CLASSES: Record<BoxTextSingleSize, string> = {
  sm: "py-[3px]",
  md: "py-[4px]",
  lg: "py-[4px]",
};

/**
 * size별 라벨(입력값/placeholder) 타이포그래피.
 * md/lg는 완전히 동일한 텍스트 스타일(label/md-14-400)을 공유 - Figma 원본 확인됨.
 * line-height는 디자인 토큰이 없어 리터럴 값 사용.
 */
const TEXT_SIZE_CLASSES: Record<BoxTextSingleSize, string> = {
  // TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[14px]를 var(--typography-*-line-height)로 교체
  sm: "text-[length:var(--typography-label-xs-12-400-font-size)] tracking-[var(--typography-label-xs-12-400-letter-spacing)] [font-weight:var(--typography-font-weight-regular)] leading-[14px]",
  // TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[20px]를 var(--typography-*-line-height)로 교체
  md: "text-[length:var(--typography-label-md-14-400-font-size)] tracking-[var(--typography-label-md-14-400-letter-spacing)] [font-weight:var(--typography-font-weight-regular)] leading-[20px]",
  // TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[20px]를 var(--typography-*-line-height)로 교체
  lg: "text-[length:var(--typography-label-md-14-400-font-size)] tracking-[var(--typography-label-md-14-400-letter-spacing)] [font-weight:var(--typography-font-weight-regular)] leading-[20px]",
};

/**
 * 컨테이너(테두리 박스) 공통 스타일.
 * 배경/보더는 상태와 무관한 기본값만 포함, 상태별 변화는 has-[]/hover 의사클래스로 처리.
 *  - hover: 보더만 hover색으로 변경 (배경 유지)
 *  - has-[:focus] (activated): 보더가 box 전용 activated색으로 변경 - 다른 상태보다 우선(!)
 *  - has-[:disabled]: 배경이 disabled색으로 변경 - 항상 최우선(!)
 *  - populated/populated_hover: 보더 색상이 enabled/hover와 동일해 별도 클래스 불필요 (Figma 확인됨)
 */
const CONTAINER_BASE_CLASSES = [
  "inline-flex items-center",
  "border border-solid",
  "rounded-[var(--radius-sm)]",
  "bg-[var(--color-component-box-box-default)]",
  "gap-[var(--spacing-button-box-gap-default)]",
  "border-[var(--color-border-box-enabled-disabled-selected)]",
  "hover:border-[var(--color-border-box-hover-selected-hover)]",
  "has-[:focus]:border-[var(--color-border-box-select-activated)]!",
  "has-[:disabled]:bg-[var(--color-component-box-box-disabled)]!",
].join(" ");

/**
 * 입력 요소(input) 자체 스타일.
 *  - placeholder(빈 값): hint색
 *  - :not(:placeholder-shown) (populated, 값 있음): selected색
 *  - :focus (activated): box 전용 default색 - populated보다 우선(!)
 *  - :disabled: disabled색 - 항상 최우선(!, placeholder 포함)
 */
const INPUT_BASE_CLASSES = [
  "w-full min-w-0 border-0 bg-transparent outline-none",
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "placeholder:text-[color:var(--color-text-box-hint)]",
  "[&:not(:placeholder-shown)]:text-[color:var(--color-text-box-selected)]",
  "focus:text-[color:var(--color-text-box-default)]!",
  "disabled:text-[color:var(--color-text-box-disabled)]!",
  "disabled:placeholder:text-[color:var(--color-text-box-disabled)]!",
  "disabled:cursor-not-allowed",
].join(" ");

/**
 * 아이콘 placeholder box. 16x16 고정 (텍스트박스 사이즈와 무관, BtnBrand와 동일 패턴).
 */
const ICON_SLOT_CLASSES =
  "BoxTextSingle__iconSlot inline-block shrink-0 size-[16px] rounded-[var(--radius-xs)] border border-solid border-current";

/** 하단 메시지 공통 스타일. 컨테이너 전체 폭 기준 우측 정렬. */
const MESSAGE_BASE_CLASSES = [
  "block w-full text-right",
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-label-xxs-11-400-font-size)]",
  "tracking-[var(--typography-label-xxs-11-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  // TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[12px]를 var(--typography-*-line-height)로 교체
  "leading-[12px]",
].join(" ");

const MESSAGE_TYPE_CLASSES: Record<BoxTextSingleMessageType, string> = {
  default: "text-[color:var(--color-text-gray-6-septenary)]",
  emphasized: "text-[color:var(--color-text-brand)]",
  danger: "text-[color:var(--color-text-danger)]",
};

function joinClassNames(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

export function BoxTextSingle({
  size = "md",
  message,
  messageType = "default",
  showInfoButton = false,
  showClearButton = false,
  infoIcon,
  clearIcon,
  className,
  type = "text",
  ...rest
}: BoxTextSingleProps) {
  const showIcons = showInfoButton || showClearButton;

  return (
    <div
      className={joinClassNames(
        "BoxTextSingle inline-flex flex-col",
        className,
      )}
    >
      <div
        className={joinClassNames(
          CONTAINER_BASE_CLASSES,
          SIZE_CONTAINER_CLASSES[size],
        )}
      >
        <span
          className={joinClassNames(
            "BoxTextSingle__textWrap inline-flex items-center flex-1 min-w-0",
            TEXT_WRAP_PY_CLASSES[size],
          )}
        >
          <input
            type={type}
            className={joinClassNames(
              "BoxTextSingle__input",
              INPUT_BASE_CLASSES,
              TEXT_SIZE_CLASSES[size],
            )}
            {...rest}
          />
        </span>
        {showIcons && (
          <span className="BoxTextSingle__icons inline-flex items-center shrink-0 gap-[var(--spacing-5xs)]">
            {showClearButton &&
              (clearIcon ?? (
                <span className={ICON_SLOT_CLASSES} aria-hidden="true" />
              ))}
            {showInfoButton &&
              (infoIcon ?? (
                <span className={ICON_SLOT_CLASSES} aria-hidden="true" />
              ))}
          </span>
        )}
      </div>
      {message && (
        <span
          className={joinClassNames(
            "BoxTextSingle__message",
            MESSAGE_BASE_CLASSES,
            MESSAGE_TYPE_CLASSES[messageType],
          )}
        >
          {message}
        </span>
      )}
    </div>
  );
}
