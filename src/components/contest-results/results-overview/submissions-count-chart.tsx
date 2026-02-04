import dayjs from "dayjs";
import type React from "react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Cross,
	Customized,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { colors } from "../../../styles";
import { StyledChartTooltip } from "./results-overview.styles";

interface ChartDataItem {
	date: string;
	submission_count: number;
}

interface TooltipPayloadItem {
	value: number;
	stroke: string;
	payload: ChartDataItem;
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
			<StyledChartTooltip>
				<label>{dayjs(label).format("DD MMM YYYY")}</label>
				{payload.map((p) => (
					<Fragment key={p.value}>
						{dayjs().isSame(p.payload.date, "day") && <small> ({t("today")})</small>}
						<div>
							<span className="line-key-color" style={{ backgroundColor: p.stroke }}></span>
							<span>{p.value}</span>
						</div>
					</Fragment>
				))}
			</StyledChartTooltip>
		);
	}

	return null;
};

interface GraphicalPoint {
	x: number;
	y: number;
	payload: ChartDataItem;
}

interface GraphicalItem {
	props: {
		points: GraphicalPoint[];
	};
}

interface CustomizedCrossProps {
	width?: number;
	height?: number;
	fill?: string;
	formattedGraphicalItems?: GraphicalItem[];
}

const CustomizedCross: React.FC<CustomizedCrossProps> = (props) => {
	const { width, height, fill, formattedGraphicalItems } = props;
	// get first series in chart
	const firstSeries = formattedGraphicalItems?.[0];
	// get any point at any index in chart
	const todayPoint = firstSeries?.props?.points.find((p) => {
		return dayjs().isSame(p.payload.date, "day");
	});

	if (!todayPoint) return null;

	// render custom content using points from the graph
	return (
		<Cross
			y={1000}
			x={todayPoint?.x}
			top={5}
			left={50}
			height={height}
			width={width}
			stroke={colors.red}
			fill={fill ?? "none"}
		/>
	);
};

interface SubmissionsCountChartProps {
	chartData: ChartDataItem[] | null;
}

export const SubmissionsCountChart: React.FC<SubmissionsCountChartProps> = ({ chartData }) => {
	const { i18n } = useTranslation();

	return chartData ? (
		<ResponsiveContainer height={100} style={{ marginBottom: "32px" }}>
			<AreaChart height={100} data={chartData} style={{ direction: i18n.dir() }}>
				<defs>
					<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={colors.yellow} stopOpacity={0.8} />
						<stop offset="95%" stopColor={colors.yellow} stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="date" hide reversed={i18n.dir() === "rtl"} />
				<YAxis hide />
				<Tooltip isAnimationActive={false} content={<CustomTooltip />} />
				<CartesianGrid stroke="#f5f5f5" />
				<Area
					type="monotone"
					dataKey="submission_count"
					stroke={colors.yellow}
					fillOpacity={1}
					fill="url(#colorPv)"
					yAxisId={0}
				/>
				<Customized component={CustomizedCross} />
			</AreaChart>
		</ResponsiveContainer>
	) : null;
};
