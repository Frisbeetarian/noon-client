import { Text, TextProps as ComponentProps } from "@chakra-ui/react";

export interface TextProps extends ComponentProps {
  title
}

export const InputLabel = (props: TextProps) => {
  return <Text py="0.5" fontWeight="bold" color="gray.600" {...props} />;
};
