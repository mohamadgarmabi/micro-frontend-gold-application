import type { Preview } from '@storybook/react-vite';
import '../src/styles.css';

const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: 'Light / dark mode',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorMode: 'light',
  },
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, { globals }) => {
      const isDark = globals.colorMode === 'dark';
      return (
        <div
          className={`gold-root ${isDark ? 'dark' : 'light'} min-w-[20rem] bg-surface p-6 text-foreground`}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
