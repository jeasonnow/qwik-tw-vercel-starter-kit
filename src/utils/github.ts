import fetch from 'node-fetch';
import ubuntuLogo from '~/assets/icon-appImage.svg';
import windowsLogo from '~/assets/windows-logo.png';
import macLogo from '~/assets/app-logo.png';
import debLogo from '~/assets/deb-logo.png';

import * as appLogos from '~/assets/apps';

export type AppType = 'dmg' | 'deb' | 'msi' | 'AppImage'
export type AppNames = 'ChatGPT' | 'CodeRunner' | 'Flomo' | 'LiZhi' | 'Poe' | 'ProgramMusic' | 'Qwerty' | 'Reference' | 'Twitter' | 'WeRead' | 'XiaoHongShu' | 'YouTube' | 'YouTubeMusic';

export interface AppInfo {
  name: string;
  assets: {
    url: string;
    type: AppType;
    icon: string;
  }[];
  icon?: string;
}

export interface ReleaseInfo {
  apps: AppInfo[];
  release: string;
  tag: string;
}

export interface GithubAsset {
  created_at: string;
  name: string;
  browser_download_url: string;
  updated_at: string;
}

export interface GithubLatestReleaseInfo {
  assets: GithubAsset[];
  name: string;
  tag_name: string;
}

function getAppIcon(appName: AppNames): string {
  const iconDict: Record<AppNames, string> = {
    'ChatGPT': appLogos.chatgpt,
    'CodeRunner': appLogos.coderunner,
    'Flomo': appLogos.flomo,
    'LiZhi': appLogos.lizhi,
    'Poe': appLogos.poe,
    'ProgramMusic': appLogos.programmusic,
    'Qwerty': appLogos.qwerty,
    'Reference': appLogos.reference,
    'Twitter': appLogos.twitter,
    'WeRead': appLogos.weread,
    'XiaoHongShu': appLogos.xiaohongshu,
    'YouTube': appLogos.youtube,
    'YouTubeMusic': appLogos.youtubemusic, 
  };

  return iconDict[appName] || appLogos.defaultApp;
}


export function getRepoReleaseApps(repoName: string): Promise<ReleaseInfo> {
  const assetsUrl = `https://api.github.com/repos/${repoName}/releases/latest`;
  return new Promise((resolve, reject) => {
    fetch(assetsUrl)
      .then(res => res.json())
      .then((res) => {
        const {assets, name, tag_name: tag} = res as GithubLatestReleaseInfo;
        const releaseInfo = (assets ?? []).reduce((result: ReleaseInfo, asset: GithubAsset): ReleaseInfo => {
          const {browser_download_url: url, name: fileName} = asset;
          const fileSuffix = ['.dmg', '_x64.msi', '_x86_64.AppImage', '_x86_64.deb'];
          const typeToLogo = {
            'deb': debLogo,
            'AppImage': ubuntuLogo,
            'msi': windowsLogo,
            'dmg': macLogo
          };
          const appType = fileName.split('.').pop() as AppType;
          const suffixIndex = fileSuffix.findIndex(item => item.endsWith(appType));
          const appName = fileName.replace(fileSuffix[suffixIndex], '');
          const app = result.apps?.find(item => item.name === appName);
          if (app) {
            app.assets.push({url, type: appType, icon: typeToLogo[appType as keyof typeof typeToLogo]});
          } else {
            result.apps.push({
              name: appName,
              assets: [{url, type: appType, icon: typeToLogo[appType as keyof typeof typeToLogo]}],
              icon: getAppIcon(appName as AppNames),
            });
          }
          return result;
        }, {
          apps: [],
          release: name,
          tag
        });
        resolve(releaseInfo);
      }).catch(e => reject(e))
  })
}