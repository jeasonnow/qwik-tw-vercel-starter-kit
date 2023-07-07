import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PakeHome } from '~/components/pake-home/pake-home';

export default component$(() => {
  return (
    <div class="overflow-y-auto overflow-x-hidden bg-white flex-1">
      <PakeHome />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Pake',
  meta: [
    {
      name: 'description',
      content: 'Turn any webpage into a desktop app with Rust with ease.',
    },
  ],
};
