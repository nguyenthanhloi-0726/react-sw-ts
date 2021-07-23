import React from 'react'
import { useTranslation } from 'i18n'

type Props = {}

const Home: React.FC<Props> = props => {
  const { t } = useTranslation()

  return <div>{t('general.home')}</div>
}

export default Home
