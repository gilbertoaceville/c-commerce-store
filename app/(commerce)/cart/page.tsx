import { getUser } from "@/base/actions/getUser";
import Container from "@/components/layout/container/container";
import CartSection from "@/components/section/cart/cart";

export default async function Cart() {
  const user = await getUser();
  return (
    <div className="pt-8">
      <Container>
        <CartSection currentUser={user} />
      </Container>
    </div>
  );
}
