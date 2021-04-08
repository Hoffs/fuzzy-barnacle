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
import { useStorageData } from "../RouteHooks";
import { useShortenUrl } from "./UrlHooks";

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

export function UrlForm(): ReactElement {
  const [shortenUrl] = useShortenUrl();
  const initialValues: FormValues = { url: "" };
  const [storageData, setStorageData] = useStorageData();

  const onSubmitProxy = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { data, errors } = await shortenUrl(
      values.url,
      // If storageKey is empty string, use undefined.
      storageData.storageKey ? storageData.storageKey : undefined,
    );

    if (errors) {
      actions.setFieldError("url", errors.map((x) => x.message).join("\r\n"));
    } else {
      if (data) {
        setStorageData({
          version: "gql",
          storageKey: data.shortenUrl.storageId,
          updatedExternally: false,
        });
      } else {
        console.error("Received empty data but no errors");
      }

      actions.resetForm();
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
