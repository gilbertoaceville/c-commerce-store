import Container from "@/components/layout/container/container";
import CheckoutSection from "@/components/section/checkout/checkout";
import FormContainer from "@/components/section/form/container";

export default function Checkout() {
  return (
    <div className="p-8">
      <Container>
        <FormContainer>
          <CheckoutSection />
        </FormContainer>
      </Container>
    </div>
  );
}
