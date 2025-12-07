'use client'

import { useUsersList } from "@/entities/user/api/get-user-list";
import { TypographyH2, TypographyLead, TypographySmall } from "@/shared/components/typography";
import { Separator } from "@/shared/shadcn/ui/separator";
import { Spinner } from "@/shared/shadcn/ui/spinner";
import { useParams } from "next/navigation";

export default function RegisterPage() {
	const params = useParams<{ id: string }>()

	const { isFetching, data } = useUsersList();

	if (isFetching) {
		return <Spinner />
	}

	const userData = data?.find(user => user.id === Number(params.id))

	if (!userData) {
		return <div>User is not found</div>
	}

	return <div className="bg-white p-4">
		<div className="pl-4 pr-4 pb-4 flex flex-col gap-2">
			<TypographyLead>{userData.name}</TypographyLead>
			<TypographySmall>{userData.username}</TypographySmall>
			<TypographySmall>{userData.email}</TypographySmall>
		</div>
		<Separator />
		<div className="p-4">
			<div className="flex gap-2">
				<div>Company</div>
				<div>{userData.company.name}</div>
			</div>
			<div className="flex gap-4">
				<div>Address</div>
				<div>
					<div>{userData.address.city}</div>
					<div>{userData.address.street}</div>
					<div>{userData.address.zipcode}</div>
				</div>
			</div>
		</div>
	</div>
}
