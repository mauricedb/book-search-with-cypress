/// <reference types='cypress' />

describe('Flaky tests', () => {
  let now;

  before(() => {
    now = Date.now();
  });

  it('will fail sometimes', () => {
    now++;
    expect(now % 2).to.equal(0, 'Now should be even');
  });
});
