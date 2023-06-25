export const motivatedByList = ["vergil", "yee", "nanomachines"]
export type IMotivatedBy = typeof motivatedByList[number]

type IStorage = {
  motivatedBy?: IMotivatedBy;
  getMotivated?: boolean;
};

const defaultStorage: IStorage = {
  motivatedBy: "vergil",
  getMotivated: true,
};

export const storage = {
  get: () => chrome.storage.local.get(defaultStorage),
  set: (value: IStorage) => chrome.storage.local.set(value),
};
