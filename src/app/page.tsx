"use client";

import { Suspense } from "react";
import { UserList } from "@/widgets/user-list";
import { Spinner } from "@/shared/shadcn/ui/spinner";

export default function UserListPage() {
	return (
		<div className="container mx-auto p-8">
			<h1 className="text-3xl font-bold mb-8">Users list</h1>
			<Suspense fallback={<Spinner />}>
				<UserList />
			</Suspense>
		</div>
	);
}
