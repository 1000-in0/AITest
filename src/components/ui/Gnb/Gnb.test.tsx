import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { userEvent, within } from "@storybook/test";

import { Gnb } from "./Gnb";

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

describe("Gnb", () => {
  it("기본 로고와 5개 메뉴 항목을 렌더링한다", () => {
    const { container, unmount } = renderComponent(<Gnb />);
    const canvas = within(container);

    expect(canvas.getByText("TPSS")).not.toBeNull();
    expect(canvas.getByText("종합효율")).not.toBeNull();
    expect(canvas.getByText("TAT생산성")).not.toBeNull();
    expect(canvas.getByText("BRAVO")).not.toBeNull();
    expect(canvas.getByText("기준정보")).not.toBeNull();
    expect(canvas.getByText("혁신정보")).not.toBeNull();

    unmount();
  });

  it("메뉴 항목 클릭 시 onClick이 호출된다", async () => {
    const onClick = vi.fn();
    const { container, unmount } = renderComponent(
      <Gnb menuItems={[{ label: "테스트메뉴", onClick }]} />,
    );
    const canvas = within(container);

    await userEvent.click(canvas.getByText("테스트메뉴"));

    expect(onClick).toHaveBeenCalledTimes(1);

    unmount();
  });

  it("검색창에 입력하면 onSearchChange가 호출된다", async () => {
    const onSearchChange = vi.fn();
    const { container, unmount } = renderComponent(
      <Gnb onSearchChange={onSearchChange} />,
    );
    const canvas = within(container);

    await userEvent.type(canvas.getByPlaceholderText("Search"), "a");

    expect(onSearchChange).toHaveBeenCalled();

    unmount();
  });

  it("hasNotification=false면 공지사항 배지닷을 렌더링하지 않는다", () => {
    const { container, unmount } = renderComponent(
      <Gnb hasNotification={false} />,
    );

    const notificationButton = Array.from(
      container.querySelectorAll(".GnbUtilityItem"),
    ).find((el) => el.textContent === "공지사항");

    expect(notificationButton?.querySelector(".rounded-full")).toBeNull();

    unmount();
  });

  it("hasNotification=true면 공지사항 배지닷을 렌더링한다", () => {
    const { container, unmount } = renderComponent(
      <Gnb hasNotification={true} />,
    );

    const notificationButton = Array.from(
      container.querySelectorAll(".GnbUtilityItem"),
    ).find((el) => el.textContent === "공지사항");

    expect(notificationButton?.querySelector(".rounded-full")).not.toBeNull();

    unmount();
  });

  it("profileName/timerLabel 기본값을 렌더링한다", () => {
    const { container, unmount } = renderComponent(<Gnb />);
    const canvas = within(container);

    expect(canvas.getByText("이삼성")).not.toBeNull();
    expect(canvas.getByText("03:00:11")).not.toBeNull();

    unmount();
  });

  it("햄버거 버튼 클릭 시 onHamburgerClick이 호출된다", async () => {
    const onHamburgerClick = vi.fn();
    const { container, unmount } = renderComponent(
      <Gnb onHamburgerClick={onHamburgerClick} />,
    );
    const canvas = within(container);

    await userEvent.click(canvas.getByLabelText("메뉴 열기"));

    expect(onHamburgerClick).toHaveBeenCalledTimes(1);

    unmount();
  });
});
