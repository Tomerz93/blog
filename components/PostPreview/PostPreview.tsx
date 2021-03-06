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
    <div className='preview-container pb-2'>
      <Link
        as={`/posts/${slug}`}
        href={`/posts/${slug}`}
        className='post-preview-container'
      >
        <a>
          <div className='rounded-md'>
            <Image
              className='rounded-md'
              src={image}
              height={300}
              width={550}
              alt={'post-image'}
            />
          </div>
          <div className='ml-2 mt-2'>
            <h3 className='text-2xl word-break'>{title}</h3>
            <span className='text-sm block mb-5'>
              {formatDateShort(createdAt)}
            </span>
            <span className='cursor-pointer'>Read</span>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default PostPreview;
