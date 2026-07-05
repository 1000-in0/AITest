import type { Meta, StoryObj } from "@storybook/react";

interface ColorToken {
  /** 전체 CSS 변수명, 예: --color-primitive-gray-500 */
  name: string;
  /** _generated.css에 선언된 값 (hex/rgba 또는 var() 참조) */
  value: string;
}

interface ColorGroup {
  label: string;
  tokens: ColorToken[];
}

const primitiveGroups: ColorGroup[] = [
  {
    label: "Neutral",
    tokens: [
      { name: "--color-primitive-white", value: "#ffffff" },
      { name: "--color-primitive-black", value: "#000000" },
      { name: "--color-primitive-alpha", value: "rgba(0, 0, 0, 0)" },
      {
        name: "--color-primitive-overlay-gray-900-0",
        value: "rgba(42, 49, 55, 0)",
      },
      {
        name: "--color-primitive-overlay-gray-900-32",
        value: "rgba(42, 49, 55, 0.32)",
      },
      {
        name: "--color-primitive-overlay-gray-900-40",
        value: "rgba(42, 49, 55, 0.4)",
      },
      {
        name: "--color-primitive-overlay-gray-900-90",
        value: "rgba(42, 49, 55, 0.9)",
      },
    ],
  },
  {
    label: "Gray",
    tokens: [
      { name: "--color-primitive-gray-050", value: "#fafbfc" },
      { name: "--color-primitive-gray-100", value: "#f6f8fa" },
      { name: "--color-primitive-gray-150", value: "#f2f6f9" },
      { name: "--color-primitive-gray-200", value: "#eff4f8" },
      { name: "--color-primitive-gray-250", value: "#ecf1f5" },
      { name: "--color-primitive-gray-300", value: "#e9eef2" },
      { name: "--color-primitive-gray-350", value: "#e4e9ed" },
      { name: "--color-primitive-gray-400", value: "#dadfe4" },
      { name: "--color-primitive-gray-450", value: "#ccd1d6" },
      { name: "--color-primitive-gray-500", value: "#c0c4c9" },
      { name: "--color-primitive-gray-550", value: "#b2b6bb" },
      { name: "--color-primitive-gray-600", value: "#a5abb1" },
      { name: "--color-primitive-gray-650", value: "#90969d" },
      { name: "--color-primitive-gray-700", value: "#767d84" },
      { name: "--color-primitive-gray-750", value: "#565e66" },
      { name: "--color-primitive-gray-800", value: "#454e56" },
      { name: "--color-primitive-gray-850", value: "#3c444b" },
      { name: "--color-primitive-gray-900", value: "#2a3137" },
      { name: "--color-primitive-gray-950", value: "#20262a" },
    ],
  },
  {
    label: "Red",
    tokens: [
      { name: "--color-primitive-red-050", value: "#fffbfb" },
      { name: "--color-primitive-red-100", value: "#fff6f5" },
      { name: "--color-primitive-red-150", value: "#fff0ef" },
      { name: "--color-primitive-red-200", value: "#ffeceb" },
      { name: "--color-primitive-red-250", value: "#ffe3e1" },
      { name: "--color-primitive-red-300", value: "#ffd9d7" },
      { name: "--color-primitive-red-350", value: "#ffd0cd" },
      { name: "--color-primitive-red-400", value: "#ffc7c3" },
      { name: "--color-primitive-red-450", value: "#ffb4af" },
      { name: "--color-primitive-red-500", value: "#ff9d98" },
      { name: "--color-primitive-red-550", value: "#ff837c" },
      { name: "--color-primitive-red-600", value: "#ff695f" },
      { name: "--color-primitive-red-650", value: "#ff4337" },
      { name: "--color-primitive-red-700", value: "#d2362c" },
      { name: "--color-primitive-red-750", value: "#a52921" },
      { name: "--color-primitive-red-800", value: "#781c16" },
      { name: "--color-primitive-red-850", value: "#621611" },
      { name: "--color-primitive-red-900", value: "#4b0f0b" },
      { name: "--color-primitive-red-950", value: "#390906" },
    ],
  },
  {
    label: "Yellow",
    tokens: [
      { name: "--color-primitive-yellow-050", value: "#fffcf8" },
      { name: "--color-primitive-yellow-100", value: "#fffbf4" },
      { name: "--color-primitive-yellow-150", value: "#fff9ef" },
      { name: "--color-primitive-yellow-200", value: "#fff7ea" },
      { name: "--color-primitive-yellow-250", value: "#fff3e1" },
      { name: "--color-primitive-yellow-300", value: "#fff0da" },
      { name: "--color-primitive-yellow-350", value: "#ffe9c8" },
      { name: "--color-primitive-yellow-400", value: "#ffe1b5" },
      { name: "--color-primitive-yellow-450", value: "#ffd390" },
      { name: "--color-primitive-yellow-500", value: "#ffc46b" },
      { name: "--color-primitive-yellow-550", value: "#ffb546" },
      { name: "--color-primitive-yellow-600", value: "#d59638" },
      { name: "--color-primitive-yellow-650", value: "#ab772a" },
      { name: "--color-primitive-yellow-700", value: "#80591c" },
      { name: "--color-primitive-yellow-750", value: "#6b4915" },
      { name: "--color-primitive-yellow-800", value: "#563a0e" },
      { name: "--color-primitive-yellow-850", value: "#412a07" },
      { name: "--color-primitive-yellow-900", value: "#2c1b00" },
      { name: "--color-primitive-yellow-950", value: "#221500" },
    ],
  },
  {
    label: "Lime",
    tokens: [
      { name: "--color-primitive-lime-050", value: "#fafdf7" },
      { name: "--color-primitive-lime-100", value: "#f8fcf3" },
      { name: "--color-primitive-lime-150", value: "#f5fbee" },
      { name: "--color-primitive-lime-200", value: "#f1fae6" },
      { name: "--color-primitive-lime-250", value: "#ebf8de" },
      { name: "--color-primitive-lime-300", value: "#e5f6d6" },
      { name: "--color-primitive-lime-350", value: "#e0f2cb" },
      { name: "--color-primitive-lime-400", value: "#d5eeba" },
      { name: "--color-primitive-lime-450", value: "#c0e697" },
      { name: "--color-primitive-lime-500", value: "#abdd75" },
      { name: "--color-primitive-lime-550", value: "#96d552" },
      { name: "--color-primitive-lime-600", value: "#7cb143" },
      { name: "--color-primitive-lime-650", value: "#628d34" },
      { name: "--color-primitive-lime-700", value: "#486826" },
      { name: "--color-primitive-lime-750", value: "#3b561e" },
      { name: "--color-primitive-lime-800", value: "#2e4417" },
      { name: "--color-primitive-lime-850", value: "#21320f" },
      { name: "--color-primitive-lime-900", value: "#142008" },
      { name: "--color-primitive-lime-950", value: "#101907" },
    ],
  },
  {
    label: "Green",
    tokens: [
      { name: "--color-primitive-green-050", value: "#f9fdf9" },
      { name: "--color-primitive-green-100", value: "#f5fbf5" },
      { name: "--color-primitive-green-150", value: "#f0fcf0" },
      { name: "--color-primitive-green-200", value: "#e8f9e9" },
      { name: "--color-primitive-green-250", value: "#ddf5df" },
      { name: "--color-primitive-green-300", value: "#d4f1d7" },
      { name: "--color-primitive-green-350", value: "#bfebc4" },
      { name: "--color-primitive-green-400", value: "#aae4b0" },
      { name: "--color-primitive-green-450", value: "#7fd688" },
      { name: "--color-primitive-green-500", value: "#55c961" },
      { name: "--color-primitive-green-550", value: "#2abb39" },
      { name: "--color-primitive-green-600", value: "#239b2f" },
      { name: "--color-primitive-green-650", value: "#1c7c26" },
      { name: "--color-primitive-green-700", value: "#145c1c" },
      { name: "--color-primitive-green-750", value: "#114c17" },
      { name: "--color-primitive-green-800", value: "#0d3d13" },
      { name: "--color-primitive-green-850", value: "#0a2d0e" },
      { name: "--color-primitive-green-900", value: "#061d09" },
      { name: "--color-primitive-green-950", value: "#051908" },
    ],
  },
  {
    label: "Sky",
    tokens: [
      { name: "--color-primitive-sky-050", value: "#f7fdfe" },
      { name: "--color-primitive-sky-100", value: "#f4fcfd" },
      { name: "--color-primitive-sky-150", value: "#edfafe" },
      { name: "--color-primitive-sky-200", value: "#e0f8fc" },
      { name: "--color-primitive-sky-250", value: "#d5f6fb" },
      { name: "--color-primitive-sky-300", value: "#ccf0f9" },
      { name: "--color-primitive-sky-350", value: "#b3e8f6" },
      { name: "--color-primitive-sky-400", value: "#99e1f3" },
      { name: "--color-primitive-sky-450", value: "#66d1ee" },
      { name: "--color-primitive-sky-500", value: "#33c2e8" },
      { name: "--color-primitive-sky-550", value: "#00b3e2" },
      { name: "--color-primitive-sky-600", value: "#0093ba" },
      { name: "--color-primitive-sky-650", value: "#007492" },
      { name: "--color-primitive-sky-700", value: "#00546b" },
      { name: "--color-primitive-sky-750", value: "#004457" },
      { name: "--color-primitive-sky-800", value: "#003543" },
      { name: "--color-primitive-sky-850", value: "#00252f" },
      { name: "--color-primitive-sky-900", value: "#001b22" },
      { name: "--color-primitive-sky-950", value: "#00141a" },
    ],
  },
  {
    label: "Teal",
    tokens: [
      { name: "--color-primitive-teal-050", value: "#f7fdfd" },
      { name: "--color-primitive-teal-100", value: "#f4fcfc" },
      { name: "--color-primitive-teal-150", value: "#edfbfb" },
      { name: "--color-primitive-teal-200", value: "#e1faf9" },
      { name: "--color-primitive-teal-250", value: "#d4f7f5" },
      { name: "--color-primitive-teal-300", value: "#c7f4f1" },
      { name: "--color-primitive-teal-350", value: "#b3ede8" },
      { name: "--color-primitive-teal-400", value: "#99e7e0" },
      { name: "--color-primitive-teal-450", value: "#66dbd0" },
      { name: "--color-primitive-teal-500", value: "#33cfc1" },
      { name: "--color-primitive-teal-550", value: "#00c3b1" },
      { name: "--color-primitive-teal-600", value: "#00a192" },
      { name: "--color-primitive-teal-650", value: "#008074" },
      { name: "--color-primitive-teal-700", value: "#005e55" },
      { name: "--color-primitive-teal-750", value: "#004d46" },
      { name: "--color-primitive-teal-800", value: "#003d37" },
      { name: "--color-primitive-teal-850", value: "#002c27" },
      { name: "--color-primitive-teal-900", value: "#002420" },
      { name: "--color-primitive-teal-950", value: "#001513" },
    ],
  },
  {
    label: "Blue",
    tokens: [
      { name: "--color-primitive-blue-050", value: "#f5fbfe" },
      { name: "--color-primitive-blue-100", value: "#f0f9fe" },
      { name: "--color-primitive-blue-150", value: "#e8f6fd" },
      { name: "--color-primitive-blue-200", value: "#e0f2fc" },
      { name: "--color-primitive-blue-250", value: "#d4edfa" },
      { name: "--color-primitive-blue-300", value: "#c5e7f8" },
      { name: "--color-primitive-blue-350", value: "#aed8f1" },
      { name: "--color-primitive-blue-400", value: "#84c3e9" },
      { name: "--color-primitive-blue-450", value: "#6fb9e5" },
      { name: "--color-primitive-blue-500", value: "#5aafe1" },
      { name: "--color-primitive-blue-550", value: "#2793d5" },
      { name: "--color-primitive-blue-600", value: "#0077c8" },
      { name: "--color-primitive-blue-650", value: "#0066b0" },
      { name: "--color-primitive-blue-700", value: "#005599" },
      { name: "--color-primitive-blue-750", value: "#004581" },
      { name: "--color-primitive-blue-800", value: "#003060" },
      { name: "--color-primitive-blue-850", value: "#002744" },
      { name: "--color-primitive-blue-900", value: "#002035" },
      { name: "--color-primitive-blue-950", value: "#001828" },
    ],
  },
  {
    label: "Purple",
    tokens: [
      { name: "--color-primitive-purple-050", value: "#f9fafe" },
      { name: "--color-primitive-purple-100", value: "#f6f7fd" },
      { name: "--color-primitive-purple-150", value: "#f1f3fc" },
      { name: "--color-primitive-purple-200", value: "#ebeef9" },
      { name: "--color-primitive-purple-250", value: "#e2e7f7" },
      { name: "--color-primitive-purple-300", value: "#d9def5" },
      { name: "--color-primitive-purple-350", value: "#ccd3f1" },
      { name: "--color-primitive-purple-400", value: "#c0c9ed" },
      { name: "--color-primitive-purple-450", value: "#b3beea" },
      { name: "--color-primitive-purple-500", value: "#99a8e3" },
      { name: "--color-primitive-purple-550", value: "#8092dc" },
      { name: "--color-primitive-purple-600", value: "#6978b8" },
      { name: "--color-primitive-purple-650", value: "#515e94" },
      { name: "--color-primitive-purple-700", value: "#3a4571" },
      { name: "--color-primitive-purple-750", value: "#2e385f" },
      { name: "--color-primitive-purple-800", value: "#222b4d" },
      { name: "--color-primitive-purple-850", value: "#171e3b" },
      { name: "--color-primitive-purple-900", value: "#131b3a" },
      { name: "--color-primitive-purple-950", value: "#101730" },
    ],
  },
];

