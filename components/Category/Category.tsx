interface CategoryProps {
  slug: string;
}

export const Category: React.FC<CategoryProps> = ({ slug }) => {
  return (
    <span className='inline-block text-sm px-3 py-2 rounded-md bg-blue-800 uppercase'>
      {slug}
    </span>
  );
};

export default Category;
