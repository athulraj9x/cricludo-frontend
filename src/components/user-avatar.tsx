import { memo, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function UserAvatar({ username, profilePic }: { username: string, profilePic: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);


  const handleLoad = () => {
    if (skeletonRef.current) skeletonRef.current.style.display = "none";
    if (imageRef.current) imageRef.current.style.display = "block";
  };

  const handleError = () => {
    if (skeletonRef.current) skeletonRef.current.style.display = "none";
    if (imageRef.current) imageRef.current.style.display = "none";
    if (fallbackRef.current) fallbackRef.current.style.display = "flex";
  };

  return (
    <div className="relative w-10 h-10">
      <Skeleton
        ref={skeletonRef}
        className="absolute inset-0 w-10 h-10 rounded-full"
      />

      <Avatar className="w-10 h-10 ring-2 ring-offset-2">
        <AvatarImage
          ref={imageRef}
          src={profilePic}
          alt={username}
          className="w-10 h-10 object-cover hidden"
          onLoad={handleLoad}
          onError={handleError}
        />
        <AvatarFallback
          ref={fallbackRef}
          className="w-10 h-10 bg-accent text-black ring-2 ring-offset-2 flex items-center justify-center text-sm font-medium "
        >
          {username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default memo(UserAvatar);