const semanticGroups: ColorGroup[] = [
  {
    label: "Shape",
    tokens: [
      {
        name: "--color-shape-brand",
        value: "var(--color-primitive-blue-550)",
      },
    ],
  },
  {
    label: "Background",
    tokens: [
      {
        name: "--color-bg-background",
        value: "var(--color-primitive-gray-250)",
      },
      {
        name: "--color-bg-surface-primary",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-bg-surface-secondary",
        value: "var(--color-primitive-gray-050)",
      },
      {
        name: "--color-bg-surface-tertiary",
        value: "var(--color-primitive-gray-100)",
      },
      {
        name: "--color-bg-surface-quaternary",
        value: "var(--color-primitive-gray-150)",
      },
      {
        name: "--color-bg-surface-senary",
        value: "var(--color-primitive-gray-200)",
      },
    ],
  },
  {
    label: "Component",
    tokens: [
      {
        name: "--color-component-scrollbar",
        value: "var(--color-primitive-overlay-gray-900-32)",
      },
      {
        name: "--color-component-datatable-item-enabled",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-component-datatable-item-hover",
        value: "var(--color-primitive-gray-250)",
      },
      {
        name: "--color-component-datatable-item-selected",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-component-datatable-header-enabled",
        value: "var(--color-primitive-gray-050)",
      },
      {
        name: "--color-component-button-secondary-default",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-component-button-secondary-selected",
        value: "var(--color-primitive-blue-250)",
      },
      {
        name: "--color-component-button-secondary-disabled",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-component-button-brand-default",
        value: "var(--color-primitive-blue-550)",
      },
      {
        name: "--color-component-button-brand-hover",
        value: "var(--color-primitive-blue-600)",
      },
      {
        name: "--color-component-button-brand-disabled",
        value: "var(--color-primitive-blue-450)",
      },
      {
        name: "--color-component-button-danger-default",
        value: "var(--color-primitive-red-600)",
      },
      {
        name: "--color-component-button-danger-hover",
        value: "var(--color-primitive-red-650)",
      },
      {
        name: "--color-component-button-danger-disabled",
        value: "var(--color-primitive-red-500)",
      },
      {
        name: "--color-component-button-warning-default",
        value: "var(--color-primitive-yellow-500)",
      },
      {
        name: "--color-component-button-warning-hover",
        value: "var(--color-primitive-yellow-550)",
      },
      {
        name: "--color-component-button-warning-disabled",
        value: "var(--color-primitive-yellow-450)",
      },
      {
        name: "--color-component-button-ghost-ghostbtn-default",
        value: "var(--color-primitive-overlay-gray-900-0)",
      },
      {
        name: "--color-component-button-ghost-ghostbtn-hover",
        value: "var(--color-primitive-gray-250)",
      },
      {
        name: "--color-component-button-ghost-ghostbtn-activated",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-component-button-ghost-ghostbtn-selected",
        value: "var(--color-primitive-blue-250)",
      },
      {
        name: "--color-component-box-box-default",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-component-box-box-disabled",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-component-box-ghost-default",
        value: "var(--color-primitive-gray-250)",
      },
      {
        name: "--color-component-box-ghost-ghost-box-on-colorbg",
        value: "var(--color-primitive-overlay-gray-900-40)",
      },
      {
        name: "--color-component-box-ghost-ghost-box-on-darkbg",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-component-box-ghost-hover",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-component-box-ghost-disabled",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-component-box-ghost-populated",
        value: "var(--color-primitive-purple-200)",
      },
      {
        name: "--color-component-box-ghost-populated-hover",
        value: "var(--color-primitive-purple-250)",
      },
      {
        name: "--color-component-box-ghost-activated-inputfield",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-component-tooltip-bg",
        value: "var(--color-primitive-overlay-gray-900-90)",
      },
    ],
  },
  {
    label: "Icon",
    tokens: [
      {
        name: "--color-icon-enabled-1-primary",
        value: "var(--color-primitive-gray-750)",
      },
      {
        name: "--color-icon-enabled-2-secondary",
        value: "var(--color-primitive-gray-700)",
      },
      {
        name: "--color-icon-enabled-3-muted",
        value: "var(--color-primitive-gray-150)",
      },
      {
        name: "--color-icon-selected",
        value: "var(--color-primitive-blue-600)",
      },
      {
        name: "--color-icon-disabled",
        value: "var(--color-primitive-gray-550)",
      },
      {
        name: "--color-icon-enabled-white",
        value: "var(--color-primitive-white)",
      },
    ],
  },
  {
    label: "Text",
    tokens: [
      {
        name: "--color-text-gray-0-primary",
        value: "var(--color-primitive-gray-950)",
      },
      {
        name: "--color-text-gray-1-secondary",
        value: "var(--color-primitive-gray-900)",
      },
      {
        name: "--color-text-gray-2-tertiary",
        value: "var(--color-primitive-gray-850)",
      },
      {
        name: "--color-text-gray-3-quaternary",
        value: "var(--color-primitive-gray-750)",
      },
      {
        name: "--color-text-gray-4-quinary",
        value: "var(--color-primitive-gray-700)",
      },
      {
        name: "--color-text-gray-5-senary",
        value: "var(--color-primitive-gray-650)",
      },
      {
        name: "--color-text-gray-6-septenary",
        value: "var(--color-primitive-gray-550)",
      },
      { name: "--color-text-link", value: "var(--color-primitive-purple-650)" },
      {
        name: "--color-text-link-hover",
        value: "var(--color-primitive-purple-750)",
      },
      {
        name: "--color-text-link-opened",
        value: "var(--color-primitive-purple-550)",
      },
      { name: "--color-text-brand", value: "var(--color-primitive-blue-550)" },
      {
        name: "--color-text-button-brand-default",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-text-button-brand-disabled",
        value: "var(--color-primitive-blue-350)",
      },
      {
        name: "--color-text-button-secondary-default",
        value: "var(--color-primitive-gray-850)",
      },
      {
        name: "--color-text-button-secondary-disabled",
        value: "var(--color-primitive-gray-550)",
      },
      {
        name: "--color-text-button-secondary-activated",
        value: "var(--color-primitive-blue-600)",
      },
      {
        name: "--color-text-button-danger-default",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-text-button-on-danger-disabled",
        value: "var(--color-primitive-red-300)",
      },
      {
        name: "--color-text-button-warning-default",
        value: "var(--color-primitive-white)",
      },
      {
        name: "--color-text-button-warning-disabled",
        value: "var(--color-primitive-yellow-300)",
      },
      {
        name: "--color-text-button-ghost-default",
        value: "var(--color-primitive-gray-750)",
      },
      {
        name: "--color-text-button-ghost-disabled",
        value: "var(--color-primitive-gray-550)",
      },
      {
        name: "--color-text-button-ghost-bg-dark",
        value: "var(--color-primitive-gray-150)",
      },
      { name: "--color-text-danger", value: "var(--color-primitive-red-650)" },
      {
        name: "--color-text-warning",
        value: "var(--color-primitive-yellow-600)",
      },
      {
        name: "--color-text-button-ghost-link-default",
        value: "var(--color-primitive-purple-600)",
      },
      {
        name: "--color-text-button-ghost-link-disabled",
        value: "var(--color-primitive-gray-550)",
      },
      {
        name: "--color-text-box-default",
        value: "var(--color-primitive-gray-850)",
      },
      {
        name: "--color-text-box-hint",
        value: "var(--color-primitive-gray-650)",
      },
      {
        name: "--color-text-box-disabled",
        value: "var(--color-primitive-gray-550)",
      },
      {
        name: "--color-text-box-selected",
        value: "var(--color-primitive-gray-850)",
      },
      {
        name: "--color-text-box-ghost-default",
        value: "var(--color-primitive-gray-750)",
      },
      {
        name: "--color-text-box-ghost-hint",
        value: "var(--color-primitive-gray-650)",
      },
      {
        name: "--color-text-box-ghost-selected",
        value: "var(--color-primitive-gray-850)",
      },
      {
        name: "--color-text-box-ghost-bg-dark",
        value: "var(--color-primitive-gray-150)",
      },
    ],
  },
  {
    label: "Line",
    tokens: [
      {
        name: "--color-line-1-primary",
        value: "var(--color-primitive-gray-550)",
      },
      {
        name: "--color-line-2-secondary",
        value: "var(--color-primitive-gray-500)",
      },
      {
        name: "--color-line-3-tertiary",
        value: "var(--color-primitive-gray-450)",
      },
      {
        name: "--color-line-4-quaternary",
        value: "var(--color-primitive-gray-400)",
      },
      {
        name: "--color-line-5-quinary",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-line-6-senary",
        value: "var(--color-primitive-gray-250)",
      },
      {
        name: "--color-line-7-septenary",
        value: "var(--color-primitive-gray-200)",
      },
      {
        name: "--color-line-datatable-item-x-enabled",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-line-datatable-item-x-hover",
        value: "var(--color-primitive-gray-350)",
      },
      {
        name: "--color-line-datatable-item-x-selected",
        value: "var(--color-primitive-gray-400)",
      },
      {
        name: "--color-line-datatable-item-y-default",
        value: "var(--color-primitive-gray-400)",
      },
    ],
  },
  {
    label: "Border",
    tokens: [
      {
        name: "--color-border-button-secondary-enabled",
        value: "var(--color-primitive-gray-400)",
      },
      {
        name: "--color-border-button-secondary-hover",
        value: "var(--color-primitive-gray-550)",
      },
      {
        name: "--color-border-button-secondary-activated",
        value: "var(--color-primitive-blue-550)",
      },
      {
        name: "--color-border-button-secondary-activated-hover",
        value: "var(--color-primitive-blue-600)",
      },
      {
        name: "--color-border-button-secondary-selected",
        value: "var(--color-primitive-gray-450)",
      },
      {
        name: "--color-border-button-secondary-selected-hover",
        value: "var(--color-primitive-gray-500)",
      },
      {
        name: "--color-border-focused",
        value: "var(--color-primitive-blue-600)",
      },
      {
        name: "--color-border-box-enabled-disabled-selected",
        value: "var(--color-primitive-gray-450)",
      },
      {
        name: "--color-border-box-hover-selected-hover",
        value: "var(--color-primitive-gray-550)",
      },
      {
        name: "--color-border-box-select-activated",
        value: "var(--color-primitive-blue-550)",
      },
      {
        name: "--color-border-box-ghost-disabled",
        value: "var(--color-primitive-gray-400)",
      },
      {
        name: "--color-border-box-ghost-populated",
        value: "var(--color-primitive-purple-250)",
      },
    ],
  },
];

