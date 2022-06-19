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
    <div>
      <div>
        <img width={300} src={image} alt={`${title}-image`} />
      </div>
      <h4 className='text-lg'>{title}</h4>
    </div>
  </Link>
);

export default PostPreviewSmall;
