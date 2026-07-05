import type { Meta, StoryObj } from "@storybook/react";

import { BoxTextSingle } from "./BoxTextSingle";

const meta = {
  title: "UI/Box/Text/text-single",
  component: BoxTextSingle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/EactU9SQsOXYD5e50gFPJ3/Library_AI_Test?node-id=13828-11147",
    },
  },
  args: {
    placeholder: "textinputplace",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    messageType: {
      control: "select",
      options: ["default", "emphasized", "danger"],
    },
    message: {
      control: "text",
    },
    showInfoButton: {
      control: "boolean",
    },
    showClearButton: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof BoxTextSingle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * size / message / messageType / showInfoButton / showClearButton / disabled는 Controls 패널에서 직접 조작.
 * hover-pressed / activated(focus) / populated(값 입력)는 실제 <input>의 네이티브 상태이므로
 * Canvas에서 직접 hover/click/타이핑해서 확인 (BoxTextSingle.tsx 참고).
 * 동작 검증은 BoxTextSingle.test.tsx에서만 다룸 (사이드바에는 노출하지 않음).
 */
export const Playground: Story = {
  args: {
    size: "md",
    showInfoButton: false,
    showClearButton: false,
    disabled: false,
  },
};
