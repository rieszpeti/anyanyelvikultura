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
      <h1 className="text-3xl md:text-4xl font-bold text-center py-12 max-w-5xl mx-auto">
        {title}
      </h1>
      <div className="px-4 lg:px-12">
        <RichText data={content} />
      </div>
    </Fragment>
  )
}
