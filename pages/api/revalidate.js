export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Check for secret to confirm this is a valid request
    // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    //   return res.status(401).json({ message: 'Invalid token' })
    // }

    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"

      // await res.revalidate('/path-to-revalidate')
      await req.body.revalidate.map((x) => res.revalidate(x))
      return res.json({ revalidated: true })
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      console.log(err)
      return res.status(500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
