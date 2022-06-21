import Head from 'next/head';

interface PageMetaProps {
  title: string;
  description?: string;
}

const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name='description' content={description} />
  </Head>
);

export default PageMeta;
