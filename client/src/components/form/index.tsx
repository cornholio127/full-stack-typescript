import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import Row from './Row';
import { Heading } from 'grommet';

export { Row };

interface Props {
  title?: string;
}

const StyledForm = styled.form`
  width: 720px;
  margin: 0 auto;
`;

const Form: React.FC<Props> = ({ title, children }) => {
  const formik = useFormikContext();
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      {title && <Heading level="2">{title}</Heading>}
      {children}
    </StyledForm>
  );
};

export default Form;
