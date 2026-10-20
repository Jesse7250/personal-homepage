import { useState } from 'react'
import { getProfile } from '../api/profile'
import { ContactSection } from '../components/sections/ContactSection'

// 联系页
function Contact() {
  const [profile] = useState(() => getProfile())

  return <ContactSection profile={profile} />
}

export default Contact
