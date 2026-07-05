import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { userEvent, within } from "@storybook/test";

import { BoxTextSingle } from "./BoxTextSingle";

/**
 * 참고: 이 프로젝트에는 아직 `@testing-library/react`가 설치되어 있지 않아
 * react-dom/client의 createRoot로 직접 렌더링하는 헬퍼를 사용한다.
 */
function renderComponent(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  let root: Root;

  act(() => {
    root = createRoot(container);
    root.render(ui);
  });

  return {
    container,
    unmount: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
}

describe("BoxTextSingle", () => {
  it("placeholder를 표시하는 input을 렌더링한다", () => {
    const { container, unmount } = renderComponent(
      <BoxTextSingle placeholder="textinputplace" />,
    );
    const canvas = within(container);

    expect(canvas.getByPlaceholderText("textinputplace")).not.toBeNull();

    unmount();
  });

  it("타이핑하면 입력값이 반영되고 onChange가 호출된다", async () => {
    const onChange = vi.fn();
    const { container, unmount } = renderComponent(
      <BoxTextSingle placeholder="textinputplace" onChange={onChange} />,
    );
    const canvas = within(container);
    const input = canvas.getByPlaceholderText(
      "textinputplace",
    ) as HTMLInputElement;

    await userEvent.type(input, "hello");

    expect(input.value).toBe("hello");
    expect(onChange).toHaveBeenCalled();

    unmount();
  });

  it("disabled일 때 input이 비활성화되고 타이핑이 반영되지 않는다", async () => {
    const { container, unmount } = renderComponent(
      <BoxTextSingle placeholder="textinputplace" disabled />,
    );
    const canvas = within(container);
    const input = canvas.getByPlaceholderText(
      "textinputplace",
    ) as HTMLInputElement;

    expect(input.disabled).toBe(true);

    await userEvent.type(input, "hello");

    expect(input.value).toBe("");

    unmount();
  });

  it("populated(값 있음) 상태를 위한 :not(:placeholder-shown) 클래스를 input에 적용한다", () => {
    const { container, unmount } = renderComponent(
      <BoxTextSingle placeholder="textinputplace" />,
    );

    const input = container.querySelector(".BoxTextSingle__input");

    expect(input?.className).toContain("[&:not(:placeholder-shown)]:text-");

    unmount();
  });

  it("focus 상태 텍스트 색상 클래스를 input에 적용한다", () => {
    const { container, unmount } = renderComponent(
      <BoxTextSingle placeholder="textinputplace" />,
    );

    const input = container.querySelector(".BoxTextSingle__input");

    expect(input?.className).toContain(
      "focus:text-[color:var(--color-text-box-default)]",
    );

    unmount();
  });

  it("message가 없으면 메시지 영역을 렌더링하지 않는다", () => {
    const { container, unmount } = renderComponent(<BoxTextSingle />);

    expect(container.querySelector(".BoxTextSingle__message")).toBeNull();

    unmount();
  });

  it("message가 있으면 메시지 영역을 렌더링한다", () => {
    const { container, unmount } = renderComponent(
      <BoxTextSingle message="필수 입력 항목입니다" />,
    );

    const messageEl = container.querySelector(".BoxTextSingle__message");

    expect(messageEl).not.toBeNull();
    expect(messageEl?.textContent).toBe("필수 입력 항목입니다");

    unmount();
  });

  it.each([
    ["default", "--color-text-gray-6-septenary"],
    ["emphasized", "--color-text-brand"],
    ["danger", "--color-text-danger"],
  ] as const)(
    "messageType=%s일 때 대응하는 색상 토큰을 적용한다",
    (messageType, expectedToken) => {
      const { container, unmount } = renderComponent(
        <BoxTextSingle message="메시지" messageType={messageType} />,
      );

      const messageEl = container.querySelector(".BoxTextSingle__message");

      expect(messageEl?.className).toContain(expectedToken);

      unmount();
    },
  );

  it("showInfoButton/showClearButton이 false면 아이콘 슬롯을 렌더링하지 않는다", () => {
    const { container, unmount } = renderComponent(<BoxTextSingle />);

    expect(container.querySelector(".BoxTextSingle__iconSlot")).toBeNull();

    unmount();
  });

  it("showInfoButton이 true면 기본 placeholder 아이콘 슬롯을 렌더링한다", () => {
    const { container, unmount } = renderComponent(
      <BoxTextSingle showInfoButton />,
    );

    expect(container.querySelector(".BoxTextSingle__iconSlot")).not.toBeNull();

    unmount();
  });

  it("infoIcon prop이 전달되면 기본 placeholder 대신 커스텀 아이콘 노드를 렌더링한다", () => {
    const { container, unmount } = renderComponent(
      <BoxTextSingle
        showInfoButton
        infoIcon={<svg data-testid="custom-info-icon" />}
      />,
    );

    expect(container.querySelector(".BoxTextSingle__iconSlot")).toBeNull();
    expect(
      container.querySelector('[data-testid="custom-info-icon"]'),
    ).not.toBeNull();

    unmount();
  });

  it.each([
    ["sm", "h-[20px]"],
    ["md", "h-[24px]"],
    ["lg", "h-[28px]"],
  ] as const)(
    "size=%s일 때 대응하는 컨테이너 높이 클래스를 적용한다",
    (size, expectedClass) => {
      const { container, unmount } = renderComponent(
        <BoxTextSingle size={size} />,
      );
      const outerDiv = container.firstElementChild as HTMLElement;
      const boxDiv = outerDiv.firstElementChild as HTMLElement;

      expect(boxDiv.className).toContain(expectedClass);

      unmount();
    },
  );

  it("기본 type은 text이다", () => {
    const { container, unmount } = renderComponent(<BoxTextSingle />);
    const input = container.querySelector(
      ".BoxTextSingle__input",
    ) as HTMLInputElement;

    expect(input.type).toBe("text");

    unmount();
  });
});
