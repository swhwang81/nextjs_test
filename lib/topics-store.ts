import seedData from "@/db.json";

export type Topic = {
  id: number;
  title: string;
  body: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __topicsStore: Topic[] | undefined;
}

function getStore(): Topic[] {
  if (!global.__topicsStore) {
    global.__topicsStore = seedData.topics.map((topic) => ({ ...topic }));
  }

  return global.__topicsStore;
}

export function getTopics(): Topic[] {
  return [...getStore()].sort((a, b) => a.id - b.id);
}

export function getTopicById(id: number): Topic | undefined {
  return getStore().find((topic) => topic.id === id);
}

export function createTopic(input: { title: string; body: string }): Topic {
  const store = getStore();
  const maxId = store.reduce((max, topic) => Math.max(max, topic.id), 0);
  const nextTopic: Topic = {
    id: maxId + 1,
    title: input.title,
    body: input.body,
  };

  store.push(nextTopic);
  return nextTopic;
}

export function updateTopic(
  id: number,
  input: Partial<{ title: string; body: string }>
): Topic | undefined {
  const store = getStore();
  const index = store.findIndex((topic) => topic.id === id);

  if (index === -1) {
    return undefined;
  }

  const current = store[index];
  const nextTitle = input.title?.trim();
  const nextBody = input.body?.trim();

  store[index] = {
    ...current,
    title: nextTitle && nextTitle.length > 0 ? nextTitle : current.title,
    body: nextBody && nextBody.length > 0 ? nextBody : current.body,
  };

  return store[index];
}

export function deleteTopic(id: number): boolean {
  const store = getStore();
  const index = store.findIndex((topic) => topic.id === id);

  if (index === -1) {
    return false;
  }

  store.splice(index, 1);
  return true;
}
