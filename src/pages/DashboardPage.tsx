import { Children, Fragment, type ReactNode } from "react";
import { Gnb } from "../components/ui/Gnb";
import no1Icon from "../icons/TPSSIcon/no1.svg";
import no2Icon from "../icons/TPSSIcon/no2.svg";
import no3Icon from "../icons/TPSSIcon/no3.svg";
import no4Icon from "../icons/TPSSIcon/no4.svg";
import no5Icon from "../icons/TPSSIcon/no5.svg";
import iconManual from "../icons/TPSSIcon/icon-manual.svg";
import iconQna from "../icons/TPSSIcon/icon-qna.svg";
import iconVoc from "../icons/TPSSIcon/icon-voc.svg";
import iconAuthority from "../icons/TPSSIcon/icon-authority.svg";

/**
 * Figma: tpss / Dashboard
 * https://www.figma.com/design/9txPUL4k3jrdE4Dx6eWXAA/tpss?node-id=11310-5039
 *
 * 이 페이지 전용 로컬 컴포넌트. 재사용 목적이 아니므로 src/components/ui, Storybook,
 * figma-code-connect.json에는 등록하지 않음 (사용자 지정).
 */

interface MenuListItemProps {
  label: string;
  onClick?: () => void;
}

const MENU_ITEM_TEXT_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-heading-xs-14-500-font-size)]",
  "tracking-[var(--typography-heading-xs-14-500-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-medium)]",
  "leading-[20px]",
  "text-[color:var(--color-text-gray-2-tertiary)]",
].join(" ");

function MenuListItem({ label, onClick }: MenuListItemProps) {
  return (
    // 행 높이 74px은 Figma 실측 고정값(구분선 포함 시 75px) - 토큰에 없는 값이라 리터럴 사용
    <button
      type="button"
      onClick={onClick}
      className="MenuListItem group flex h-[74px] w-full shrink-0 items-center justify-between gap-[var(--spacing-2xs)] bg-[var(--color-bg-surface-primary)] px-[var(--spacing-md)] text-left"
    >
      <span className={`${MENU_ITEM_TEXT_CLASSES} group-hover:underline`}>
        {label}
      </span>
      {/* Figma 원본 chevron 에셋(Icon14-Chevron-S_Right)이 제공되지 않아 동일 형태를 직접 그림 - 색상은 icon/enabled-2-secondary로 근사 */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="shrink-0 text-[color:var(--color-icon-enabled-2-secondary)]"
        aria-hidden="true"
      >
        <path
          d="M5.25 3.5L8.75 7L5.25 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// TODO: 팔레트에 없는 색상(#e2f1ff) - tokens_raw.json 대조 결과 근접 토큰 없음, 사용자 승인 하에 리터럴 값 사용
// TODO: 팔레트에 없는 색상(#384652) - Figma 텍스트 스타일명도 지정되어 있지 않아 리터럴 값 사용
const PAGE_HEADER_TITLE_CLASSES = [
  "[font-family:var(--typography-font-family-samsung-sharp-sans)]",
  "text-[34px]",
  "[font-weight:var(--typography-font-weight-bold)]",
  "leading-[40px]",
  "text-[#384652]",
].join(" ");

// TODO: 팔레트에 없는 색상(#2f363c) - tokens_raw.json 대조 결과 근접 토큰 없음(gray.900이 가장 근접), 사용자 승인 하에 리터럴 값 사용
const PAGE_HEADER_NOTICE_TEXT_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-body-md-14-400-font-size)]",
  "tracking-[var(--typography-body-md-14-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  "leading-[22px]",
  "text-[#2f363c]/80",
].join(" ");

const PAGE_HEADER_DATE_CLASSES = [
  "whitespace-nowrap",
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-body-sm-12-400-font-size)]",
  "tracking-[var(--typography-body-sm-12-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  "leading-[19px]",
  "text-[color:var(--color-text-gray-4-quinary)]",
].join(" ");

interface PageHeaderProps {
  title: string;
  noticeText: string;
  noticeDate: string;
}

