export const postFactory = (overrides = {}) => ({
  title: 'Test Post',
  content: 'Test Content',
  ...overrides
});
