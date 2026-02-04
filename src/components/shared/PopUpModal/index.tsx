import React, { type ReactNode } from "react";
import Container, { ButtonsContainer, FixedTextContainer } from "./popUpModal.styled";

interface Position {
	top: number;
	left: number;
}

interface PopUpModalProps {
	buttons?: ReactNode;
	fixedTextFields?: ReactNode;
	position?: Position;
}

export default function PopUpModal({
	buttons,
	fixedTextFields,
	position = { top: 0, left: 0 },
}: PopUpModalProps) {
	return (
		// A VERY IMPORTANT NOTE:  ******** if I have more than one render for the pop up in the same component, it will read the content in the last call of it ********
		// EX: in the first call for the pop up we have: fixedTextFields as [<p>  Testing </p>] and in the second render  as [<p>  second render test </p>] then the final result will be rendered in the same component is [<p> second render test </p>]
		//    This should not be an issue in the
		<Container position={position}>
			{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
			<FixedTextContainer>{fixedTextFields as any}</FixedTextContainer>
			{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
			<ButtonsContainer>{buttons as any}</ButtonsContainer>
		</Container>
	);
}