function PageHeader({ title, noticeText, noticeDate }: PageHeaderProps) {
  return (
    // h-[128px] 고정값: Figma 실측 - PageHeader 프레임(y=40, h=288)과 CategoryCards(y=168) 좌표를 대조한 결과,
    // 이 행의 높이가 정확히 128px이어야 CategoryCards의 CardTitle 섹션 끝(168+160=328)이 배경 하단(40+288=328)과 일치함
    <div className="PageHeader flex h-[128px] w-full items-center justify-between">
      <h2 className={PAGE_HEADER_TITLE_CLASSES}>{title}</h2>
      {/* width 506px 고정 - Figma 실측값, CategoryCards 우측 끝과 정렬됨(둘 다 같은 1249px 컬럼의 우측 끝을 공유) */}
      <div className="PageHeader__notice flex w-[506px] shrink-0 items-center justify-between gap-[var(--spacing-xs)] rounded-[var(--radius-sm)] border border-[#d5e2ec] bg-[#dfebf4] px-[14px] py-[var(--spacing-xs)]">
        <div className="flex items-center gap-[var(--spacing-xs)]">
          {/* "N" 배지: Figma 원본은 흰 사각형 8개를 조합한 커스텀 그래픽이나, 동일한 시각 결과(대문자 N)를 위해 실제 글자로 단순화 구현 */}
          <span
            className="flex size-[16px] shrink-0 items-center justify-center rounded-full border border-[var(--color-primitive-red-700)] bg-[var(--color-primitive-red-600)] text-[9px] font-bold leading-none text-[var(--color-primitive-white)]"
            aria-hidden="true"
          >
            N
          </span>
          <span className={PAGE_HEADER_NOTICE_TEXT_CLASSES}>{noticeText}</span>
        </div>
        <span className={PAGE_HEADER_DATE_CLASSES}>{noticeDate}</span>
      </div>
    </div>
  );
}

type CategoryCardRoundedSide = "left" | "right" | "none";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  /** 카드가 CategoryCards 행에서 몇 번째에 있는지에 따른 외곽 radius 위치. Figma 실측: 맨 왼쪽 카드만 좌측, 맨 오른쪽 카드만 우측에 8px, 중간 카드는 radius 없음. */
  roundedSide?: CategoryCardRoundedSide;
  children: ReactNode;
}

const ROUNDED_SIDE_CLASSES: Record<CategoryCardRoundedSide, string> = {
  left: "rounded-tl-[var(--radius-xl)] rounded-bl-[var(--radius-xl)]",
  right: "rounded-tr-[var(--radius-xl)] rounded-br-[var(--radius-xl)]",
  none: "",
};

const CATEGORY_CARD_TITLE_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-heading-md-20-600-font-size)]",
  "tracking-[var(--typography-heading-md-20-600-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-semibold)]",
  "leading-[24px]",
  "text-[color:var(--color-text-gray-1-secondary)]",
].join(" ");

// TODO: line-height 디자인 토큰 부재 - Figma 지정값(14px 기준 1.6배 ≈ 22.4px)을 22px로 반올림 (사용자 승인 결정)
const CATEGORY_CARD_DESCRIPTION_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-body-md-14-400-font-size)]",
  "tracking-[var(--typography-body-md-14-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  "leading-[22px]",
  "text-[color:var(--color-text-gray-3-quaternary)]",
].join(" ");

