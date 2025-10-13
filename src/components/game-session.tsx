import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";

interface GameSessionMenuProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

export function GameSessionMenu({ openDialog, setOpenDialog }: GameSessionMenuProps) {
  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      {/* Dialog.Portal moves dialog to body for overlay effect */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-100" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-w-[425px] w-full p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2 z-100">
          <DialogHeader>
            <Dialog.Title>Game Session</Dialog.Title>
            <Dialog.Description>
              Setup or edit your game session details here.
            </Dialog.Description>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}