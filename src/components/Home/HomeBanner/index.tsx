import { PlusCircleIcon } from "@heroicons/react/20/solid";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import StudentBannerimg2 from "../../../assets/icons/studentImgAtBanner/studentBanner2.svg";
import StudentBannerimg1 from "../../../assets/icons/studentImgAtBanner/studentBanner3.svg";
import { useDashboardData } from "../../../util/routes-data";
import { CreateContestPopup } from "../../Competition/create-contest-popup";
import { JoinContestPopup } from "../../Competition/join-contest-popup";

interface HomeBannerProps {
	name: string | null;
}

function HomeBanner(props: HomeBannerProps): React.ReactElement {
	const { currentContest } = useDashboardData();
	const { t } = useTranslation();
	const [createContestOpen, setCreateContestOpen] = useState<boolean>(false);
	const [joinContestOpen, setJoinContestOpen] = useState<boolean>(false);

	return (
		<div className="relative mx-auto w-full h-[19.5rem] bg-[#ff5367] rounded-3xl max-[601px]:h-[15.75rem]">
			{/* Background circles */}
			<div className="absolute w-full h-[19.5rem] flex rounded-3xl overflow-clip z-[0.2] max-[601px]:h-[15.75rem]">
				<div
					className="w-full h-full bg-[#fe7786]"
					style={{ clipPath: "circle(73% at -4% -1%)" }}
				/>
				<div
					className="w-full h-full bg-[#fdd561]"
					style={{ clipPath: "circle(55% at 108% 116%)" }}
				/>
			</div>

			{/* Content and images */}
			<div className="flex flex-row justify-between items-center w-full h-full overflow-hidden">
				{/* Content section */}
				<div className="ms-16 relative flex flex-col items-start gap-9 max-[900px]:mx-auto max-[900px]:items-center">
					{/* Title */}
					<div className="flex flex-col items-start gap-3 h-[7.5rem] max-[900px]:items-center">
						<div className="font-bold text-4xl leading-[2.75rem] text-white max-[900px]:text-center max-[900px]:text-[1.875rem]">
							{t("welcome")}, {props.name}!
						</div>
					</div>

					{currentContest ? (
						<Button
							render={<Link to="/dashboard/results/overview" />}
							className="bg-[#fdd561] text-black hover:bg-[#fdd561]/90 rounded-full px-6 py-5 font-bold"
						>
							{t("see-contest-result")}
						</Button>
					) : (
						<div className="flex flex-row gap-2">
							<Button
								onClick={() => setCreateContestOpen(true)}
								className="bg-[#fdd561] text-black hover:bg-[#fdd561]/90 rounded-full px-6 py-5 font-bold"
							>
								{t("create-contest")}
								<PlusCircleIcon className="w-5 h-5" />
							</Button>
							<Button
								onClick={() => setJoinContestOpen(true)}
								variant="outline"
								className="rounded-full px-6 py-5 font-bold bg-white/20 border-white/30 text-white hover:bg-white/30"
							>
								{t("join-contest")}
							</Button>
							<CreateContestPopup
								visible={createContestOpen}
								onClose={() => setCreateContestOpen(false)}
							/>
							<JoinContestPopup
								visible={joinContestOpen}
								onClose={() => setJoinContestOpen(false)}
							/>
						</div>
					)}
				</div>

				{/* Student banner images - hidden below 1100px */}
				<div className="me-[-6rem] justify-end items-start hidden min-[1100px]:flex">
					<img src={StudentBannerimg2} alt="" className="relative w-[13.5rem] h-[13.5rem]" />
					<img
						src={StudentBannerimg1}
						alt=""
						className="relative left-[-17.8rem] rtl:left-auto rtl:right-[-17.8rem] top-[4.7rem] w-[9.125rem] h-[9.125rem]"
					/>
				</div>
			</div>
		</div>
	);
}

export default HomeBanner;
