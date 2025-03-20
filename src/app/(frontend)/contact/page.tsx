import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

const ContactInfo: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-6">
      <Card className="max-w-lg w-full">
        <CardContent className="p-6 text-center">
          <div className="contact-info">
            <div className="font-semibold text-xl">Névjegy:</div>
            <div className="mt-2">
              <Link href="https://linktr.ee/blanko.miklos">
                <span className="text-blue-600 hover:underline text-lg">
                  linktr.ee/blanko.miklos
                </span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-lg w-full">
        <CardContent className="p-6 text-center">
          <div className="contact-info">
            <span className="font-semibold text-xl">Email:</span>
            <div className="mt-2">
              <Link href="mailto:anyanyelvi.kulturankert@gmail.com">
                <span className="text-blue-600 hover:underline text-lg">
                  anyanyelvi.kulturankert@gmail.com
                </span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactInfo
