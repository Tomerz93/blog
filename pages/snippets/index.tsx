import React from 'react';
import Link from 'next/link';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { allSnippets } from 'contentlayer/generated';
import { pick } from 'contentlayer/client';
import { groupBy } from 'lib/utils';
import { PageDescription, PageMeta } from 'components';
import cx from 'classnames';

export async function getStaticProps() {
  const filteredSnippets = allSnippets.map((snippet) =>
    pick(snippet, ['name', 'lang', 'description'])
  );
  const snippet = groupBy<typeof filteredSnippets[number]>(
    filteredSnippets,
    'lang'
  );
  return {
    props: {
      snippet,
    },
  };
}

const SnippetsScreen = ({
  snippet,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState('css');
  // TODO investigate how to remove this useEffect
  React.useEffect(() => {
    // useRouter is so the query would get populated after first render so useEffect in needed to set the initial state
    if (!router.isReady) return;
    const { type } = router.query as { type: string };
    // make typescript happy
    if ((type && snippet[type]) || type === 'all') setActiveCategory(type);
  }, [router.isReady, router.query, snippet]);

  const { [activeCategory]: currentActive } = snippet;
  const displayedSnippets =
    activeCategory === 'all' ? Object.values(snippet).flat() : currentActive;
  const getIsActive = (category: string) =>
    cx({
      active: activeCategory === category,
      inactive: activeCategory !== category,
      'snippet-category-link': true,
    });

  return (
    <>
      <PageMeta
        title='Snippets Page'
        description="Snippets that you can copy and paste and use in your project if you'd like"
      />
      <div className='container'>
        <PageDescription
          pageTitle='Snippets'
          description="Snippets that you can copy and paste and use in your project if
            you'd like"
        />
        <div className='text-center'>
          <div className='flex gap-4 uppercase mb-4 justify-center md:justify-start'>
            <Link shallow href={`/snippets?type=all`}>
              <a className={getIsActive('all')}>all</a>
            </Link>
            {Object.keys({ ...snippet }).map((language) => (
              <>
                {
                  <Link shallow href={`/snippets?type=${language}`}>
                    <a className={getIsActive(language)}>{language}</a>
                  </Link>
                }
              </>
            ))}
          </div>
          {
            <div className='grid md:grid-cols-3 gap-4'>
              {displayedSnippets.map(({ name, lang, description }) => (
                <Link className='block' href={`/snippets/${name}`} key={name}>
                  <a className='snippet-card-container'>
                    <div className='flex justify-between'>
                      <b className='text-2xl text-slate-800 dark:text-amber-50 fs-oswald'>
                        {name}
                      </b>
                      {activeCategory === 'all' && <span>{lang}</span>}
                    </div>
                    <p className='mt-1 text-left'>{description}</p>
                  </a>
                </Link>
              ))}
            </div>
          }
        </div>
      </div>
    </>
  );
};
export default SnippetsScreen;