function ColorSwatch({ token }: { token: ColorToken }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4xs)",
        width: "168px",
      }}
    >
      <div
        style={{
          height: "var(--spacing-5xl)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-line-6-senary)",
          background: `var(${token.name})`,
        }}
      />
      <span
        style={{
          fontFamily: "var(--typography-label-sm-12-500-font-family)",
          fontWeight: "var(--typography-label-sm-12-500-font-weight)",
          fontSize: "var(--typography-label-sm-12-500-font-size)",
          color: "var(--color-text-gray-1-secondary)",
          wordBreak: "break-all",
        }}
      >
        {token.name}
      </span>
      <span
        style={{
          fontFamily: "var(--typography-label-xs-12-400-font-family)",
          fontWeight: "var(--typography-label-xs-12-400-font-weight)",
          fontSize: "var(--typography-label-xs-12-400-font-size)",
          color: "var(--color-text-gray-4-quinary)",
          wordBreak: "break-all",
        }}
      >
        {token.value}
      </span>
    </div>
  );
}

function ColorGroupSection({ group }: { group: ColorGroup }) {
  return (
    <section style={{ marginBottom: "var(--spacing-3xl)" }}>
      <h3
        style={{
          fontFamily: "var(--typography-heading-xs-14-500-font-family)",
          fontWeight: "var(--typography-heading-xs-14-500-font-weight)",
          fontSize: "var(--typography-heading-xs-14-500-font-size)",
          color: "var(--color-text-gray-0-primary)",
          marginBottom: "var(--spacing-sm)",
        }}
      >
        {group.label}
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--spacing-md)",
        }}
      >
        {group.tokens.map((token) => (
          <ColorSwatch key={token.name} token={token} />
        ))}
      </div>
    </section>
  );
}

function ColorPalette({
  title,
  groups,
}: {
  title: string;
  groups: ColorGroup[];
}) {
  return (
    <div style={{ padding: "var(--spacing-xl)" }}>
      <h2
        style={{
          fontFamily: "var(--typography-heading-md-20-600-font-family)",
          fontWeight: "var(--typography-heading-md-20-600-font-weight)",
          fontSize: "var(--typography-heading-md-20-600-font-size)",
          color: "var(--color-text-gray-0-primary)",
          marginBottom: "var(--spacing-xl)",
        }}
      >
        {title}
      </h2>
      {groups.map((group) => (
        <ColorGroupSection key={group.label} group={group} />
      ))}
    </div>
  );
}

const meta = {
  title: "Foundation/Colors",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primitive: Story = {
  render: () => (
    <ColorPalette title="Primitive Colors" groups={primitiveGroups} />
  ),
};

export const Semantic: Story = {
  render: () => (
    <ColorPalette title="Semantic Colors" groups={semanticGroups} />
  ),
};
