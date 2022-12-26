import { Button, useToast, Wrap, WrapItem } from '@chakra-ui/react'

export default function Toast() {
  const toast = useToast()
  // const positions = [
  //   'top',
  //   'top-right',
  //   'top-left',
  //   'bottom',
  //   'bottom-right',
  //   'bottom-left',
  // ]

  return (
    <Wrap>
      {/*{positions.map((position, i) => (*/}
      <WrapItem>
        <Button
          onClick={() =>
            toast({
              title: `fewfewf toast`,
              position: 'bottom-right',
              isClosable: true,
            })
          }
        >
          Show toast
        </Button>
      </WrapItem>
      {/*))}*/}
    </Wrap>
  )
}
