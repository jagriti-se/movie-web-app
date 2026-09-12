const store = new Map();

function get(key) {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

function set(key, value, ttlMs) {
  store.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
}

function del(key) {
  store.delete(key);
}

function clear() {
  store.clear();
}

function size() {
  return store.size;
}

export { get, set, del, clear, size };