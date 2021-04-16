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
import React, { ReactElement } from "react";
import useShortenUrlMutation from "./useShortenUrlMutation";

const validateUrl = (url: string): string | undefined => {
  if (!url) {
    return "URL must not be empty.";
  } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "URL must begin with http:// or https://.";
  }
};

interface FormValues {
  url: string;
}

export function UrlForm({ storageKey }: { storageKey?: string }): ReactElement {
  const initialValues: FormValues = { url: "" };
  const [commit] = useShortenUrlMutation();

  const onSubmitProxy = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      await commit(values.url, storageKey ? storageKey : undefined);
      actions.resetForm();
    } catch (err) {
      // Theres no type for error so to handle this, you have to pretty much
      // work around the "any" type.
      const errors = err?.source?.errors;
      if (Array.isArray(errors)) {
        const errorString = errors.map(x => x?.message).join('. ');
        actions.setFieldError("url", errorString);
      } else {
        actions.setFieldError("url", "Unknown error has occurred");
      }
    }

    actions.setSubmitting(false);
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
}
