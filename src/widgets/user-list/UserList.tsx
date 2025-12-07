import { useUsersList } from "@/entities/user/api/get-user-list";
import { useUserListParams } from "@/entities/user/hooks/use-user-list-params";
import { Pagination } from "@/shared/components/pagination";
import { TypographyLead, TypographySmall } from "@/shared/components/typography";
import { debounce } from "@/shared/debounce/debounce";
import { Input } from "@/shared/shadcn/ui/input";
import { Spinner } from "@/shared/shadcn/ui/spinner";
import Link from "next/link";

export const UserList = () => {
	const { isFetching, data } = useUsersList();
	const { totalPages, setFilter, searchParams } = useUserListParams()

	if (isFetching) {
		return <Spinner />
	}

	const filteredData = data?.slice(0, 3)

	return <div className=" flex flex-col gap-4">
		<div className="flex">
			<Input className="w-auto" onChange={(e) => setFilter('search', e.target.value)} />
		</div>

		<div className="flex flex-col gap-2 p-1">
			{filteredData?.map(user => {
				return <div key={user.id} className="border p-2">
					<Link href={`/user/${user.id}`} className="text-xl font-bold flex flex-col gap-2">
						<TypographyLead>{user.name}</TypographyLead>
						<div className="flex flex-col gap-2">
							<TypographySmall>id: {user.id}</TypographySmall>
							<TypographySmall>{user.phone}</TypographySmall>
							<TypographySmall>{user.email}</TypographySmall>
						</div>
					</Link>
				</div>
			})}
			<Pagination currentPage={0} totalPages={totalPages} pageNumbers={[]} onPageChange={function (page: number): void {
				throw new Error("Function not implemented.");
			}} />
		</div>
	</div>
}