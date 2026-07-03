export const componentManifest = [
  {
    "slug": "accordion",
    "name": "Accordion",
    "file": "./src/components/accordion.tsx"
  },
  {
    "slug": "alert-dialog",
    "name": "AlertDialog",
    "file": "./src/components/alert-dialog.tsx"
  },
  {
    "slug": "autocomplete",
    "name": "Autocomplete",
    "file": "./src/components/autocomplete.tsx"
  },
  {
    "slug": "avatar",
    "name": "Avatar",
    "file": "./src/components/avatar.tsx"
  },
  {
    "slug": "button",
    "name": "Button",
    "file": "./src/components/button.tsx"
  },
  {
    "slug": "checkbox",
    "name": "Checkbox",
    "file": "./src/components/checkbox.tsx"
  },
  {
    "slug": "checkbox-group",
    "name": "CheckboxGroup",
    "file": "./src/components/checkbox-group.tsx"
  },
  {
    "slug": "collapsible",
    "name": "Collapsible",
    "file": "./src/components/collapsible.tsx"
  },
  {
    "slug": "combobox",
    "name": "Combobox",
    "file": "./src/components/combobox.tsx"
  },
  {
    "slug": "context-menu",
    "name": "ContextMenu",
    "file": "./src/components/context-menu.tsx"
  },
  {
    "slug": "dialog",
    "name": "Dialog",
    "file": "./src/components/dialog.tsx"
  },
  {
    "slug": "drawer",
    "name": "Drawer",
    "file": "./src/components/drawer.tsx"
  },
  {
    "slug": "field",
    "name": "Field",
    "file": "./src/components/field.tsx"
  },
  {
    "slug": "fieldset",
    "name": "Fieldset",
    "file": "./src/components/fieldset.tsx"
  },
  {
    "slug": "form",
    "name": "Form",
    "file": "./src/components/form.tsx"
  },
  {
    "slug": "input",
    "name": "Input",
    "file": "./src/components/input.tsx"
  },
  {
    "slug": "menu",
    "name": "Menu",
    "file": "./src/components/menu.tsx"
  },
  {
    "slug": "menubar",
    "name": "Menubar",
    "file": "./src/components/menubar.tsx"
  },
  {
    "slug": "meter",
    "name": "Meter",
    "file": "./src/components/meter.tsx"
  },
  {
    "slug": "navigation-menu",
    "name": "NavigationMenu",
    "file": "./src/components/navigation-menu.tsx"
  },
  {
    "slug": "number-field",
    "name": "NumberField",
    "file": "./src/components/number-field.tsx"
  },
  {
    "slug": "otp-field",
    "name": "OTPField",
    "file": "./src/components/otp-field.tsx"
  },
  {
    "slug": "popover",
    "name": "Popover",
    "file": "./src/components/popover.tsx"
  },
  {
    "slug": "preview-card",
    "name": "PreviewCard",
    "file": "./src/components/preview-card.tsx"
  },
  {
    "slug": "progress",
    "name": "Progress",
    "file": "./src/components/progress.tsx"
  },
  {
    "slug": "radio",
    "name": "Radio",
    "file": "./src/components/radio.tsx"
  },
  {
    "slug": "radio-group",
    "name": "RadioGroup",
    "file": "./src/components/radio-group.tsx"
  },
  {
    "slug": "scroll-area",
    "name": "ScrollArea",
    "file": "./src/components/scroll-area.tsx"
  },
  {
    "slug": "select",
    "name": "Select",
    "file": "./src/components/select.tsx"
  },
  {
    "slug": "separator",
    "name": "Separator",
    "file": "./src/components/separator.tsx"
  },
  {
    "slug": "slider",
    "name": "Slider",
    "file": "./src/components/slider.tsx"
  },
  {
    "slug": "switch",
    "name": "Switch",
    "file": "./src/components/switch.tsx"
  },
  {
    "slug": "tabs",
    "name": "Tabs",
    "file": "./src/components/tabs.tsx"
  },
  {
    "slug": "toast",
    "name": "Toast",
    "file": "./src/components/toast.tsx"
  },
  {
    "slug": "toggle",
    "name": "Toggle",
    "file": "./src/components/toggle.tsx"
  },
  {
    "slug": "toggle-group",
    "name": "ToggleGroup",
    "file": "./src/components/toggle-group.tsx"
  },
  {
    "slug": "toolbar",
    "name": "Toolbar",
    "file": "./src/components/toolbar.tsx"
  },
  {
    "slug": "tooltip",
    "name": "Tooltip",
    "file": "./src/components/tooltip.tsx"
  }
] as const;

export type ComponentName = (typeof componentManifest)[number]['name'];
