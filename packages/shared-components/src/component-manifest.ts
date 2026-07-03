const componentManifest = [
  {
    "slug": "accordion",
    "name": "Accordion",
    "file": "./src/components/accordion/index.tsx"
  },
  {
    "slug": "alert-dialog",
    "name": "AlertDialog",
    "file": "./src/components/alert-dialog/index.tsx"
  },
  {
    "slug": "autocomplete",
    "name": "Autocomplete",
    "file": "./src/components/autocomplete/index.tsx"
  },
  {
    "slug": "avatar",
    "name": "Avatar",
    "file": "./src/components/avatar/index.tsx"
  },
  {
    "slug": "badge",
    "name": "Badge",
    "file": "./src/components/badge/index.tsx"
  },
  {
    "slug": "button",
    "name": "Button",
    "file": "./src/components/button/index.tsx"
  },
  {
    "slug": "card",
    "name": "Card",
    "file": "./src/components/card/index.tsx"
  },
  {
    "slug": "checkbox-group",
    "name": "CheckboxGroup",
    "file": "./src/components/checkbox-group/index.tsx"
  },
  {
    "slug": "checkbox",
    "name": "Checkbox",
    "file": "./src/components/checkbox/index.tsx"
  },
  {
    "slug": "collapsible",
    "name": "Collapsible",
    "file": "./src/components/collapsible/index.tsx"
  },
  {
    "slug": "combobox",
    "name": "Combobox",
    "file": "./src/components/combobox/index.tsx"
  },
  {
    "slug": "context-menu",
    "name": "ContextMenu",
    "file": "./src/components/context-menu/index.tsx"
  },
  {
    "slug": "dialog",
    "name": "Dialog",
    "file": "./src/components/dialog/index.tsx"
  },
  {
    "slug": "drawer",
    "name": "Drawer",
    "file": "./src/components/drawer/index.tsx"
  },
  {
    "slug": "field",
    "name": "Field",
    "file": "./src/components/field/index.tsx"
  },
  {
    "slug": "fieldset",
    "name": "Fieldset",
    "file": "./src/components/fieldset/index.tsx"
  },
  {
    "slug": "form",
    "name": "Form",
    "file": "./src/components/form/index.tsx"
  },
  {
    "slug": "input",
    "name": "Input",
    "file": "./src/components/input/index.tsx"
  },
  {
    "slug": "menu",
    "name": "Menu",
    "file": "./src/components/menu/index.tsx"
  },
  {
    "slug": "menubar",
    "name": "Menubar",
    "file": "./src/components/menubar/index.tsx"
  },
  {
    "slug": "meter",
    "name": "Meter",
    "file": "./src/components/meter/index.tsx"
  },
  {
    "slug": "navigation-menu",
    "name": "NavigationMenu",
    "file": "./src/components/navigation-menu/index.tsx"
  },
  {
    "slug": "number-field",
    "name": "NumberField",
    "file": "./src/components/number-field/index.tsx"
  },
  {
    "slug": "otp-field",
    "name": "OTPField",
    "file": "./src/components/otp-field/index.tsx"
  },
  {
    "slug": "popover",
    "name": "Popover",
    "file": "./src/components/popover/index.tsx"
  },
  {
    "slug": "price-display",
    "name": "PriceDisplay",
    "file": "./src/components/price-display/index.tsx"
  },
  {
    "slug": "preview-card",
    "name": "PreviewCard",
    "file": "./src/components/preview-card/index.tsx"
  },
  {
    "slug": "progress",
    "name": "Progress",
    "file": "./src/components/progress/index.tsx"
  },
  {
    "slug": "radio-group",
    "name": "RadioGroup",
    "file": "./src/components/radio-group/index.tsx"
  },
  {
    "slug": "radio",
    "name": "Radio",
    "file": "./src/components/radio/index.tsx"
  },
  {
    "slug": "scroll-area",
    "name": "ScrollArea",
    "file": "./src/components/scroll-area/index.tsx"
  },
  {
    "slug": "select",
    "name": "Select",
    "file": "./src/components/select/index.tsx"
  },
  {
    "slug": "separator",
    "name": "Separator",
    "file": "./src/components/separator/index.tsx"
  },
  {
    "slug": "slider",
    "name": "Slider",
    "file": "./src/components/slider/index.tsx"
  },
  {
    "slug": "sonner",
    "name": "Toaster",
    "file": "./src/components/sonner/index.tsx"
  },
  {
    "slug": "switch",
    "name": "Switch",
    "file": "./src/components/switch/index.tsx"
  },
  {
    "slug": "tabs",
    "name": "Tabs",
    "file": "./src/components/tabs/index.tsx"
  },
  {
    "slug": "toast",
    "name": "Toast",
    "file": "./src/components/toast/index.tsx"
  },
  {
    "slug": "toggle-group",
    "name": "ToggleGroup",
    "file": "./src/components/toggle-group/index.tsx"
  },
  {
    "slug": "toggle",
    "name": "Toggle",
    "file": "./src/components/toggle/index.tsx"
  },
  {
    "slug": "toolbar",
    "name": "Toolbar",
    "file": "./src/components/toolbar/index.tsx"
  },
  {
    "slug": "tooltip",
    "name": "Tooltip",
    "file": "./src/components/tooltip/index.tsx"
  }
] as const;

type ComponentName = (typeof componentManifest)[number]['name'];

export { componentManifest };
export type { ComponentName };
