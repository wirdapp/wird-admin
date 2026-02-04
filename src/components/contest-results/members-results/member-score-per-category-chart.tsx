import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { colors } from "../../../styles";

interface CategoryScore {
	contest_criterion__label: string;
	point_total: number;
}

interface ActiveShapeProps {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	startAngle: number;
	endAngle: number;
	fill: string;
	payload: CategoryScore;
	value: number;
}

const CustomActiveShape: React.FC<ActiveShapeProps> = (props) => {
	const { i18n } = useTranslation();
	const isRtl = i18n.dir() === "rtl";
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } =
		props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	let textAnchor: "start" | "end" = cos >= 0 ? "start" : "end";
	if (isRtl) {
		textAnchor = cos >= 0 ? "end" : "start";
	}

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}></text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill="#333"
				style={{ fontWeight: 700 }}
			>
				{value}
			</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#333">
				{payload.contest_criterion__label}
			</text>
		</g>
	);
};

interface MemberScorePerCategoryChartProps {
	data?: CategoryScore[];
}

export const MemberScorePerCategoryChart: React.FC<MemberScorePerCategoryChartProps> = ({
	data,
}) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const onPieEnter = (_: unknown, index: number): void => {
		setActiveIndex(index);
	};

	return (
		<ResponsiveContainer width="100%" height={250}>
			<PieChart width={730} height={250}>
				<Pie
					activeIndex={activeIndex}
					activeShape={CustomActiveShape as never}
					data={data}
					dataKey="point_total"
					nameKey="contest_criterion__label"
					cx="50%"
					cy="50%"
					outerRadius={80}
					innerRadius={40}
					fill={colors.yellowHover}
					labelLine={false}
					onMouseEnter={onPieEnter}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};
