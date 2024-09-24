import prisma from '@/lib/prisma'

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
  })

  return posts
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>By {post.author?.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
