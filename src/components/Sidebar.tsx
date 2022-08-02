import { useDisclosure } from '@chakra-ui/hooks'
import React, { useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'

import { useFormik } from 'formik'
import { useCreateCommunityMutation } from '../generated/graphql'

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()

  const [startDate, setStartDate] = useState(new Date())
  const [, createCommunity] = useCreateCommunityMutation()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      privacy: '',
      startDate: new Date(),
      endDate: '',
      timezone: '',
    },
    onSubmit: async (values) => {
      console.log(values)

      const { error } = await createCommunity({ input: values })
      if (!error) {
        console.log('FDEWFWEFWEFWE')
        // router.reload('/communities')
      }
      // alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <>
      <Button
        className="mb-4"
        leftIcon={<AddIcon />}
        colorScheme="red"
        onClick={onOpen}
      >
        Create Community
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
        size="full"
        className="text-white bg-neutral"
      >
        <DrawerOverlay />

        <DrawerContent className="text-white ">
          <DrawerCloseButton />
          <DrawerHeader
            className="text-white bg-neutral"
            borderBottomWidth="1px"
          >
            Create Community
          </DrawerHeader>

          <DrawerBody className="text-white bg-neutral">
            <form className="flex " onSubmit={formik.handleSubmit}>
              <Stack className="w-1/2 mr-5" spacing="24px">
                <Box>
                  <FormLabel htmlFor="community-title">
                    Community Title
                  </FormLabel>
                  <Input
                    ref={firstField}
                    id="community-title"
                    placeholder="Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                </Box>

                {/*<Box>*/}
                {/*  <FormLabel htmlFor="url">Url</FormLabel>*/}
                {/*  <InputGroup>*/}
                {/*    <InputLeftAddon>http://</InputLeftAddon>*/}
                {/*    <Input*/}
                {/*      type="url"*/}
                {/*      id="url"*/}
                {/*      placeholder="Please enter domain"*/}
                {/*    />*/}
                {/*    <InputRightAddon>.com</InputRightAddon>*/}
                {/*  </InputGroup>*/}
                {/*</Box>*/}

                <Box mt={4}>
                  {/*<label>Community description</label>*/}
                  {/*<Input*/}
                  {/*  name="description"*/}
                  {/*  type="text"*/}
                  {/*  label="Community description"*/}
                  {/*  onChange={formik.handleChange}*/}
                  {/*  value={formik.values.description}*/}
                  {/*/>*/}

                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea
                    id="desc"
                    name="description"
                    type="text"
                    label="Community description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </Box>

                <Box className="mt-4">
                  {/*<label>Community privacy</label>*/}
                  <FormLabel htmlFor="privacy">Description</FormLabel>

                  <RadioGroup id="privacy">
                    <Stack direction="row">
                      <Radio
                        value="public"
                        name="privacy"
                        onChange={formik.handleChange}
                      >
                        Public
                      </Radio>

                      <Radio
                        value="private"
                        name="privacy"
                        onChange={formik.handleChange}
                      >
                        Private
                      </Radio>

                      <Radio
                        value="secret"
                        name="privacy"
                        onChange={formik.handleChange}
                      >
                        Secret
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>

                {/*<Button*/}
                {/*  // isLoading={isSubmitting}*/}
                {/*  mt={4}*/}
                {/*  type="submit"*/}
                {/*  colorScheme="teal"*/}
                {/*  className="ml-auto"*/}
                {/*>*/}
                {/*  create community*/}
                {/*</Button>*/}
              </Stack>

              <Stack className="w-1/2" spacing="24px">
                <Flex>
                  <Box className="mr-5">
                    {/*<label>Start date</label>*/}
                    <FormLabel htmlFor="start-date">Start date</FormLabel>

                    <DatePicker
                      className="w-5/6 text-gray-800"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      name="startDate"
                      id="start-date"
                    />
                  </Box>

                  <Box className="">
                    {/*<label>End date</label>*/}
                    <FormLabel htmlFor="end-date">End date</FormLabel>

                    <DatePicker
                      className="w-5/6 text-gray-800"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      name="endDate"
                      id="end-date"
                    />
                  </Box>
                </Flex>

                <Box className="mt-5 w-2/4">
                  {/*<label>Timezone</label>*/}
                  <FormLabel htmlFor="timezone">Timezone</FormLabel>

                  <Select
                    placeholder="Select timezone"
                    className=""
                    name="timezone"
                    onChange={formik.handleChange}
                    id="timezone"
                  >
                    <option value="1">Bey</option>
                    <option value="2">Bagh</option>
                    <option value="3">Tripoli</option>
                  </Select>
                </Box>

                {/*<Box>*/}
                {/*  <FormLabel htmlFor="owner">Select Owner</FormLabel>*/}
                {/*  <Select id="owner" defaultValue="segun">*/}
                {/*    <option value="segun">Segun Adebayo</option>*/}
                {/*    <option value="kola">Kola Tioluwani</option>*/}
                {/*  </Select>*/}
                {/*</Box>*/}

                {/*<Box>*/}
                {/*  <FormLabel htmlFor="desc">Description</FormLabel>*/}
                {/*  <Textarea id="desc" />*/}
                {/*</Box>*/}
              </Stack>
            </form>
          </DrawerBody>

          <DrawerFooter className="bg-neutral" borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Create Community</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
