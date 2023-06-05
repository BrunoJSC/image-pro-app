import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Navbar() {
  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar bg-base-100 justify-between">
      <a className="font-bold normal-case text-xl underline">GalleryPro</a>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
