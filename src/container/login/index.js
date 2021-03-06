import { Card, Input } from 'antd'
import './login.scss'
import { Button, Form, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { handleSignin } from '../../actions/index'
import { useTranslation } from 'react-i18next'
import Request from '../../services/request'
import React from 'react'

const LoginV1 = (props) => {
  const dispatch = useDispatch()
  const { t: translation } = useTranslation()
  const [loading, setLoading] = React.useState(false)

  function handleSubmit(values) {
    setLoading(true)

    Request({
      method: "POST",
      path: "/api/login",
      newUrl: process.env.REACT_APP_API_LOGIN_URL,
      data: values
    }).then(result =>{ 
      if(result && result.errCode === 0) {
        dispatch(handleSignin(result.user))
        props.history.push('/')
        notification.success({
          message: "",
          description: translation('landing.loginSuccess', { name: `${result.user.firstName} ${result.user.lastName}`})
        })
      } else {
        notification.error({
          message: "",
          description: result.message
        })
      }
      setLoading(false)
    })
  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0' title="Chào mừng đến Daisy Care! 👋">
          <Form className='auth-login-form mt-2' onFinish={handleSubmit}>
            <label className='form-label' htmlFor='login-email'>
              Email
            </label>
            <Form.Item
              name="email"
              rules={[{ required: true, message: translation("landing.required") }]}
            >
              <Input type='email' size='middle' id='login-email' placeholder='john@example.com' autoFocus />
            </Form.Item>
            <label className='form-label' htmlFor='login-password'>
              {translation("landing.password")}
            </label>
            <Form.Item
              name="password"
              rules={[{required: true, message: translation("landing.required") }]}
            >
              <Input.Password size='middle' className='input-group-merge' id='login-password' />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type='primary' htmlType="submit">
                {translation("landing.login")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default LoginV1