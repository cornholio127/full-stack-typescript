import React from 'react';
import { Box, Heading, CheckBox } from 'grommet';
import { OrderSummaryQuery_orderSummary as OrderSummary } from './OrderSummaryQuery';
import CheckoutItem from './CheckoutItem';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { validate, notEmpty } from '../../validation';

interface Props {
  data?: OrderSummary;
}

export interface SummaryValues {
  acceptTerms: boolean;
}

const HeaderRow = styled(Box)`
  padding: 8px;
  font-weight: 600;
  border-bottom: 1px solid #123456;
`;

const FooterRow = styled(Box)`
  padding: 8px;
  font-weight: 600;
`;

const TermsRow = styled.div`
  margin-top: 40px;
`;

const StyledError = styled.div`
  color: #e80000;
  font-size: 13px;
  font-weight: 500;
`;

export const validateSummary = validate([
  notEmpty<SummaryValues>('acceptTerms'),
]);

const Summary: React.FC<Props> = ({ data }) => {
  const formik = useFormikContext<SummaryValues>();
  return (
    <Box>
      <Heading level={3}>Summary</Heading>
      {data && (
        <Box>
          <HeaderRow direction="row">
            <Box basis="20%">Quantity</Box>
            <Box basis="50%">Product</Box>
            <Box basis="30%" align="end">
              Price in CHF
            </Box>
          </HeaderRow>
          {data.items.map((item, i) => (
            <CheckoutItem key={i} item={item} />
          ))}
          <FooterRow direction="row">
            <Box basis="70%">Total</Box>
            <Box basis="30%" align="end">
              {data.totalGrossAmount}
            </Box>
          </FooterRow>
        </Box>
      )}
      <TermsRow>
        <CheckBox
          name="acceptTerms"
          checked={formik.values.acceptTerms}
          onChange={formik.handleChange}
          label="I accept the terms and conditions."
        />
        {formik.errors.acceptTerms && (
          <StyledError>
            {((formik.errors.acceptTerms as unknown) as string[])[0]}
          </StyledError>
        )}
      </TermsRow>
    </Box>
  );
};

export default Summary;
