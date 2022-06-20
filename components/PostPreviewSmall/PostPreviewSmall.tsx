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
        layout='responsive'
        src={image}
        alt={`${title}-image`}
      />
      <h4 className='text-2xl'>{title}</h4>
    </a>
  </Link>
);

export default PostPreviewSmall;
