import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import CodeParser from '../CodeParser/CodeParser';

interface Props {
  node: Node;
  children: any[];
}
interface Node {
  _key: string;
  _type: string;
  code: string;
  language: 'tsx' | 'css' | 'scss';
}

const serializers = {
  types: {
    code: (props: Props) => {
      return (
        <div className='mb-2'>
          <CodeParser language={props.node.language} code={props.node.code} />
        </div>
      );
    },
  },
};

// there is currently no type support for typescript for sanity
const PostContent: React.FunctionComponent<{ content: any }> = ({
  content,
}) => {
  return <BlockContent blocks={content} serializers={serializers} />;
};

export default PostContent;
