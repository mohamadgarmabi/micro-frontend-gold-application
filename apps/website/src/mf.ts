import { createInstance } from '@module-federation/runtime';
import {
  createElement,
  type ComponentType,
  type Attributes,
} from 'react';

function getSharedComponentsEntry() {
  if (typeof window === 'undefined') {
    return 'http://127.0.0.1:5100/remoteEntry.js';
  }

  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:5100/remoteEntry.js`;
}

const federation = createInstance({
  name: 'website',
  remotes: [
    {
      alias: 'shared_components',
      name: 'shared_components',
      entry: getSharedComponentsEntry(),
      type: 'module',
    },
  ],
});

export async function loadReactRemote<Props extends Attributes>(
  exposeName: string
): Promise<ComponentType<Props>> {
  const mod = await federation.loadRemote<{ default: ComponentType<Props> }>(
    `shared_components/${exposeName}`
  );

  if (!mod?.default) {
    throw new Error(`Failed to load shared_components/${exposeName}`);
  }

  return mod.default;
}

export { createElement };
