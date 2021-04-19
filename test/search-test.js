import { expect } from 'chai';

import Search from '../src/search.js';

describe('Search', () => {

  it('should be an instance of a Search', () => {
    const search = new Search();
    expect(search).to.be.an.instanceof(Search);
  });

  it('should be able to filter arrays by tag', () => {
    const mockArray = [
      {tags: ['find me']}, 
      {tags: ['not found']}
    ];
    const search = new Search();

    expect(search.filterByTag('find me', mockArray))
      .to.eql([{tags: ['find me']}]);
  });

  it('should return an empty array when there are no matches', () => {
    const mockArray = [
      {tags: ['find me']}, 
      {tags: ['not found']}
    ];
    const search = new Search();

    expect(search.filterByTag('no match', mockArray))
      .to.eql([]);
  });

});