function CategoryCard({
  title,
  description,
  icon,
  roundedSide = "none",
  children,
}: CategoryCardProps) {
  return (
    // 카드 전체 높이 484px은 Figma 실측 고정값 - 5개 카드가 메뉴 항목 개수와 무관하게 동일 높이로 스트레치됨
    <div
      className={`CategoryCard flex h-[484px] w-[249px] flex-col overflow-hidden bg-[var(--color-bg-surface-primary)] ${ROUNDED_SIDE_CLASSES[roundedSide]}`}
    >
      <div className="CategoryCard__header flex flex-col items-end gap-[var(--spacing-5xs)] pt-[var(--spacing-lg)] pr-[var(--spacing-lg)] pb-[var(--spacing-md)] pl-[var(--spacing-lg)]">
        <div className="flex w-full flex-col gap-[var(--spacing-2xs)]">
          <h3 className={CATEGORY_CARD_TITLE_CLASSES}>{title}</h3>
          <p className={CATEGORY_CARD_DESCRIPTION_CLASSES}>{description}</p>
        </div>
        {icon}
      </div>
      <div className="h-px w-full shrink-0 bg-[var(--color-line-5-quinary)]" />
      {/* TODO: 팔레트에 없는 색상(#f5f9fd) - tokens_raw.json 대조 결과 근접 토큰 없음, 사용자 승인 하에 리터럴 값 사용 */}
      {/* flex-1 + items-start: 메뉴 항목이 3개뿐인 카드(생산최적화)도 카드 전체 높이(484px)를 맞추기 위해 이 배경 박스가 남는 공간을 흡수하고, 흰 리스트 카드는 상단 정렬 (Figma 실측) */}
      <div className="CategoryCard__menuWrap flex flex-1 flex-col items-start bg-[#f5f9fd] p-[var(--spacing-sm)]">
        <div className="w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-surface-primary)] shadow-xs">
          {/* 항목(74px) + 구분선(1px)을 번갈아 배치 - 마지막 항목엔 구분선 없음 (Figma 실측 75px/74px과 일치시키기 위해 divide-y 대신 명시적 삽입) */}
          {Children.toArray(children).map((child, index, all) => (
            <Fragment key={index}>
              {child}
              {index < all.length - 1 && (
                <div className="h-px w-full shrink-0 bg-[var(--color-line-5-quinary)]" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

const SECTION_TITLE_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-heading-sm-16-600-font-size)]",
  "tracking-[var(--typography-heading-sm-16-600-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-semibold)]",
  "leading-[20px]",
  "text-[color:var(--color-text-gray-3-quaternary)]",
].join(" ");

const LIST_ITEM_TEXT_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-label-md-14-400-font-size)]",
  "tracking-[var(--typography-label-md-14-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  "leading-[20px]",
  "text-[color:var(--color-text-gray-3-quaternary)]",
].join(" ");

const NUMBER_BADGE_TEXT_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-label-xxs-11-400-font-size)]",
  "tracking-[var(--typography-label-xxs-11-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  "leading-[12px]",
  "text-[color:var(--color-text-gray-3-quaternary)]",
].join(" ");

const ICON_GRID_TEXT_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-body-md-14-400-font-size)]",
  "tracking-[var(--typography-body-md-14-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  "leading-[22px]",
  "text-[color:var(--color-text-gray-3-quaternary)]",
].join(" ");

function StarIcon() {
  return (
    // Figma 원본은 이미지 에셋이라 정확한 색을 확인 못해 골드 계열(yellow.550/600)로 근사해서 직접 그림
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M8 1.5L9.8 5.6L14 6.1L10.9 8.9L11.8 13L8 10.8L4.2 13L5.1 8.9L2 6.1L6.2 5.6L8 1.5Z"
        fill="var(--color-primitive-yellow-550)"
        stroke="var(--color-primitive-yellow-600)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0 text-[color:var(--color-text-gray-3-quaternary)]"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <rect
        x="6.3"
        y="6"
        width="1.4"
        height="4.5"
        rx="0.7"
        fill="currentColor"
      />
      <circle cx="7" cy="4" r="0.9" fill="currentColor" />
    </svg>
  );
}

