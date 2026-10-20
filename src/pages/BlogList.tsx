import { useState } from 'react'
import { getPosts } from '../api/posts'
import { BlogSection } from '../components/sections/BlogSection'

// 博客列表页
function BlogList() {
  const [posts] = useState(() => getPosts())

  return <BlogSection posts={posts} />
}

export default BlogList
