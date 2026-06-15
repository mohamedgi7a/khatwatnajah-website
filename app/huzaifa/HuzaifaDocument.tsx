import { readFile } from 'node:fs/promises'
import path from 'node:path'
import HuzaifaInteractions from './HuzaifaInteractions'

function extractBody(html: string) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]

  if (!body) throw new Error('Huzaifa page body was not found.')

  return body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
}

export default async function HuzaifaDocument({ page }: { page: 'home' | 'projects' }) {
  const file = page === 'home'
    ? path.join(process.cwd(), 'public', 'huzaifa', 'index.html')
    : path.join(process.cwd(), 'public', 'huzaifa', 'projects', 'index.html')
  const markup = extractBody(await readFile(file, 'utf8'))

  return (
    <>
      <div className="huzaifa-site" dangerouslySetInnerHTML={{ __html: markup }} />
      <HuzaifaInteractions />
    </>
  )
}
