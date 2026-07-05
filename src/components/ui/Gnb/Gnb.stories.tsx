import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { Gnb } from "./Gnb";

const meta = {
  title: "UI/GNB",
  component: Gnb,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/9txPUL4k3jrdE4Dx6eWXAA/tpss?node-id=11310-5539",
    },
  },
} satisfies Meta<typeof Gnb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    hasNotification: true,
  },
};

export const NoNotification: Story = {
  args: {
    hasNotification: false,
  },
};

export const SearchInteraction: Story = {
  args: {
    hasNotification: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search");

    await userEvent.type(searchInput, "생산지표");

    await expect(searchInput).toHaveValue("생산지표");
  },
};
