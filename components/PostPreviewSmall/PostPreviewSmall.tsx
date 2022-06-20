import Image from 'next/image';
import Link from 'next/link';

interface PostPreviewSmallProps {
  slug: string;
  title: string;
  image: string;
}

const PostPreviewSmall: React.FC<PostPreviewSmallProps> = ({
  slug,
  title,
  image,
}) => (
  <Link href={`/posts/${slug}`}>
    <a>
      <Image
        className='rounded-md'
        width={250}
        height={200}
        src={image}
        alt={`${title}-image`}
      />
      <h4 className='text-lg'>{title}</h4>
    </a>
  </Link>
);

export default PostPreviewSmall;
