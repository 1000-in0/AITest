import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { BtnSecondary } from "./BtnSecondary";

const meta = {
  title: "UI/Button/btn-2ndary",
  component: BtnSecondary,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/EactU9SQsOXYD5e50gFPJ3/Library_AI_Test?node-id=13826-18407",
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
    state: {
      control: "select",
      options: ["default", "activated", "selected"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof BtnSecondary>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * size / iconPosition / state / disabled는 모두 Controls 패널에서 직접 조작.
 * hover-pressed / activated_hover는 :hover, :active 의사클래스로 처리되어 Controls 대상이 아님 (BtnSecondary.tsx 참고).
 * 클릭/disabled 동작 검증은 BtnSecondary.test.tsx에서만 다룸 (사이드바에는 노출하지 않음).
 */
export const Playground: Story = {
  args: {
    size: "md",
    iconPosition: "none",
    state: "default",
    disabled: false,
  },
};
