import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";




export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 self-center font-medium">
        <div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-md">
          <Avatar className="size-16">
            <AvatarImage src="/Logo.png" alt="Logo" />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
        </div>
          CircLudo
       {children}
      </div>
    </div>
  )
}
