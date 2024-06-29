/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/L5XJrNdJ4Q4
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Component() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <form className="flex gap-2">
          <Textarea placeholder="Write your comment..." className="flex-1 min-h-[100px] resize-none" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@iamwillpursell</div>
              <div className="text-xs text-muted-foreground">5 minutes ago</div>
            </div>
            <div>
              I really love the ecosystem Vercel is creating. The way each component can be added and modified with ease
              really makes these tools attractive.
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@HackSoft</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <div>
              We are more than excited to leverage all the new stuff, building better products for our clients ✨
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@greed7513</div>
              <div className="text-xs text-muted-foreground">1 day ago</div>
            </div>
            <div>does anyone know which monospace are they using when showing code?</div>
          </div>
        </div>
      </div>
    </div>
  )
}
