interface PageTitleProps {
  text: string;
  isUppercase?: boolean;
}
const PageTitle: React.FC<PageTitleProps> = ({ text, isUppercase = true }) => {
  return (
    <h1 className={`mb-5 text-4xl  font-400 ${isUppercase ? 'uppercase' : ''}`}>
      {text}
    </h1>
  );
};

export default PageTitle;