function PaginationArrows() {
  return (
    // 좌/우 화살표 에셋이 제공되지 않아 MenuListItem chevron과 동일한 방식으로 직접 그림.
    // 좌측은 --color-icon-disabled(비활성 추정), 우측은 --color-icon-enabled-2-secondary로 근사
    <div className="flex h-[20px] w-[39px] shrink-0 items-center rounded-[var(--radius-sm)] border border-[var(--color-border-button-secondary-enabled)]">
      <button
        type="button"
        aria-label="이전"
        className="flex flex-1 items-center justify-center self-stretch"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-[color:var(--color-icon-disabled)]"
          aria-hidden="true"
        >
          <path
            d="M8.75 3.5L5.25 7L8.75 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <span className="h-[18px] w-px shrink-0 bg-[var(--color-border-button-secondary-enabled)]" />
      <button
        type="button"
        aria-label="다음"
        className="flex flex-1 items-center justify-center self-stretch"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-[color:var(--color-icon-enabled-2-secondary)]"
          aria-hidden="true"
        >
          <path
            d="M5.25 3.5L8.75 7L5.25 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

interface FavoriteItemData {
  number?: number;
  label: string;
  showStar?: boolean;
}

function FavoriteListItem({ number, label, showStar }: FavoriteItemData) {
  return (
    <button
      type="button"
      className="FavoriteListItem group flex h-[28px] w-full shrink-0 items-center gap-[var(--spacing-2xs)] text-left"
    >
      {number !== undefined && (
        <span className="flex shrink-0 items-center justify-center rounded-[var(--radius-xs)] border border-[var(--color-line-3-tertiary)] bg-[var(--color-bg-surface-quaternary)] px-[var(--spacing-4xs)] py-[1px]">
          <span className={NUMBER_BADGE_TEXT_CLASSES}>{number}</span>
        </span>
      )}
      <span className={`${LIST_ITEM_TEXT_CLASSES} group-hover:underline`}>
        {label}
      </span>
      {showStar && <StarIcon />}
    </button>
  );
}

interface ListSectionCardProps {
  title: string;
  showInfoIcon?: boolean;
  items: FavoriteItemData[];
}

function ListSectionCard({
  title,
  showInfoIcon = false,
  items,
}: ListSectionCardProps) {
  const leftColumn = items.slice(0, 4);
  const rightColumn = items.slice(4, 8);
  return (
    <div className="flex h-[186px] w-[496px] shrink-0 flex-col rounded-[var(--radius-lg)] bg-[var(--color-bg-surface-primary)] px-[var(--spacing-lg)] pt-[18px] shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--spacing-4xs)]">
          <h3 className={SECTION_TITLE_CLASSES}>{title}</h3>
          {showInfoIcon && <InfoIcon />}
        </div>
        <PaginationArrows />
      </div>
      <div className="mt-[var(--spacing-md)] flex flex-1 items-stretch gap-[var(--spacing-xl)]">
        <div className="flex flex-1 flex-col">
          {leftColumn.map((item, index) => (
            <FavoriteListItem key={index} {...item} />
          ))}
        </div>
        <div className="w-px shrink-0 bg-[var(--color-line-6-senary)]" />
        <div className="flex flex-1 flex-col">
          {rightColumn.map((item, index) => (
            <FavoriteListItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface IconGridItemData {
  icon: string;
  label: string;
}

function IconGridItem({
  icon,
  label,
  borderClasses,
}: IconGridItemData & { borderClasses: string }) {
  return (
    <button
      type="button"
      className={`IconGridItem group flex flex-col items-center justify-center gap-[var(--spacing-2xs)] ${borderClasses}`}
    >
      <img src={icon} width={24} height={24} alt="" />
      <span className={`${ICON_GRID_TEXT_CLASSES} group-hover:underline`}>
        {label}
      </span>
    </button>
  );
}

const ICON_GRID_ITEMS: IconGridItemData[] = [
  { icon: iconManual, label: "매뉴얼" },
  { icon: iconQna, label: "Q&A" },
  { icon: iconVoc, label: "IT-VoC" },
  { icon: iconAuthority, label: "권한 신청" },
];

const ICON_GRID_BORDER_CLASSES = [
  "border-r border-b border-[var(--color-line-6-senary)]",
  "border-b border-[var(--color-line-6-senary)]",
  "border-r border-[var(--color-line-6-senary)]",
  "",
];

function IconGridCard() {
  return (
    <div className="grid h-[186px] w-[232px] shrink-0 grid-cols-2 grid-rows-2 rounded-[var(--radius-md)] bg-[var(--color-bg-surface-primary)] shadow-xs">
      {ICON_GRID_ITEMS.map((item, index) => (
        <IconGridItem
          key={item.label}
          {...item}
          borderClasses={ICON_GRID_BORDER_CLASSES[index]}
        />
      ))}
    </div>
  );
}

const FAVORITE_ITEMS: FavoriteItemData[] = [
  { number: 1, label: "Loss Tree", showStar: true },
  { number: 2, label: "Comparison", showStar: true },
  { number: 3, label: "Quest 기준정보", showStar: true },
  { number: 4, label: "Line of Balance", showStar: true },
  { number: 5, label: "Line of Balance", showStar: true },
  { number: 6, label: "Loss Tree", showStar: true },
  { number: 7, label: "Bottleneck Summary", showStar: true },
  { number: 8, label: "Bottleneck List", showStar: true },
];

const RECENT_VISIT_ITEMS: FavoriteItemData[] = [
  { label: "Loss Tree", showStar: true },
  { label: "Quest 기준정보", showStar: true },
  { label: "Comparison" },
  { label: "Equipement Management" },
  { label: "BRAVO Community" },
  { label: "Quest 기준정보" },
  { label: "BM 상세분석" },
  { label: "Loss Tree" },
];

interface CategoryCardConfig {
  title: string;
  description: string;
  icon: string;
  roundedSide: CategoryCardRoundedSide;
  menuItems: string[];
}

const CATEGORY_CARDS: CategoryCardConfig[] = [
  {
    title: "Bottleneck",
    description: "공정흐름 제한 분석",
    icon: no1Icon,
    roundedSide: "left",
    menuItems: [
      "제품 WIP TAT",
      "Bottleneck Summary",
      "Capa개선 Item",
      "Line of Balance",
    ],
  },
  {
    title: "생산지표",
    description: "생산성 데이터 분석",
    icon: no2Icon,
    roundedSide: "none",
    menuItems: [
      "종합정보",
      "라인별 FAB Daily Report",
      "Dashboard",
      "Comparison",
    ],
  },
  {
    // Figma 원본 텍스트는 "생산지표"/"생산성 데이터 분석"으로 2번째 카드와 동일하게 남아있었음(원본 데이터 이슈) - 사용자 지정값으로 대체
    title: "효율분석",
    description: "정지 Loss 종합분석",
    icon: no3Icon,
    roundedSide: "none",
    menuItems: [
      "Loss Tree",
      "Rundown 상세분석",
      "BM 상세분석",
      "Configuration",
    ],
  },
  {
    title: "생산최적화",
    description: "제조공정 효율 개선",
    icon: no4Icon,
    roundedSide: "none",
    menuItems: ["Quest List", "Quest Summary", "BRAVO Community"],
  },
  {
    title: "기준정보",
    description: "생산운영정보 조회",
    // Figma 레이어명은 "Icon/no3"로 3번째 카드와 동일 아이콘을 참조했으나(원본 데이터 이슈), Bottleneck=no1 순번 관례에 맞춰 no5 사용 (사용자 지정)
    icon: no5Icon,
    roundedSide: "right",
    menuItems: ["Equipment", "비산정 예정", "ST Group", "Quest 기준정보"],
  },
];

export function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-background)]">
      <Gnb />
      <div className="relative w-full">
        {/* TODO: 팔레트에 없는 색상(#e2f1ff) - 리터럴 값 사용. 높이 288px은 Figma 실측값 - CategoryCards 시작점(168) +
            CardTitle 섹션 높이(160) = 328 이 이 배경의 하단(288)과 정확히 일치하도록 계산된 값 (좌표 재조사로 확인됨) */}
        <div
          className="absolute inset-x-0 top-0 h-[288px] bg-[#e2f1ff]"
          aria-hidden="true"
        />
        {/* 콘텐츠 블록은 브라우저 기준 중앙 정렬 - 브라우저 폭이 늘어나면 배경만 넓어지고 콘텐츠는 계속 중앙에 위치 */}
        <div className="relative flex w-full justify-center">
          {/* gap/padding 없음 - PageHeader(h-128)가 CategoryCards(y=168) 바로 앞에서 끝나야 위 배경(h-288)과의
              좌표 계산이 정확히 맞음 (계산 근거: PageHeader.tsx의 h-[128px] 주석 참고) */}
          <div className="flex flex-col">
            <PageHeader
              title="공정 관리를 위한 종합 지표"
              noticeText="[긴급] 11/25 15라인 시설보수로 인한 비가동 처리 건"
              noticeDate="2026-01-22"
            />
            <div className="flex gap-[1px]">
              {CATEGORY_CARDS.map((card) => (
                <CategoryCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  roundedSide={card.roundedSide}
                  icon={<img src={card.icon} width={70} height={70} alt="" />}
                >
                  {card.menuItems.map((label) => (
                    <MenuListItem key={label} label={label} />
                  ))}
                </CategoryCard>
              ))}
            </div>
            <div className="mt-[var(--spacing-xl)] flex gap-[13px]">
              <ListSectionCard
                title="즐겨찾기"
                showInfoIcon
                items={FAVORITE_ITEMS}
              />
              <ListSectionCard title="최근방문" items={RECENT_VISIT_ITEMS} />
              <IconGridCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
