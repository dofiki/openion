import * as Toast from '@radix-ui/react-toast';
import "./Toaster.css";

export default function Toaster({ message, open, setOpen }) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className="toast-root"
        duration={2000}  
      >
        <Toast.Title className="toast-title">
          {message}</Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="toast-viewport" />
    </Toast.Provider>
  );
}
