import type { Signal} from '@builder.io/qwik';
import { component$, createContextId, Slot, useContextProvider, useSignal, useStyles$, useTask$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Header from '~/components/starter/header/header';

import styles from './styles.css?inline';
import type { ReleaseInfo } from '~/utils/github';
import { getRepoReleaseApps } from '~/utils/github';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

const PAKE_REPO_NAME = "tw93/Pake";
export const pakeContext = createContextId<Signal<ReleaseInfo>>("pakeContext");

export default component$(() => {
  useStyles$(styles);
  const appInfos = useSignal<ReleaseInfo>();
  useContextProvider(pakeContext, appInfos);

  useTask$(async () => {
    const appRes = await getRepoReleaseApps(PAKE_REPO_NAME);
    appInfos.value = appRes;
  });
  
  return (
    <div class="h-screen bg-white flex flex-col font-mono">
      <Header />
      <main>
        <Slot />
      </main>
    </div>
  );
});
