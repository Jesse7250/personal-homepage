import { useState } from 'react'
import { getProjects } from '../api/projects'
import { ProjectsSection } from '../components/sections/ProjectsSection'

// 项目列表页
function Projects() {
  const [projects] = useState(() => getProjects())

  return <ProjectsSection projects={projects} />
}

export default Projects
