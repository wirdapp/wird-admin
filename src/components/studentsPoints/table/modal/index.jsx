import React from 'react'
import Divv, { Divvv,InputSubmit,FormInput, Span} from "./Modals.styled"
import {DivTxtField} from '../../../shared/styles'
import { useTranslation } from 'react-i18next';


export default function Modals() {
  const {t} = useTranslation();
  return (
    <Divv>
      <Divvv>
      {Array.from({ length: 5 }).map((_, index) => (
        <td key={index}>
          <DivTxtField >
            <Span />
            <FormInput placeholder={t('addNO')} type="number" required />
          </DivTxtField><br /> </td>
      ))}
      </Divvv>
      <InputSubmit type="submit" value='' >{t("update")}</InputSubmit>
    </Divv>
  )
}
