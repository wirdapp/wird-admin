import { Spin } from "antd";
import React from "react";
import Container from "./loder.styles";

export default function Loader() {
	return (
		<Container>
			<Spin size="large" />
		</Container>
	);
}
