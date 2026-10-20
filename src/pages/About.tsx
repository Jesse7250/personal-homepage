import { useState } from 'react'
import { getProfile } from '../api/profile'
import { AboutSection } from '../components/sections/AboutSection'

// 个人介绍页
function About() {
  const [profile] = useState(() => getProfile())

  return <AboutSection profile={profile} />
}

export default About
