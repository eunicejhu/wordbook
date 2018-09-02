
import * as algoliasearch from 'algoliasearch';
import * as algoliasearchHelper from 'algoliasearch-helper';

const setUpAlgolia = () => {
  //TODO: share the index instance among calls
  let client, single_index, single_helper
  client = algoliasearch('ICTF4VUUTA', '9175a67acef82b6123e86c727f7eabb7');
  single_index = client.initIndex('books');
  single_helper = algoliasearchHelper(client, 'books', {
    disjunctiveFacets: ['category']
  })
  return { single_index, single_helper}
}

var {single_index,single_helper} = setUpAlgolia()

export const getCategoryAndHits = (hitsPerPage) => {
  return new Promise((resolve, reject) => {
    single_index.search({
      facets: ['category'],
      hitsPerPage: hitsPerPage
    }, (err, content) => {
      if (err) reject(err)
      resolve(content)
    })
  })
}
/**
 * using algolia Helper api
 */
export const queryWithHelper = (searchParameters) => {
  let { hitsPerPage, filters, query, page } = searchParameters
  return new Promise((resolve, reject) => {
    single_helper.setQueryParameter('query', query).setQueryParameter('hitsPerPage', hitsPerPage)
    
    // single_helper.clearRefinements()
    // filters.forEach(filter => {
    //   single_helper.addDisjunctiveFacetRefinement('category', filter)
    // })
    single_helper.setPage(page)
    single_helper.removeAllListeners('result')
    single_helper.removeAllListeners('error')
    single_helper.once('result', (content) => {
      resolve(content)
    })

    single_helper.once('error', (error) => {
      console.log({ error })
      reject(error)
    })
    single_helper.search()
  })
  
}

export const toggleFilter = filter => {
  return new Promise((resolve, reject) => {
    single_helper.toggleFacetRefinement('category', filter)
    single_helper.setPage(0)
    single_helper.removeAllListeners('result')
    single_helper.removeAllListeners('error')
    single_helper.once('result', (content) => {
      resolve(content)
    })
    single_helper.once('error', (error) => {
      console.log({ error })
      reject(error)
    })
    single_helper.search()
  })
}
export const clearFilters = () => {
  return new Promise((resolve, reject) => {
    single_helper.clearRefinements('category')
    single_helper.setPage(0)
    single_helper.removeAllListeners('result')
    single_helper.removeAllListeners('error')
    single_helper.on('result', (content) => {
      resolve(content)
    })
    single_helper.on('error', (error) => {
      console.log({ error })
      reject(error)
    })
    single_helper.search()
  })
}