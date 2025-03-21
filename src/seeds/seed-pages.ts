import { Payload } from 'payload'

export async function seedPages(payload: Payload) {
  const pagesToSeed = [
    { title: 'Blankó Miklós', slug: 'blanko-miklos' },
    { title: 'Az alapítványról', slug: 'alapitvanyrol' },
    { title: 'Grétsy László-díj', slug: 'gretsy-laszlo-dij' },
  ]

  for (const page of pagesToSeed) {
    const existingPage = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
    })

    if (!existingPage.docs.length) {
      await payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          slug: page.slug,
          content: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      mode: 'normal',
                      text: 'Weboldalunk éppen megújul, köszönjük türelmét!',
                      type: 'text',
                      style: '',
                      detail: 0,
                      format: 0,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  textStyle: '',
                  textFormat: 0,
                },
              ],
              direction: 'ltr',
            },
          },
        },
      })
    }
  }
}
