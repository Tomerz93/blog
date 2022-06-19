import Link from 'next/link';
import Image from 'next/image';
import { formatDateShort } from '../../lib/utils';

interface Props {
  slug: string;
  createdAt: string;
  title: string;
  image: string;
}

const PostPreview: React.FC<Props> = ({ slug, createdAt, title, image }) => {
  return (
    <div className='preview-container py-2'>
      <Link
        as={`/posts/${slug}`}
        href={`/posts/${slug}`}
        className='post-preview-container'
      >
        <div>
          <div
            className='rounded-md'
            style={{ maxWidth: 'calc(60rem - var(--spacing-2))' }}
          >
            <Image
              className='rounded-md'
              src={image}
              height={300}
              width={500}
              alt={'post-image'}
            />
          </div>
          <div className='ml-2 mt-2'>
            <h3 className='text-2xl'>{title}</h3>
            <span className='text-gray-300 text-sm block mb-5'>
              {formatDateShort(createdAt)}
            </span>
            <span className='cursor-pointer'>Read</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default PostPreview;
