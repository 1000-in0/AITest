import { BoxTextSingle } from "../components/ui/BoxTextSingle";
import { BtnBrand } from "../components/ui/BtnBrand";
import { BtnSecondary } from "../components/ui/BtnSecondary";

/**
 * Figma: Design_Test
 * https://www.figma.com/design/t1LMfNlDDCtILMbfM3IfLz/Design_Test?node-id=3-1036
 *
 * 루트 프레임(1920x1080 목업 캔버스)의 흰 배경 + px-160/py-90 padding은
 * 데모 캔버스 아티팩트로 판단해 실제 페이지에서는 사용하지 않고,
 * 콘텐츠를 화면 중앙에 배치하는 방식으로 대체함 (사용자 승인 결정).
 * 콘텐츠 블록의 max-w-[320px]는 Figma에서 실측 확인된 값.
 */

// TODO: line-height 디자인 토큰 부재 - 토큰 추가 시 leading-[20px]를 var(--typography-*-line-height)로 교체 (BoxTextSingle 등 기존 컴포넌트와 동일 패턴)
const LABEL_CLASSES = [
  "[font-family:var(--typography-font-family-pretendard-gov)]",
  "text-[length:var(--typography-label-md-14-400-font-size)]",
  "tracking-[var(--typography-label-md-14-400-letter-spacing)]",
  "[font-weight:var(--typography-font-weight-regular)]",
  "leading-[20px]",
  "text-[color:var(--color-text-gray-0-primary)]",
].join(" ");

export function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-bg-surface-primary)]">
      <div className="flex flex-col items-center gap-[var(--spacing-3xl)] w-full max-w-[320px]">
        <h1
          className={[
            "[font-family:var(--typography-font-family-pretendard-gov)]",
            "text-[length:var(--typography-heading-lg-24-600-font-size)]",
            "tracking-[var(--typography-heading-lg-24-600-letter-spacing)]",
            "[font-weight:var(--typography-font-weight-semibold)]",
            "text-[color:var(--color-text-gray-0-primary)]",
          ].join(" ")}
        >
          Login Test
        </h1>

        <div className="flex flex-col gap-[var(--spacing-md)] w-full">
          <div className="flex flex-col gap-[var(--spacing-5xs)] w-full">
            <label htmlFor="login-email" className={LABEL_CLASSES}>
              이메일
            </label>
            <BoxTextSingle
              id="login-email"
              size="lg"
              type="email"
              placeholder="이메일을 입력해주세요."
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-[var(--spacing-5xs)] w-full">
            <label htmlFor="login-password" className={LABEL_CLASSES}>
              비밀번호
            </label>
            <BoxTextSingle
              id="login-password"
              size="lg"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              showInfoButton
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-[var(--spacing-sm)] w-full">
          <div className="flex flex-col items-start gap-[var(--spacing-2xs)] w-full">
            <BtnBrand size="lg" className="w-full">
              로그인
            </BtnBrand>
            <BtnSecondary size="lg" className="w-full">
              회원가입
            </BtnSecondary>
          </div>
          <BtnSecondary size="sm">비밀번호 찾기</BtnSecondary>
        </div>
      </div>
    </div>
  );
}
