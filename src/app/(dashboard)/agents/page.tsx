"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  useAllAgents,
} from "@/hooks/useUsers";
import { DataTable } from "@/components/data-table";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { useUsersStore } from "@/store/usersStore";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const schema = z.object({
  id: z.string(),
  email: z.string(),
  userType: z.string(),
  password: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.string(),
  user: z.any()

});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "user",
    header: "userId",
    cell: ({ row }: { row: any }) => <div>{row.original.firstName}</div>,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }: { row: any }) => <div>{row.original.firstName}</div>,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }: { row: any }) => <div>{row.original.lastName}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }: { row: any }) => {
      const router = useRouter();
      const { email, verified } = row.original;
      const setVerifyEmail = useAuthStore((s) => s.setVerifyEmail);
      const setIsLogin = useAuthStore((l) => l.setIsLogin);
      const handleReverification = () => {
        setVerifyEmail(email);
        setIsLogin(false);
        router.replace("/verify-otp?reverify=true");
      };

      return (
        <div className="flex items-center justify-center gap-2">
          <span>{email}</span>

          {verified ? (
            <CheckCircle className="text-green-500 w-4 h-4" />
          ) : (
            <div
              onClick={handleReverification}
              className="text-blue-600 hover:underline text-sm cursor-pointer"
            >
              Reverify
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "adminPassword",
    header: "Admin Password",
    cell: ({ row }: { row: any }) => (
      <div>{row.original.password_text || ""}</div>
    ),
  },
  {
    accessorKey: "userPassword",
    header: "User Password",
    cell: ({ row }: { row: any }) => (
      <div>{row.original.user?.password_text || ""}</div>
    ),
  },
  {
    accessorKey: "userType",
    header: "User Type",
    cell: ({ row }: { row: any }) => {
      const type = row.original.userType;
      let label = "Unknown";
      let color = "bg-gray-300";

      switch (type) {
        case "admin":
          label = "Admin";
          color = "bg-blue-300";
          break;
        case "master":
          label = "Master";
          color = "bg-green-400";
          break;
        case "agent":
          label = "Agent";
          color = "bg-yellow-400";
          break;
      }

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium capitalize ${color}`}
        >
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: "referredBy",
    header: "Referred By",
    cell: ({ row }: { row: any }) => {
      const { firstName, lastName } = row.original.referredBy;
      return <div className="">{firstName + " " + lastName || "—"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }: { row: any }) => {
      const date = new Date(row.original.createdAt);
      return <div>{format(date, "yyyy-MM-dd HH:mm:ss")}</div>;
    },
  },
];

export default function AddUserPage() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const getUserType = useAuthStore((s) => s.getUserType);
  const setUsers = useUsersStore((s) => s.setUsers);
  const refetchUsers = useUsersStore((r) => r.refetchUsers);
  const setTitle = useAuthStore((t) => t.setTitle);

  const userType = getUserType();
  const userId = user?.id;

  const { trigger, isMutating } = useAllAgents();

  const [users, setUsersData] = useState<any[]>([]);

  useEffect(() => {
    if (userType === "admin") {
      setTitle("All Agents");
    }
    if (userType && !["admin"].includes(userType)) {
      router.replace("/");
    }
  }, [userType, router]);

  const fetchData = async () => {
    try {
      let res;
      if (userType === "admin") {
        res = await trigger();
      } else {
        return;
      }

      if (res?.data) {
        const sortedData = [...res.data].sort((a, b) => {
          const timeA = new Date(a.createdAt).getTime();
          const timeB = new Date(b.createdAt).getTime();

          if (isNaN(timeA) || isNaN(timeB)) {
            return 0;
          }

          return timeB - timeA;
        });

        setUsers(sortedData);
        setUsersData(sortedData);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [trigger, refetchUsers, userType, userId, setUsers]);

  if (isMutating) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <DataTable
        data={users}
        columns={columns}
        paginationConfig={{ pageIndex: 0, pageSize: 15 }}
        rowClickable={true}
      />
    </div>
  );
}
