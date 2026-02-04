import { css } from "@emotion/css";
import { Card, Flex } from "antd";
import dayjs from "dayjs";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { colors } from "../../../styles";

interface DayData {
	index: number;
	date: string;
	points: number;
}

interface TooltipPayloadItem {
	value: number;
	color: string;
	payload: DayData;
}

interface CustomTooltipProps {
	active?: boolean;
	payload?: TooltipPayloadItem[];
	label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
	const { t } = useTranslation();

	if (active && payload && payload.length) {
		return (
			<Card className="custom-tooltip">
				<label>
					{t("day")} {Number(label)}
				</label>
				<Flex gap={8} align="center">
					<span
						className={css`
              width: 10px;
              height: 10px;
              border-radius: 50%;
              display: inline-block;
              background-color: ${payload[0].color};
            `}
						style={{ backgroundColor: payload[0].color }}
					></span>
					<span>
						{t("score")}: {payload[0].value}
					</span>
				</Flex>
				<div>
					<small>
						{t("date")}:{" "}
						{payload[0].payload.date
							? dayjs(payload[0].payload.date).format("DD/MM/YYYY")
							: ""}{" "}
					</small>
				</div>
			</Card>
		);
	}

	return null;
};

interface CustomXTickProps {
	x?: number;
	y?: number;
	payload?: {
		index: number;
		value: unknown;
	};
}

const CustomXTick: React.FC<CustomXTickProps> = ({ x, y, payload }) => {
	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="end" fill="#afafaf">
				{payload ? payload.index + 1 : ""}
			</text>
		</g>
	);
};

interface MemberScorePerDayChartProps {
	data?: DayData[];
}

export const MemberScorePerDayChart: React.FC<MemberScorePerDayChartProps> = ({ data }) => {
	const { i18n } = useTranslation();
	const isRtl = i18n.dir() === "rtl";

	return (
		<ResponsiveContainer width="100%" height={250}>
			<BarChart height={250} data={data}>
				<CartesianGrid stroke="#f5f5f5" />
				<XAxis dataKey="index" stroke="#afafaf" tick={<CustomXTick />} reversed={isRtl} />
				<Tooltip content={<CustomTooltip />} />
				<Bar dataKey="points" fill={colors.orange} />
			</BarChart>
		</ResponsiveContainer>
	);
};
