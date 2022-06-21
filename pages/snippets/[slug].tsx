import { allSnippets, Snippet } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { PageMeta } from 'components';

export const getStaticPaths = async () => {
  const paths = allSnippets.map((snippet) => snippet.url);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }: { params: { slug: string } }) => {
  const snippet = allSnippets.find((snippet) => snippet.slug === params?.slug);
  if (!snippet) {
    return {
      props: {
        snippet: null,
      },
    };
  }
  return {
    props: {
      snippet,
    },
  };
};

const SnippetLayout = ({ snippet }: { snippet: Snippet | null }) => {
  const MDXContent = useMDXComponent(snippet ? snippet?.body.code : '');
  return (
    <>
      <PageMeta title={snippet?.name} description={snippet?.description} />
      <article className='container'>
        <h1 className='text-3xl mb-4'>{snippet?.name}</h1>
        <MDXContent />
      </article>
    </>
  );
};

export default SnippetLayout;
