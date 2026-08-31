import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { mergeConfig } from 'vite';

const workspacePackages = [
  '@gold/apis',
  '@gold/form',
  '@gold/shared-components',
];

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@chromatic-com/storybook'],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [react({ compiler: true }), tailwindcss()],
      optimizeDeps: {
        exclude: workspacePackages,
      },
    })
  },
}

export default config;
