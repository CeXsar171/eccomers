import MainLayout from "../layouts/MainLayout";
import LocationSection from "../components/home/LocationSection";
import HoursSection from "../components/home/HoursSection";

export default function Ubicacion() {
  return (
    <MainLayout>
      <LocationSection />
      <HoursSection />
    </MainLayout>
  );
}