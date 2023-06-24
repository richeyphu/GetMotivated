import { storage } from '../storage';
import { isSusDomain } from '../utils';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Get Motivated installed!');
  storage.get().then(console.log);
});

chrome.omnibox.onInputEntered.addListener((text) => {
  console.log(text);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete' && tab.active) {
    console.log(tab.url);

    if (await isSusDomain(tab.url)) {
      console.log('sus domain');
    } else {
      console.log('not sus domain');
    }
  }
});
