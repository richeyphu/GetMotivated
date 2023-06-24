import { isSusDomain } from "./checkUrl";

chrome.runtime.onInstalled.addListener(() => {
  // default state goes here
  // this runs ONE TIME ONLY (unless the user reinstalls your extension)
  console.log('Get Motivated installed!');
});

chrome.commands.onCommand.addListener((command) => {
  // do something when the user presses your keyboard shortcut
});

chrome.omnibox.onInputEntered.addListener((text) => {
  console.log(isSusDomain(text));
});
