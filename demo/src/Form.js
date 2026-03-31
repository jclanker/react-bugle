import React, { useRef, useState } from 'react'
import { useNotifications } from '../../src'
import Select from 'react-select'
import { selectStyle } from './styles'

import {
  Outer,
  Inner,
  Title,
  Rows,
  Row,
  Label,
  InputOuter,
  Input,
  FormSelect,
  ButtonOuter,
  Button
} from './styles'

const buttonOptions = [
  { value: undefined, label: 'None' },
  { value: 'ok', label: 'Ok' },
  { value: 'yesNo', label: 'YesNo' }
]

const typeOptions = [
  { value: 'success', label: 'Success' },
  { value: 'info', label: 'Info' },
  { value: 'error', label: 'Error' },
  { value: 'customStyle1', label: 'customStyle1' }
]

const blockingOptions = [
  { value: false, label: 'No' },
  { value: true, label: 'Yes' }
]

const Form = () => {
  const { push } = useNotifications()

  const labelRef = useRef()
  const durationRef = useRef()

  const [buttons, selectButtons] = useState(buttonOptions[0])
  const [type, selectType] = useState(typeOptions[0])
  const [blocking, selectBlocking] = useState(blockingOptions[0])

  return (
    <Outer>
      <Inner>
        <Title>react-bugle notifications example</Title>
        <Rows>
          <Row>
            <Label>Label:</Label>
            <InputOuter>
              <Input
                defaultValue={'Test notification'}
                placeholder={'Label text'}
                ref={labelRef}
              />
            </InputOuter>
          </Row>
          <Row>
            <Label>Buttons:</Label>
            <FormSelect>
              <Select
                value={buttons}
                options={buttonOptions}
                styles={selectStyle()}
                onChange={selectButtons}
              />
            </FormSelect>
          </Row>
          <Row>
            <Label>Type:</Label>
            <FormSelect>
              <Select
                options={typeOptions}
                value={type}
                styles={selectStyle()}
                onChange={selectType}
              />
            </FormSelect>
          </Row>
          <Row>
            <Label>Blocking:</Label>
            <FormSelect>
              <Select
                options={blockingOptions}
                value={blocking}
                styles={selectStyle()}
                onChange={selectBlocking}
              />
            </FormSelect>
          </Row>
          <Row>
            <Label>Duration (ms):</Label>
            <InputOuter>
              <Input
                ref={durationRef}
                defaultValue={'5000'}
                placeholder={'5000'}
              />
            </InputOuter>
          </Row>
        </Rows>
        <ButtonOuter>
          <Button
            onClick={() =>
              push({
                id: Date.now(),
                label: labelRef.current.value,
                type: type.value,
                duration: durationRef.current.value,
                blocking: blocking.value,
                buttons: buttons.value
              })
            }
          >
            Push notification
          </Button>
        </ButtonOuter>
      </Inner>
    </Outer>
  )
}

export default Form
