import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { ShortenerContext } from "./Shortener";

interface FormValues {
  url: string;
}
export const UrlForm = observer(() => {
  const shortener = useContext(ShortenerContext);
  const initialValues: FormValues = { url: "" };

  const onSubmitProxy = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    shortener.shortenUrl(values.url);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  const validateUrl = (url: string): string | undefined => {
    if (!url) {
      return "URL must not be empty.";
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "URL must begin with http:// or https://.";
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitProxy}>
      {(props) => (
        <Form style={{ minHeight: 80 }}>
          <Flex direction="row" justify="space-between">
            <Field name="url" validate={validateUrl}>
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<FormValues>;
              }) => (
                <FormControl
                  isInvalid={Boolean(form.errors.url) && form.touched.url}
                >
                  <Input {...field} id="url" placeholder="Enter URL" />
                  <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              ml={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Shorten
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
});
