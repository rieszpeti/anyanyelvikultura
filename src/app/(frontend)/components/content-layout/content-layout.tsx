import React, { Fragment } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface ContentLayoutProps {
  title: string
  content: SerializedEditorState
}

export default async function ContentLayout({ title, content }: ContentLayoutProps) {
  return (
    <Fragment>
      <h1>{title}</h1>
      <RichText data={content} />
    </Fragment>
  )
}
