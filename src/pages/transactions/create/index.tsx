import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { transactionValidationSchema } from 'validationSchema/transactions';
import { UserInterface } from 'interfaces/user';
import { PaymentInterface } from 'interfaces/payment';
import { TransactionInterface } from 'interfaces/transaction';

function TransactionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: TransactionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.transaction.create({ data: values as RoqTypes.transaction });
      resetForm();
      router.push('/transactions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TransactionInterface>({
    initialValues: {
      transaction_date: new Date(new Date().toDateString()),
      transaction_status: '',
      user_id: (router.query.user_id as string) ?? null,
      payment_id: (router.query.payment_id as string) ?? null,
    },
    validationSchema: transactionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Transactions',
              link: '/transactions',
            },
            {
              label: 'Create Transaction',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Transaction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="transaction_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Transaction Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.transaction_date ? new Date(formik.values?.transaction_date) : null}
              onChange={(value: Date) => formik.setFieldValue('transaction_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.transaction_status}
            label={'Transaction Status'}
            props={{
              name: 'transaction_status',
              placeholder: 'Transaction Status',
              value: formik.values?.transaction_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <AsyncSelect<PaymentInterface>
            formik={formik}
            name={'payment_id'}
            label={'Select Payment'}
            placeholder={'Select Payment'}
            fetcher={() => roqClient.payment.findManyWithCount({})}
            labelField={'payment_status'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/transactions')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'transaction',
    operation: AccessOperationEnum.CREATE,
  }),
)(TransactionCreatePage);
