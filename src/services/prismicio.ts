import * as prismic from '@prismicio/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as prismicH from '@prismicio/helpers';
import * as prismicNext from '@prismicio/next';
import sm from './sm.json';

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/** @type {prismicH.LinkResolverFunction} */
export function linkResolver (doc) {
  switch (doc.type) {
  case 'homepage':
    return '/';
  case 'page':
    return `/${doc.uid}`;
  default:
    return null;
  }
}

/** @param {prismicNext.CreateClientConfig} config={} */
export const createClient = (config) => {
  const client = prismic.createClient(sm.apiEndpoint, { ...config, accessToken: process.env.PRISMIC_ACCESS_TOKEN });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req
  });

  return client;
};