import type { ReactNode } from "react";

/**
 * Figma: tpss / GNB
 * https://www.figma.com/design/9txPUL4k3jrdE4Dx6eWXAA/tpss?node-id=11310-5539
 *
 * 회사 공식 GNB 컴포넌트가 별도 존재하지만 다른 토큰 이름 체계(예: blue500)를 사용함.
 * 이 프로젝트에서는 회사 이름 체계를 따르지 않고 tokens_raw.json 기반 자체 토큰만 사용해서
 * 시각적으로 동일하게 재구현함 (사용자 지정 결정).
 *
 * Figma 원본 검토 결과 Admin 드롭다운 화살표 / 도움 아이콘 / 프로필 드롭다운 화살표는
 * Figma 파일 자체에서 아직 실제 아이콘이 할당되지 않은 더미 placeholder 상태였음
 * (Guide/Icon-dummy_area-14, #ffd9d7) - 그 값을 그대로 쓰지 않고 간단한 SVG를 직접 그려 대체함
 * (사용자 승인 결정). 검색 아이콘/즐겨찾기 별 아이콘/시계 아이콘도 실제 에셋이 제공되지 않아
 * 동일한 방식(직접 그린 SVG)으로 근사 구현함. VOC Agent 좌측 로고 아이콘은 외부 브랜드 에셋이라
 * BoxTextSingle과 동일한 border 기반 placeholder box로 대체함.
 */

const LOGO_CLASSES = [
  "shrink-0",
  "pr-[var(--spacing-xs)]",
  "[font-family:var(--typography-font-family-samsung-sharp-sans)]",
  "text-[length:var(--typography-heading-sss-md-19-700-font-size)]",
  "tracking-[var(--typography-heading-sss-md-19-700-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-bold)]",
  "leading-[24px]",
  "whitespace-nowrap",
  "text-[color:var(--color-primitive-white)]",
].join(" ");

const MENU_TEXT_CLASSES = [
  "whitespace-nowrap",
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-heading-xs-14-500-font-size)]",
  "tracking-[var(--typography-heading-xs-14-500-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-medium)]",
  "leading-[20px]",
  "text-[color:var(--color-primitive-white)]",
].join(" ");

// Pretendard GOV 12/400 - Figma 원본은 SamsungOneKoreanNoF(SOK) 폰트 + letter-spacing 0.8px였으나
// 프로젝트 토큰에 SOK 폰트 자체가 없어 기존 Pretendard GOV로 대체하고 letter-spacing은 토큰값(0) 유지 (사용자 승인 결정)
const UTILITY_TEXT_CLASSES = [
  "whitespace-nowrap",
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-body-sm-12-400-font-size)]",
  "tracking-[var(--typography-body-sm-12-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  "leading-[14px]",
  "text-[color:var(--color-text-button-ghost-bg-dark)]",
].join(" ");

function SearchIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="shrink-0 text-[color:var(--color-text-button-ghost-bg-dark)]"
      aria-hidden="true"
    >
      <circle
        cx="5.25"
        cy="5.25"
        r="4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8.25 8.25L11 11"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="shrink-0 text-[color:var(--color-primitive-white)]"
      aria-hidden="true"
    >
      <path
        d="M6 1L7.35 4.02L10.5 4.35L8.1 6.44L8.85 9.6L6 7.9L3.15 9.6L3.9 6.44L1.5 4.35L4.65 4.02L6 1Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0 text-[color:var(--color-text-button-ghost-bg-dark)]"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7 4V7L9 8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0 text-[color:var(--color-text-button-ghost-bg-dark)]"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5.5 5.5C5.5 4.4 6.2 3.7 7 3.7C7.8 3.7 8.5 4.3 8.5 5.1C8.5 6.1 7 6.3 7 7.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="7" cy="9.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={`shrink-0 ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GnbDivider() {
  return (
    <div className="Gnb__divider flex h-full shrink-0 items-center px-[var(--spacing-4xs)]">
      {/* TODO: 팔레트에 없는 색상(rgba(255,255,255,0.3)) - white 계열 overlay 토큰이 프로젝트에 없어 리터럴 값 사용 */}
      <span className="block h-[10px] w-px bg-white/30" aria-hidden="true" />
    </div>
  );
}

export interface GnbMenuItemData {
  label: string;
  onClick?: () => void;
}

function GnbMenuItem({ label, onClick }: GnbMenuItemData) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="GnbMenuItem group flex h-[40px] shrink-0 items-center pt-[var(--spacing-button-box-py-lg)] pr-[var(--spacing-button-box-px-sm)] pb-[var(--spacing-button-box-py-lg)] pl-[var(--spacing-button-box-px-md)]"
    >
      <span className={`${MENU_TEXT_CLASSES} group-hover:underline`}>
        {label}
      </span>
    </button>
  );
}

interface GnbUtilityItemProps {
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  badge?: boolean;
  onClick?: () => void;
}

function GnbUtilityItem({
  label,
  icon,
  iconPosition = "left",
  badge = false,
  onClick,
}: GnbUtilityItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="GnbUtilityItem relative flex h-full shrink-0 items-center gap-[var(--spacing-4xs)] px-[var(--spacing-2xs)]"
    >
      {icon && iconPosition === "left" && icon}
      <span className={UTILITY_TEXT_CLASSES}>{label}</span>
      {icon && iconPosition === "right" && icon}
      {badge && (
        <span
          className="absolute top-[2px] right-[2px] size-[6px] shrink-0 rounded-full bg-[var(--color-text-danger)]"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

const DEFAULT_MENU_ITEMS: GnbMenuItemData[] = [
  { label: "종합효율" },
  { label: "TAT생산성" },
  { label: "BRAVO" },
  { label: "기준정보" },
  { label: "혁신정보" },
];

export interface GnbProps {
  logoText?: string;
  menuItems?: GnbMenuItemData[];
  favoriteLabel?: string;
  adminLabel?: string;
  onAdminClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  hasNotification?: boolean;
  profileName?: string;
  timerLabel?: string;
  onHamburgerClick?: () => void;
}

export function Gnb({
  logoText = "TPSS",
  menuItems = DEFAULT_MENU_ITEMS,
  favoriteLabel = "즐겨찾기",
  adminLabel = "Admin",
  onAdminClick,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  hasNotification = true,
  profileName = "이삼성",
  timerLabel = "03:00:11",
  onHamburgerClick,
}: GnbProps) {
  return (
    <header className="Gnb flex h-[43px] w-full shrink-0 items-center justify-between bg-[var(--color-primitive-blue-750)] px-[var(--spacing-sm)] shadow-xs">
      <div className="Gnb__left flex h-full items-center">
        <span className={LOGO_CLASSES}>{logoText}</span>
        <GnbDivider />
        <nav className="flex h-full items-center">
          {menuItems.map((item) => (
            <GnbMenuItem
              key={item.label}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </nav>
        <GnbDivider />
        <button
          type="button"
          className="Gnb__favorite flex h-full shrink-0 items-center gap-[var(--spacing-4xs)] px-[var(--spacing-2xs)]"
        >
          <StarIcon />
          <span className={MENU_TEXT_CLASSES}>{favoriteLabel}</span>
        </button>
        <button
          type="button"
          onClick={onAdminClick}
          className="Gnb__admin flex shrink-0 items-center gap-[var(--spacing-4xs)] rounded-[var(--radius-sm)] py-[var(--spacing-4xs)] pl-[var(--spacing-xs)] pr-[var(--spacing-2xs)]"
        >
          <span className={MENU_TEXT_CLASSES}>{adminLabel}</span>
          <ChevronDownIcon className="text-[color:var(--color-primitive-white)]" />
        </button>
      </div>

      <div className="Gnb__utility flex h-full items-center">
        {/* TODO: width는 Figma 상 108~160px 가변 힌트만 있어 대표값(120px) 리터럴 사용, 보더 유무는 확인 불가(외부 라이브러리 인스턴스 collapse)라 생략 */}
        <div className="Gnb__search flex h-[20px] w-[120px] shrink-0 items-center gap-[var(--spacing-4xs)] rounded-[var(--radius-sm)] bg-[var(--color-primitive-overlay-gray-900-32)] px-[var(--spacing-2xs)]">
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            className="Gnb__searchInput w-full min-w-0 border-0 bg-transparent text-[length:var(--typography-body-sm-12-400-font-size)] text-[color:var(--color-text-button-ghost-bg-dark)] outline-none placeholder:text-[color:var(--color-text-button-ghost-bg-dark)]"
          />
          <SearchIcon />
        </div>

        <GnbUtilityItem label="공지사항" badge={hasNotification} />
        <GnbUtilityItem label="도움" icon={<HelpIcon />} />
        <GnbDivider />
        <GnbUtilityItem label={timerLabel} icon={<ClockIcon />} />
        <GnbUtilityItem label="권한신청" />
        <GnbUtilityItem
          label={profileName}
          icon={
            <ChevronDownIcon className="text-[color:var(--color-text-button-ghost-bg-dark)]" />
          }
          iconPosition="right"
        />
        <GnbDivider />

        <button
          type="button"
          onClick={onHamburgerClick}
          aria-label="메뉴 열기"
          className="Gnb__hamburger flex h-full shrink-0 items-center px-[var(--spacing-2xs)]"
        >
          <span className="flex h-[16px] w-[16px] shrink-0 flex-col items-center justify-between py-[2px]">
            <span className="block h-[2px] w-[12px] bg-[var(--color-primitive-white)]" />
            <span className="block h-[2px] w-[12px] bg-[var(--color-primitive-white)]" />
            <span className="block h-[2px] w-[12px] bg-[var(--color-primitive-white)]" />
          </span>
        </button>
      </div>
    </header>
  );
}
