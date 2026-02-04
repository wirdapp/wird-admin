import React from "react";
import { StyledSkeletonWrapper } from "./results-overview.styles";
import { Skeleton } from "antd";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";
import { colors } from "../../../styles";

export const ResultsOverviewSkeleton: React.FC = () => {
  return (
    <StyledSkeletonWrapper>
      <Skeleton paragraph={false} active title={{ width: 250 }} />
      <Skeleton.Node active className="skeleton-chart">
        <PresentationChartLineIcon
          style={{ height: 24, width: 24, color: colors.lightGrey }}
        />
      </Skeleton.Node>
      <div className="skeleton-list">
        <Skeleton.Node active className="skeleton-list-item" children={false} />
        <Skeleton.Node active className="skeleton-list-item" children={false} />
        <Skeleton.Node active className="skeleton-list-item" children={false} />
        <Skeleton.Node active className="skeleton-list-item" children={false} />
        <Skeleton.Node active className="skeleton-list-item" children={false} />
      </div>
    </StyledSkeletonWrapper>
  );
};
