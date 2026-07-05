import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { userEvent, within } from "@storybook/test";

import { BtnBrand } from "./BtnBrand";

/**
 * 참고: 이 프로젝트에는 아직 `@testing-library/react`가 설치되어 있지 않아
 * react-dom/client의 createRoot로 직접 렌더링하는 헬퍼를 사용한다.
 * (vitest / jsdom 환경 설정도 아직 없음 - 최종 보고의 "환경 미비" 항목 참고)
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

describe("BtnBrand", () => {
  it("렌더링 시 children 텍스트를 표시한다", () => {
    const { container, unmount } = renderComponent(<BtnBrand>button</BtnBrand>);
    const canvas = within(container);

    expect(canvas.getByRole("button", { name: "button" })).not.toBeNull();

    unmount();
  });

  it("클릭 시 onClick이 호출된다", async () => {
    const onClick = vi.fn();
    const { container, unmount } = renderComponent(
      <BtnBrand onClick={onClick}>button</BtnBrand>,
    );
    const canvas = within(container);

    await userEvent.click(canvas.getByRole("button", { name: "button" }));

    expect(onClick).toHaveBeenCalledTimes(1);

    unmount();
  });

  it("disabled일 때 버튼이 비활성화되고 onClick이 호출되지 않는다", async () => {
    const onClick = vi.fn();
    const { container, unmount } = renderComponent(
      <BtnBrand disabled onClick={onClick}>
        button
      </BtnBrand>,
    );
    const canvas = within(container);
    const button = canvas.getByRole("button", {
      name: "button",
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();

    unmount();
  });

  it("iconPosition이 none이면 아이콘 슬롯을 렌더링하지 않는다", () => {
    const { container, unmount } = renderComponent(<BtnBrand>button</BtnBrand>);

    expect(container.querySelector(".BtnBrand__iconSlot")).toBeNull();

    unmount();
  });

  it.each([["left"], ["right"], ["only"]] as const)(
    "iconPosition이 %s이고 icon prop이 없으면 기본 placeholder box를 렌더링한다",
    (iconPosition) => {
      const { container, unmount } = renderComponent(
        <BtnBrand iconPosition={iconPosition}>button</BtnBrand>,
      );

      expect(container.querySelector(".BtnBrand__iconSlot")).not.toBeNull();

      unmount();
    },
  );

  it("icon prop이 전달되면 기본 placeholder 대신 커스텀 아이콘 노드를 렌더링한다", () => {
    const { container, unmount } = renderComponent(
      <BtnBrand iconPosition="left" icon={<svg data-testid="custom-icon" />}>
        button
      </BtnBrand>,
    );

    expect(container.querySelector(".BtnBrand__iconSlot")).toBeNull();
    expect(
      container.querySelector('[data-testid="custom-icon"]'),
    ).not.toBeNull();

    unmount();
  });

  it("iconPosition이 only이면 children(텍스트)을 렌더링하지 않는다", () => {
    const { container, unmount } = renderComponent(
      <BtnBrand iconPosition="only">button</BtnBrand>,
    );

    expect(container.querySelector(".BtnBrand__label")).toBeNull();

    unmount();
  });

  it.each([
    ["sm", "h-[20px]"],
    ["md", "h-[24px]"],
    ["lg", "h-[28px]"],
  ] as const)(
    "size=%s일 때 대응하는 높이 클래스를 적용한다",
    (size, expectedClass) => {
      const { container, unmount } = renderComponent(
        <BtnBrand size={size}>button</BtnBrand>,
      );
      const canvas = within(container);
      const button = canvas.getByRole("button", { name: "button" });

      expect(button.className).toContain(expectedClass);

      unmount();
    },
  );

  it("기본 type은 button이다 (폼 제출 방지)", () => {
    const { container, unmount } = renderComponent(<BtnBrand>button</BtnBrand>);
    const canvas = within(container);
    const button = canvas.getByRole("button", {
      name: "button",
    }) as HTMLButtonElement;

    expect(button.type).toBe("button");

    unmount();
  });
});
