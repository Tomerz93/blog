import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files';
import highlight from 'rehype-highlight'

const computedFields: ComputedFields = {
  url: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.sourceFilePath.replace('.mdx', '')}`
  },
  slug: {
    type: 'string',
    resolve: (doc) => `${doc._raw.sourceFileName.replace('.mdx', '')}`,
  },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    createdAt: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    image: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'summary of the post',
      required: false,
    },
    isFeatured: {
      type: 'boolean',
      required: false,
      default: false
    },

  },
  computedFields
}));

export const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  contentType: 'mdx',
  fields: {
    lang: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },

  },
  computedFields
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post, Snippet],
  mdx: { rehypePlugins: [highlight] },
});
