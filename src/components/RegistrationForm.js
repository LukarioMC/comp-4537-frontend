import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { registrationSchema } from '../schemas/schemas'
import { useNavigate } from 'react-router-dom'
import TextInput from './TextInput'
import { VStack, Button, Box } from '@chakra-ui/react'
import axios from 'axios'

function RegistrationForm () {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  return (
    <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={registrationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.post('http://localhost:4000/users', values)
            navigate('/login')
          } catch (error) {
            if (!error.response) {
              setServerError("Server isn't responding. Please try again later.")
            }
            if (error.response.status === 409) {
              setServerError('User already exists')
            }
            if (error.response.status === 500) {
              setServerError('Server error')
            }
          }
          setSubmitting(false)
        }}
    >
    {formik => (
      <Form>
        <VStack spacing={4}>
          <TextInput name='email' label="Email" />
          <TextInput name='password' label="Password" type="password" />

          {serverError && <Box color='red.500'>{serverError}</Box>}

          <Button
            type="submit"
            w={'100%'}
            variant='solid'
            disabled={formik.isSubmitting}>
            Sign Up
          </Button>

          <Box>
            <Button
              onClick={() => navigate('/login')}
              variant='link'
              colorScheme='blue'>
              Already have an account? Log in
            </Button>
          </Box>

        </VStack>
      </Form>
    )}
    </Formik>
  )
}

export default RegistrationForm
