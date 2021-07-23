import React, { memo } from 'react'
import { useTranslation } from 'i18n'

import FlagVI from 'assets/images/icon/24px/flag-vi.svg'
import FlagEN from 'assets/images/icon/24px/flag-en.svg'

import './style.scss'

interface Props {}

const LanguageSwitcher: React.FC<Props> = props => {
  const { i18n } = useTranslation()

  const flags = [
    {
      value: 'en',
      icon: FlagEN
    },
    {
      value: 'vi',
      icon: FlagVI
    }
  ] as {
    value: string
    icon: string
  }[]

  const curFlagId = flags.findIndex(flag => flag.value === i18n.language)
  const nxtFlag = curFlagId + 1 < flags.length ? flags[curFlagId + 1] : flags[0]

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div
      className="language-switcher"
      onClick={() => changeLanguage(nxtFlag.value)}
    >
      <img alt={`flag-${nxtFlag.value}`} src={nxtFlag.icon} />
    </div>
  )
}

export default memo(LanguageSwitcher)
