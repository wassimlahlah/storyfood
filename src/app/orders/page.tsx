"use client";

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const { isLoading, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order status updated!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`http://localhost:3000/api/orders/${id}`, { method: "DELETE" }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully!");
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value.trim();
    if (!status) return;
    updateMutation.mutate({ id, status });
  };

  if (isLoading || status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-4 lg:px-20 xl:px-40 overflow-x-auto">
      <table className="w-full border-separate border-spacing-3 min-w-[600px]">
        <thead>
          <tr className="text-left text-sm md:text-base">
            <th className="hidden md:table-cell">Phone</th>
            <th>Name</th>
            <th>City</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:table-cell">Products</th>
            <th>Status</th>
            {session?.user.isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map((item: OrderType) => (
            <tr
              className={`border-b border-gray-200 ${
                item.status !== "تم توصيل" ? "bg-red-50" : ""
              }`}
              key={item.id}
            >
              <td className="hidden md:table-cell py-4 px-1">{item.phone}</td>
              <td className="py-4 px-1 font-medium">{item.name}</td>
              <td className="py-4 px-1">{item.city}</td>
              <td className="py-4 px-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-1">{item.price}</td>
              <td className="hidden md:table-cell py-4 px-1">
                <div className="flex flex-col gap-1">
                  {item.products && item.products.length > 0 ? (
                    item.products.map((p, i) => (
                      <span key={i} className="text-sm">
                        • {p.title} × {p.quantity}
                      </span>
                    ))
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </td>

              {/* Status / Actions */}
              {session?.user.isAdmin ? (
                <>
                  <td className="py-4 px-1">
                    <form
                      className="flex items-center gap-2"
                      onSubmit={(e) => handleUpdate(e, item.id)}
                    >
                      <input
                        placeholder={item.status || "قيد تجهيز"}
                        className="p-2 ring-1 ring-red-100 rounded-md text-sm w-20 md:w-auto"
                      />
                      <button
                        className="bg-amber-400 p-2 rounded-full"
                        type="submit"
                      >
                        <Image src="/edit.png" alt="edit" width={18} height={18} />
                      </button>
                    </form>
                  </td>

                  <td className="py-4 px-1">
                    <button
                      className="bg-red-400 p-2 rounded-full hover:bg-red-600 transition"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this order?")) {
                          deleteMutation.mutate(item.id);
                        }
                      }}
                    >
                      <Image
                        src="/delete.png"
                        alt="delete"
                        width={18}
                        height={18}
                      />
                    </button>
                  </td>
                </>
              ) : (
                <td className="py-4 px-1">{item.status || "pending"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
