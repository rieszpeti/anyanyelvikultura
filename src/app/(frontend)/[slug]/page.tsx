import { notFound } from 'next/navigation'
import { getPagesSlugs, queryPageBySlug } from '@/repository/query-repository'
import type { Page } from '../../../payload-types'
import ContentLayout from '../components/content-layout/content-layout'

interface PageParams {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: PageParams) {
  const post = await queryPageBySlug<Page>('pages', paramsPromise)

  if (post === null || post === undefined) {
    return notFound()
  }

  return <ContentLayout title={post?.title} content={post?.content} />
}

export async function generateStaticParams() {
  return getPagesSlugs('pages')
}
