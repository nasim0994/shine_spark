/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Spinner from "@/components/shared/Spinner/Spinner";
const Invoice = React.lazy(() => import("@/pages/Admin/Order/Invoice"));

export const rootRoutes = {
  path: "/",
  children: [
    {
      path: "/admin/order/print/:id",
      element: (
        <Suspense fallback={<Spinner />}>
          <Invoice />
        </Suspense>
      ),
    },
  ],
};
