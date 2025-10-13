import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import { useUpdatePassword } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useUsersStore } from "@/store/usersStore";

export function ChangeUserPasswordDialog({
  user,
  open: controlledOpen,
  password,
  onOpenChange: setControlledOpen,
}: {
  user?: any;
  open?: boolean;
  password?: {analytics: string, cricludo: string};
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [showAnalyticsPassword, setShowAnalyticsPassword] = useState(false);
  const [showGamePassword, setShowGamePassword] = useState(false);
  const [analyticsPassword, setAnalyticsPassword] = useState(password?.analytics || "");
  const [gamePassword, setGamePassword] = useState(password?.cricludo || "");

  const setRefetchUsers = useUsersStore((u)=> u.setRefetchUsers);
  const refetchUsers = useUsersStore((f)=> f.refetchUsers);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;
  const {trigger, isMutating} = useUpdatePassword()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data =  { analyticsPass: analyticsPassword, cricLudoPass: gamePassword, analyticsUserId: user.id, userType: user.userType, gameUserId: user.user?.id || '' }
    try {
      const responseData = await trigger({ ...data });
      if (responseData?.code) {
        toast.info(responseData.message || "Registration failed");
        return;
      }

    setRefetchUsers(!refetchUsers);
    setOpen(false);
    setAnalyticsPassword("");
    setGamePassword("");
    }catch(err){
        console.log(err);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setAnalyticsPassword(password?.analytics || "");
      setGamePassword(password?.cricludo || "");
      setShowAnalyticsPassword(false);
      setShowGamePassword(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Change Password ({user.userType === "master" ? "Master" : "Agent"})
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="analytics-password">Analytics App Password</Label>
            <div className="relative">
              <Input
                id="analytics-password"
                type={showAnalyticsPassword ? "text" : "password"}
                value={analyticsPassword}
                onChange={(e) => setAnalyticsPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowAnalyticsPassword(!showAnalyticsPassword)}
              >
                {showAnalyticsPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {user.userType === "agent" && <div className="space-y-2">
            <Label htmlFor="game-password">Game App Password</Label>
            <div className="relative">
              <Input
                id="game-password"
                type={showGamePassword ? "text" : "password"}
                value={gamePassword}
                onChange={(e) => setGamePassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowGamePassword(!showGamePassword)}
              >
                {showGamePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}