import { PresentationChartLineIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "antd";
import type React from "react";
import { colors } from "../../../styles";
import { StyledSkeletonWrapper } from "./results-overview.styles";

export const ResultsOverviewSkeleton: React.FC = () => {
	return (
		<StyledSkeletonWrapper>
			<Skeleton paragraph={false} active title={{ width: 250 }} />
			<Skeleton.Node active className="skeleton-chart">
				<PresentationChartLineIcon style={{ height: 24, width: 24, color: colors.lightGrey }} />
			</Skeleton.Node>
			<div className="skeleton-list">
				<Skeleton.Node active className="skeleton-list-item">
					{false}
				</Skeleton.Node>
				<Skeleton.Node active className="skeleton-list-item">
					{false}
				</Skeleton.Node>
				<Skeleton.Node active className="skeleton-list-item">
					{false}
				</Skeleton.Node>
				<Skeleton.Node active className="skeleton-list-item">
					{false}
				</Skeleton.Node>
				<Skeleton.Node active className="skeleton-list-item">
					{false}
				</Skeleton.Node>
			</div>
		</StyledSkeletonWrapper>
	);
};
