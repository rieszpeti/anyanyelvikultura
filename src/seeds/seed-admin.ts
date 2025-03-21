import { getEnvVar } from '@/getEnvVar'
import { Payload } from 'payload'

export async function seedAdminUser(payload: Payload) {
  const email = getEnvVar('PAYLOAD_ADMIN_EMAIL')
  const userName = getEnvVar('PAYLOAD_ADMIN_USERNAME')
  const password = getEnvVar('PAYLOAD_ADMIN_PASSWORD')

  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
  })

  if (!existingAdmin.docs.length) {
    await payload.create({
      collection: 'users',
      data: {
        email: email,
        name: userName,
        password: password,
        role: 'admin',
      },
    })
  }
}
