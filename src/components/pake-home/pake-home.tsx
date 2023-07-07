import { component$, useContext} from '@builder.io/qwik';
import { pakeContext } from '~/routes/layout';


export const PakeHome = component$(() => {
  const appInfo = useContext(pakeContext);

  const apps = appInfo?.value.apps || [];
  const release = appInfo?.value.release || "";

  return (<div class="mx-auto container">
    {release && <h2 class="text-center text-slate-950 font-bold text-3xl font-mono">{release}</h2>}
    <ul class="grid max-w-[26rem] sm:max-w-[52.5rem] mt-10 sm:mt-14 md:mt-26 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
      {apps.map(app => {
        return <li key={app.name} class="group relative rounded-3xl bg-slate-50 p-6 dark:bg-slate-800/80 dark:highlight-white/5 hover:bg-slate-100 dark:hover:bg-slate-700/50">
          <img class="w-16 h-16" src={app.icon} />
          <p class="text-base font-mono font-semibold text-black mt-2">{app.name}</p>
          <div class="text-sm text-slate-950 font-light flex mt-2">
            {app.assets.map(item => <div class="text-slate-900 text-sm font-mono font-light mr-2" key={item.url}><a title={item.type} class="text-blue-400 font-bold" href={item.url}><img alt={item.type} class="w-5" src={item.icon} /></a></div>)}
          </div>
        </li>
      })}
    </ul>
    
  </div>)
})