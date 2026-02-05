import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import LeftArrowIcon from "../../../assets/icons/Home/LeftArrow.svg";
import RightArrowIcon from "../../../assets/icons/Home/RightArrow.svg";
import SeeMore from "../../../assets/icons/Home/SeeMore.svg";

function MyPastContests(): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div className="mx-auto mt-12 w-full rounded-3xl max-w-[59.375rem] max-[1400px]:w-auto">
			<div className="flex items-center justify-between mx-auto">
				<div className="font-bold text-2xl leading-[1.8125rem] text-black">{t("pastContest")}</div>

				<div className="flex w-40">
					<div className="flex ms-4 flex-row items-center p-[1.125rem] gap-3 w-[3.75rem] h-[3.75rem] bg-[#f9eaea] rounded-full">
						<img src={LeftArrowIcon} alt="" className="text-black mx-auto" />
					</div>

					<div className="flex ms-4 flex-row items-center p-[1.125rem] gap-3 w-[3.75rem] h-[3.75rem] bg-[#f9eaea] rounded-full">
						<img src={RightArrowIcon} alt="" className="text-black mx-auto" />
					</div>
				</div>
			</div>

			<div className="flex mx-auto w-auto justify-between max-[1000px]:flex-col">
				{/* Left past contest */}
				<div className="w-full">
					<div className="font-normal text-base leading-5 text-[#a79f97]">12 months ago</div>

					<div className="flex mx-auto w-auto bg-[#fbf9f7] rounded-3xl max-w-[59.3125rem] mt-8 w-[90%] items-start max-[1400px]:w-[90%] max-[1000px]:mt-4">
						<div className="flex flex-col p-0 gap-[2.625rem] ms-6 me-6 w-full items-start flex-col">
							{/* Participants */}
							<div className="flex flex-col justify-center items-start p-0 gap-3 h-auto w-full max-[500px]:w-full">
								<div className="flex justify-between w-full h-5">
									<div className="h-[1.1875rem] font-bold text-base leading-5 text-center text-black">
										{t("participantsKey")}
									</div>

									<Link
										to="#"
										className="no-underline flex flex-row items-start p-0 gap-[0.375rem] w-[4.875rem] h-5"
									>
										<div className="w-[3.25rem] h-[1.1875rem] font-normal text-base leading-5 text-right text-[#ff5367]">
											{t("see-all")}
										</div>
										<img src={SeeMore} alt="" />
									</Link>
								</div>

								<div className="flex flex-row items-center p-6 gap-6 w-full bg-[#fbf9f7] rounded-3xl justify-around">
									<div className="w-[4.875rem] h-[3.625rem] font-bold text-5xl leading-[3.6875rem] text-black max-[500px]:h-[2.1875rem] max-[500px]:text-[2.1875rem] max-[500px]:leading-[2.1875rem]">
										251
									</div>

									<div className="flex flex-row items-center p-0 gap-0 ms-auto">
										<div className="flex flex-row items-start p-0 relative w-24 h-9 max-[500px]:items-center max-[500px]:w-48">
											<div
												className="absolute bg-[#FDD561] rounded-xl w-9 h-9 flex items-center justify-center font-bold text-sm text-center text-black max-[500px]:rounded-lg max-[500px]:w-[1.875rem] max-[500px]:h-[1.875rem]"
												style={{ right: "10px" }}
											>
												AB
											</div>
											<div
												className="absolute bg-[#FF5367] rounded-xl w-9 h-9 flex items-center justify-center font-bold text-sm text-center text-black max-[500px]:rounded-lg max-[500px]:w-[1.875rem] max-[500px]:h-[1.875rem]"
												style={{ right: "30px" }}
											>
												MK
											</div>
											<div
												className="absolute bg-[#503E9D] rounded-xl w-9 h-9 flex items-center justify-center font-bold text-sm text-center text-black max-[500px]:rounded-lg max-[500px]:w-[1.875rem] max-[500px]:h-[1.875rem]"
												style={{ right: "50px" }}
											>
												HA
											</div>
										</div>

										<div className="font-bold text-sm leading-[1.0625rem] text-center text-[#a79f97]">
											251+
										</div>
									</div>
								</div>
							</div>

							{/* Top 3 rank */}
							<div className="flex flex-col items-start p-0 gap-3 w-full h-auto flex-1">
								<div className="flex justify-between w-full h-5">
									<div className="h-[1.1875rem] font-bold text-base leading-5 text-center text-black">
										Top 3 rank
									</div>

									<Link
										to="#"
										className="no-underline flex flex-row items-start p-0 gap-[0.375rem] w-[4.875rem] h-5"
									>
										<div className="w-[3.25rem] h-[1.1875rem] font-normal text-base leading-5 text-right text-[#ff5367]">
											{t("see-all")}
										</div>
										<img src={SeeMore} alt="" />
									</Link>
								</div>

								<div className="flex flex-row items-center p-6 gap-6 w-full bg-[#fbf9f7] rounded-3xl justify-around">
									<div className="flex flex-col gap-4 w-full p-0 justify-center">
										<Link
											to="#"
											className="flex flex-row items-center py-[10px] px-4 gap-2 rounded-[14px] bg-transparent transition-all text-[#444] hover:bg-white hover:text-black no-underline mt-[0.3125rem] w-auto"
										>
											<div
												className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-center text-black"
												style={{ background: "#FDD561" }}
											>
												Am
											</div>
											<div className="font-bold text-base leading-5 w-auto">Ameen Betawi</div>
										</Link>

										<Link
											to="#"
											className="flex flex-row items-center py-[10px] px-4 gap-2 rounded-[14px] bg-transparent transition-all text-[#444] hover:bg-white hover:text-black no-underline mt-[0.3125rem] w-auto"
										>
											<div
												className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm leading-[1.0625rem] text-center text-white"
												style={{ background: "#FF5367" }}
											>
												MK
											</div>
											<div className="font-bold text-sm leading-[1.0625rem] w-auto text-black">
												Mohammad Mokdad
											</div>
										</Link>

										<Link
											to="#"
											className="flex flex-row items-center py-[10px] px-4 gap-2 rounded-[14px] bg-transparent transition-all text-[#444] hover:bg-white hover:text-black no-underline mt-[0.3125rem] w-auto"
										>
											<div
												className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm leading-[1.0625rem] text-center text-white"
												style={{ background: "#503E9D" }}
											>
												AQ
											</div>
											<div className="font-bold text-sm leading-[1.0625rem] w-auto text-black">
												Anas ALQdy
											</div>
										</Link>
									</div>
								</div>
							</div>

							<button
								type="button"
								className="flex flex-col justify-center items-center py-5 px-6 gap-[0.625rem] w-full h-[3.75rem] bg-[#fdd561] rounded-full font-bold text-base leading-5 text-black"
							>
								{t("see-contest-result")}
							</button>
						</div>
					</div>
				</div>

				{/* Right past contest */}
				<div className="w-full">
					<div className="font-normal text-base leading-5 text-[#a79f97]">24 months ago</div>

					<div className="flex mx-auto w-auto bg-[#fbf9f7] rounded-3xl max-w-[59.3125rem] mt-8 w-[90%] items-start max-[1400px]:w-[90%] max-[1000px]:mt-4">
						<div className="flex flex-col p-0 gap-[2.625rem] ms-6 me-6 w-full items-start flex-col">
							{/* Participants */}
							<div className="flex flex-col justify-center items-start p-0 gap-3 h-auto w-full max-[500px]:w-full">
								<div className="flex justify-between w-full h-5">
									<div className="h-[1.1875rem] font-bold text-base leading-5 text-center text-black">
										{t("participantsKey")}
									</div>

									<Link
										to="#"
										className="no-underline flex flex-row items-start p-0 gap-[0.375rem] w-[4.875rem] h-5"
									>
										<div className="w-[3.25rem] h-[1.1875rem] font-normal text-base leading-5 text-right text-[#ff5367]">
											{t("see-all")}
										</div>
										<img src={SeeMore} alt="" />
									</Link>
								</div>

								<div className="flex flex-row items-center p-6 gap-6 w-full bg-[#fbf9f7] rounded-3xl justify-around">
									<div className="w-[4.875rem] h-[3.625rem] font-bold text-5xl leading-[3.6875rem] text-black max-[500px]:h-[2.1875rem] max-[500px]:text-[2.1875rem] max-[500px]:leading-[2.1875rem]">
										251
									</div>

									<div className="flex flex-row items-center p-0 gap-0 ms-auto">
										<div className="flex flex-row items-start p-0 relative w-24 h-9 max-[500px]:items-center max-[500px]:w-48">
											<div
												className="absolute bg-[#FDD561] rounded-xl w-9 h-9 flex items-center justify-center font-bold text-sm text-center text-black max-[500px]:rounded-lg max-[500px]:w-[1.875rem] max-[500px]:h-[1.875rem]"
												style={{ right: "10px" }}
											>
												AB
											</div>
											<div
												className="absolute bg-[#FF5367] rounded-xl w-9 h-9 flex items-center justify-center font-bold text-sm text-center text-black max-[500px]:rounded-lg max-[500px]:w-[1.875rem] max-[500px]:h-[1.875rem]"
												style={{ right: "30px" }}
											>
												MK
											</div>
											<div
												className="absolute bg-[#503E9D] rounded-xl w-9 h-9 flex items-center justify-center font-bold text-sm text-center text-black max-[500px]:rounded-lg max-[500px]:w-[1.875rem] max-[500px]:h-[1.875rem]"
												style={{ right: "50px" }}
											>
												HA
											</div>
										</div>

										<div className="font-bold text-sm leading-[1.0625rem] text-center text-[#a79f97]">
											251+
										</div>
									</div>
								</div>
							</div>

							{/* Top 3 rank */}
							<div className="flex flex-col items-start p-0 gap-3 w-full h-auto flex-1">
								<div className="flex justify-between w-full h-5">
									<div className="h-[1.1875rem] font-bold text-base leading-5 text-center text-black">
										Top 3 rank
									</div>

									<Link
										to="#"
										className="no-underline flex flex-row items-start p-0 gap-[0.375rem] w-[4.875rem] h-5"
									>
										<div className="w-[3.25rem] h-[1.1875rem] font-normal text-base leading-5 text-right text-[#ff5367]">
											{t("see-all")}
										</div>
										<img src={SeeMore} alt="" />
									</Link>
								</div>

								<div className="flex flex-row items-center p-6 gap-6 w-full bg-[#fbf9f7] rounded-3xl justify-around">
									<div className="flex flex-col gap-4 w-full p-0 justify-center">
										<Link
											to="#"
											className="flex flex-row items-center py-[10px] px-4 gap-2 rounded-[14px] bg-transparent transition-all text-[#444] hover:bg-white hover:text-black no-underline mt-[0.3125rem] w-auto"
										>
											<div
												className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-center text-black"
												style={{ background: "#FDD561" }}
											>
												Am
											</div>
											<div className="font-bold text-base leading-5 w-auto">Ameen Betawi</div>
										</Link>

										<Link
											to="#"
											className="flex flex-row items-center py-[10px] px-4 gap-2 rounded-[14px] bg-transparent transition-all text-[#444] hover:bg-white hover:text-black no-underline mt-[0.3125rem] w-auto"
										>
											<div
												className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm leading-[1.0625rem] text-center text-white"
												style={{ background: "#FF5367" }}
											>
												MK
											</div>
											<div className="font-bold text-sm leading-[1.0625rem] w-auto text-black">
												Mohammad Mokdad
											</div>
										</Link>

										<Link
											to="#"
											className="flex flex-row items-center py-[10px] px-4 gap-2 rounded-[14px] bg-transparent transition-all text-[#444] hover:bg-white hover:text-black no-underline mt-[0.3125rem] w-auto"
										>
											<div
												className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm leading-[1.0625rem] text-center text-white"
												style={{ background: "#503E9D" }}
											>
												AQ
											</div>
											<div className="font-bold text-sm leading-[1.0625rem] w-auto text-black">
												Anas ALQdy
											</div>
										</Link>
									</div>
								</div>
							</div>

							<button
								type="button"
								className="flex flex-col justify-center items-center py-5 px-6 gap-[0.625rem] w-full h-[3.75rem] bg-[#fdd561] rounded-full font-bold text-base leading-5 text-black"
							>
								{t("see-contest-result")}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default MyPastContests;
