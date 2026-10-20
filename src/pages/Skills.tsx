import { useState } from 'react'
import { getSkills } from '../api/skills'
import { SkillsSection } from '../components/sections/SkillsSection'

// 技能页
function Skills() {
  const [skills] = useState(() => getSkills())

  return <SkillsSection skills={skills} />
}

export default Skills
