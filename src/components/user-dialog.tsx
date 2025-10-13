import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SignupForm } from "./signup-form";
import { useState } from "react";

export function AddUserDialog({
  userType,
  onUserAdded,
}: {
  userType: "master" | "agent";
  onUserAdded: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSignupSuccess = () => {
    setOpen(false);
    onUserAdded();
  };
  const userTypeColour =
    userType === "master" ? "bg-green-400" : "bg-yellow-400";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${userTypeColour}`}
        >
          <PlusCircle className="h-4 w-4" />
          Add {userType === "master" ? "Master" : "Agent"}
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-md`}>
        <DialogHeader className="flex justify-between items-center px-2">
          <DialogTitle className="text-2xl font-semibold">
            Add {userType === "master" ? "Master" : "Agent"}
          </DialogTitle>
        </DialogHeader>
        <SignupForm account={userType} onSignupSuccess={handleSignupSuccess} />
      </DialogContent>
    </Dialog>
  );
}
