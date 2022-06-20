import Head from 'next/head';
import { allSnippets, Snippet } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useCopyToClipboard } from 'hooks/useCopyfromClipBoard';

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
  const { status, copyText } = useCopyToClipboard(300);
  return (
    <>
      <Head>
        <title>{snippet?.name}</title>
      </Head>
      <article className='container'>
        <div className='mb-8'>
          <h1>{snippet?.name}</h1>
          <MDXContent />
        </div>
      </article>
    </>
  );
};

export default SnippetLayout;
