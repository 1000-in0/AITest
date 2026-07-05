import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BtnBrand } from "./BtnBrand";

const meta = {
  title: "UI/Button/btn-brand",
  component: BtnBrand,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/EactU9SQsOXYD5e50gFPJ3/Library_AI_Test?node-id=11153-21743",
    },
  },
  args: {
    children: "button",
    onClick: fn(),
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    iconPosition: {
      control: "select",
      options: ["none", "left", "right", "only"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof BtnBrand>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * size / iconPosition / disabled는 모두 Controls 패널에서 직접 조작.
 * enabled/hover-pressed 상태는 :hover/:active 의사클래스로 처리되어 Controls 대상이 아님 (BtnBrand.tsx 참고).
 * 클릭/disabled 동작 검증은 BtnBrand.test.tsx에서만 다룸 (사이드바에는 노출하지 않음).
 */
export const Playground: Story = {
  args: {
    size: "md",
    iconPosition: "none",
    disabled: false,
  },
};
