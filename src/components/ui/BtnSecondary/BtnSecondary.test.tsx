import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { userEvent, within } from "@storybook/test";

import { BtnSecondary } from "./BtnSecondary";

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

describe("BtnSecondary", () => {
  it("렌더링 시 children 텍스트를 표시한다", () => {
    const { container, unmount } = renderComponent(
      <BtnSecondary>button</BtnSecondary>,
    );
    const canvas = within(container);

    expect(canvas.getByRole("button", { name: "button" })).not.toBeNull();

    unmount();
  });

  it("클릭 시 onClick이 호출된다", async () => {
    const onClick = vi.fn();
    const { container, unmount } = renderComponent(
      <BtnSecondary onClick={onClick}>button</BtnSecondary>,
    );
    const canvas = within(container);

    await userEvent.click(canvas.getByRole("button", { name: "button" }));

    expect(onClick).toHaveBeenCalledTimes(1);

    unmount();
  });

  it("disabled일 때 버튼이 비활성화되고 onClick이 호출되지 않는다", async () => {
    const onClick = vi.fn();
    const { container, unmount } = renderComponent(
      <BtnSecondary disabled onClick={onClick}>
        button
      </BtnSecondary>,
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
    const { container, unmount } = renderComponent(
      <BtnSecondary>button</BtnSecondary>,
    );

    expect(container.querySelector(".BtnSecondary__iconSlot")).toBeNull();

    unmount();
  });

  it.each([["left"], ["right"], ["only"]] as const)(
    "iconPosition이 %s이고 icon prop이 없으면 기본 placeholder box를 렌더링한다",
    (iconPosition) => {
      const { container, unmount } = renderComponent(
        <BtnSecondary iconPosition={iconPosition}>button</BtnSecondary>,
      );

      expect(container.querySelector(".BtnSecondary__iconSlot")).not.toBeNull();

      unmount();
    },
  );

  it("icon prop이 전달되면 기본 placeholder 대신 커스텀 아이콘 노드를 렌더링한다", () => {
    const { container, unmount } = renderComponent(
      <BtnSecondary
        iconPosition="left"
        icon={<svg data-testid="custom-icon" />}
      >
        button
      </BtnSecondary>,
    );

    expect(container.querySelector(".BtnSecondary__iconSlot")).toBeNull();
    expect(
      container.querySelector('[data-testid="custom-icon"]'),
    ).not.toBeNull();

    unmount();
  });

  it("iconPosition이 only이면 children(텍스트)을 렌더링하지 않는다", () => {
    const { container, unmount } = renderComponent(
      <BtnSecondary iconPosition="only">button</BtnSecondary>,
    );

    expect(container.querySelector(".BtnSecondary__label")).toBeNull();

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
        <BtnSecondary size={size}>button</BtnSecondary>,
      );
      const canvas = within(container);
      const button = canvas.getByRole("button", { name: "button" });

      expect(button.className).toContain(expectedClass);

      unmount();
    },
  );

  it("md 사이즈 + iconPosition=left일 때 좌우 padding이 비대칭이다 (Figma 원본 재현)", () => {
    const { container, unmount } = renderComponent(
      <BtnSecondary size="md" iconPosition="left">
        button
      </BtnSecondary>,
    );
    const canvas = within(container);
    const button = canvas.getByRole("button", { name: "button" });

    expect(button.className).toContain("pl-[var(--spacing-button-box-px-sm)]");
    expect(button.className).toContain("pr-[var(--spacing-button-box-px-md)]");

    unmount();
  });

  it("md 사이즈 + iconPosition=none일 때는 좌우 padding이 대칭이다", () => {
    const { container, unmount } = renderComponent(
      <BtnSecondary size="md">button</BtnSecondary>,
    );
    const canvas = within(container);
    const button = canvas.getByRole("button", { name: "button" });

    expect(button.className).toContain("px-[var(--spacing-button-box-px-md)]");

    unmount();
  });

  it.each([
    ["default", "--color-border-button-secondary-enabled"],
    ["activated", "--color-border-button-secondary-activated"],
    ["selected", "--color-border-button-secondary-selected"],
  ] as const)(
    "state=%s일 때 대응하는 보더 색상 토큰을 적용한다",
    (state, expectedToken) => {
      const { container, unmount } = renderComponent(
        <BtnSecondary state={state}>button</BtnSecondary>,
      );
      const canvas = within(container);
      const button = canvas.getByRole("button", { name: "button" });

      expect(button.className).toContain(expectedToken);

      unmount();
    },
  );

  it("state='selected'일 때 selected 전용 배경 토큰을 적용한다", () => {
    const { container, unmount } = renderComponent(
      <BtnSecondary state="selected">button</BtnSecondary>,
    );
    const canvas = within(container);
    const button = canvas.getByRole("button", { name: "button" });

    expect(button.className).toContain(
      "--color-component-button-secondary-selected",
    );

    unmount();
  });

  it("disabled=true이면 state 값과 무관하게 disabled가 클릭을 막는다", async () => {
    const onClick = vi.fn();
    const { container, unmount } = renderComponent(
      <BtnSecondary state="activated" disabled onClick={onClick}>
        button
      </BtnSecondary>,
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

  it("기본 type은 button이다 (폼 제출 방지)", () => {
    const { container, unmount } = renderComponent(
      <BtnSecondary>button</BtnSecondary>,
    );
    const canvas = within(container);
    const button = canvas.getByRole("button", {
      name: "button",
    }) as HTMLButtonElement;

    expect(button.type).toBe("button");

    unmount();
  });
});
