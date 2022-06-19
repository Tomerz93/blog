import Highlight, { defaultProps } from 'prism-react-renderer';

interface Props {
  code: string;
  language: 'tsx' | 'css' | 'scss' | 'typescript';
}

const Snippets: React.FC<Props> = ({ code, language }) => (
  <div className='container'>
    <Highlight {...defaultProps} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} rounded-md px-2 py-2`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
);

export default Snippets;
