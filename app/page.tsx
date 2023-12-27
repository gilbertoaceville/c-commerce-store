import Container from "@/components/layout/container/container";
import Banner from "@/components/element/banner/banner";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <Banner />
        </div>
      </Container>
    </div>
  );
}
