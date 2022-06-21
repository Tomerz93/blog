import PageTitle from 'components/PageTitle/PageTitle';

interface PageDescriptionProps {
  pageTitle: string;
  description: string;
}

const PageDescription: React.FC<PageDescriptionProps> = ({
  pageTitle,
  description,
}) => (
  <div className='text-center md:text-left'>
    <PageTitle text={pageTitle} />
    <p className='mb-4'>{description}</p>
  </div>
);

export default PageDescription;
