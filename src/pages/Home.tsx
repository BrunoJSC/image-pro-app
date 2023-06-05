import ImageGallery from "../components/ImageGallery";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";

export default function Home() {
  return (
    <div className="max-w-4xl wi-full mx-auto">
      <Navbar />
      <UploadForm />
      <ImageGallery />
    </div>
  );
}
