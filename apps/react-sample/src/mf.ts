import { lazy, type ComponentType } from 'react';
import { registerRemotes, loadRemote } from '@module-federation/runtime';

const PROVIDERS = [
  {
    alias: 'shared_components',
    name: 'shared_components',
    entry: 'http://localhost:5100/remoteEntry.js',
  },
] as const;

registerRemotes(PROVIDERS.map((remote) => ({ ...remote, type: 'module' as const })));

export function lazyRemote<Props = Record<string, unknown>>(
  alias: string,
  exposeName: string
) {
  return lazy(async () => {
    const mod = await loadRemote<{ default: ComponentType<Props> }>(
      `${alias}/${exposeName}`
    );
    return { default: mod!.default };
  });
}
