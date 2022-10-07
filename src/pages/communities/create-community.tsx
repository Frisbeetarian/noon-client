import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react'
import { Form, Formik, useFormik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { InputField } from '../../components/InputField'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useIsAuth } from '../../utils/useIsAuth'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCreateCommunityMutation } from '../../generated/graphql'

const CreateCommunity: React.FC<{}> = ({}) => {
  const router = useRouter()
  useIsAuth()

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
        router.reload('/communities')
      }
      // alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Container maxW="full" className="border w-full p-5 prose text-gray-100">
      <form className="flex" onSubmit={formik.handleSubmit}>
        <Flex className="w-1/2 mr-5" direction="column">
          <Box>
            <label>Community title</label>
            <Input
              name="title"
              type="text"
              label="Community title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </Box>
          <Box mt={4}>
            <label>Community description</label>
            <Input
              name="description"
              type="text"
              label="Community description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Box>

          <Box className="mt-4">
            <label>Community privacy</label>
            <RadioGroup>
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

          <Button
            // isLoading={isSubmitting}
            mt={4}
            type="submit"
            colorScheme="teal"
            className="ml-auto"
          >
            create community
          </Button>
        </Flex>

        <Flex className="w-1/2" direction="column">
          {/*<Datepicker position="relative" />*/}
          <Flex>
            <Box className="mr-5">
              <label>Start date</label>
              <DatePicker
                className="w-5/6 text-gray-800"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                name="startDate"
              />
            </Box>

            <Box className="">
              <label>End date</label>
              <DatePicker
                className="w-5/6 text-gray-800"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                name="endDate"
              />
            </Box>
          </Flex>

          <Box className="mt-5 w-2/4">
            <label>Timezone</label>
            <Select
              placeholder="Select timezone"
              className=""
              name="timezone"
              onChange={formik.handleChange}
            >
              <option value="1">Bey</option>
              <option value="2">Bagh</option>
              <option value="3">Tripoli</option>
            </Select>
          </Box>
        </Flex>
      </form>
    </Container>
  )
}

export default withUrqlClient(createUrqlClient)(CreateCommunity)
