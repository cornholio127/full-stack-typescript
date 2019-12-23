import React from 'react';
import { Paragraph } from 'grommet';

interface Props {
  text: string;
}

const Text: React.FC<Props> = ({ text }) => {
  return (
    <>
      {text.split(/\r?\n/).map((p, i) => (
        <Paragraph
          key={i}
          size="medium"
          fill={true}
          margin={{ top: '0', bottom: '8px' }}
        >
          {p}
        </Paragraph>
      ))}
    </>
  );
};

export default Text;
