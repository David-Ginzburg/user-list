'use client'

import { UserList } from "@/widgets/user-list";

export default function UserListPage() {
	return (
		<div className="container mx-auto p-8">
			<h1 className="text-3xl font-bold mb-8">Users list</h1>
			<UserList />
		</div>
	);
}
