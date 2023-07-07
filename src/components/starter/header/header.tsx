import { component$, useContext } from '@builder.io/qwik';
import logo from '~/assets/Pake-logo.png';
import { pakeContext } from '~/routes/layout';

const pakeLink = "https://github.com/tw93/Pake";


export default component$(() => {
  const appInfos = useContext(pakeContext);

  const tag = appInfos.value?.tag || "0.0.0";

  return (
    <header class="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0 sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div class="relative flex items-center justify-between">
        <div class="flex items-center">
          <a href={pakeLink} title="Pake Release Apps" class="font-bold block mr-3 text-slate-950">
            <img src={logo} class="w-12"  />
          </a>
          <a href={pakeLink} class="font-bold text-slate-950">Pake Release Apps</a>
        </div>
        
        <a class="text-slate-950 font-light" >Latest Release is: {tag}</a>
      </div>
    </header>
  );
});
