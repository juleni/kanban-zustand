import { createWithEqualityFn } from "zustand/traditional";

const store = (set) => ({
  tasks: [{ title: "TestTask", state: "DONE" }],
});

export const useStore = createWithEqualityFn(store);
