import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useGroups } from "../../services/groups/queries";
import { AnimatedPage } from "../../ui/animated-page";
import { isAtLeastSuperAdmin } from "../../util/roles";
import { useDashboardData } from "../../util/routes-data";
import Loader from "../Loader";
import { CreateGroupPopup } from "./create-group-popup";
import { GroupsList } from "./groups-list";

export function Group(): React.ReactElement | null {
	const { t } = useTranslation();
	const { groupId } = useParams<{ groupId: string }>();
	const [createGroupPopupOpen, setCreateGroupPopupOpen] = React.useState(false);
	const { currentUser } = useDashboardData();
	const { data: groups = [], isLoading, isFetching } = useGroups();

	const isSuperAdmin = currentUser?.role !== undefined && isAtLeastSuperAdmin(currentUser.role);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<AnimatedPage className="h-full">
			{groups.length > 0 ? (
				<div className="flex flex-col lg:flex-row h-full">
					<div className="w-full lg:max-w-[250px] xl:max-w-[350px] p-6 rounded-s-lg bg-accent">
						<div className="relative">
							{isFetching && (
								<div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
									<Spinner />
								</div>
							)}
							<div className="flex items-center justify-between gap-4 mb-6">
								<h4 className="text-lg font-semibold m-0">{t("select")}:</h4>
								{isSuperAdmin && (
									<Button variant="outline" onClick={() => setCreateGroupPopupOpen(true)}>
										<PlusIcon className="h-4 w-4" />
										{t("create-group")}
									</Button>
								)}
							</div>
							<GroupsList groups={groups} selected={groupId} />
						</div>
					</div>
					<div className="flex-1">
						{groupId ? (
							<Outlet />
						) : (
							<Empty
								description={t("select-group")}
								className="py-12 px-6 bg-wheat-warm rounded-e-lg h-full"
							/>
						)}
					</div>
				</div>
			) : (
				<Empty description={t("no-groups-found")} className="mt-12 max-w-[500px] mx-auto">
					<div className="flex flex-col items-center gap-4">
						<p className="text-muted-foreground">{t("groups-description")}</p>
						{isSuperAdmin && (
							<Button onClick={() => setCreateGroupPopupOpen(true)}>
								<PlusIcon className="h-4 w-4" />
								{t("create-group")}
							</Button>
						)}
					</div>
				</Empty>
			)}
			<CreateGroupPopup
				open={createGroupPopupOpen}
				onClose={() => setCreateGroupPopupOpen(false)}
			/>
		</AnimatedPage>
	);
}
