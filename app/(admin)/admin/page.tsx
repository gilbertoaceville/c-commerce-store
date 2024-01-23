import { getAllUsers } from "@/base/actions/getAllUsers";
import { getOrders } from "@/base/actions/getOrders";
import { getProducts } from "@/base/actions/getProducts";
import AdminDashboard from "@/components/section/admin/dashboard/dashboard";

import locale from "./locale/en.json";
import { getUser } from "@/base/actions/getUser";
import { getAggregateData } from "@/base/actions/getAggregateData";

export default async function Admin() {
  const [user, products, orders, users, aggregateData] = await Promise.all([
    getUser(),
    getProducts({ category: null }),
    getOrders(),
    getAllUsers(),
    getAggregateData(),
  ]);

  return (
    <div className="pt-8">
      <AdminDashboard
        {...{
          products,
          orders,
          users,
          data: aggregateData,
          title: locale.nullTitle,
          currentUser: user,
        }}
      />
    </div>
  );
}
