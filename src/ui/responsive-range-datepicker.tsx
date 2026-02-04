import styled from "@emotion/styled";
import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import type { ReactNode } from "react";

const StyleWrapperDatePicker = styled.div`
  .ant-picker-panel {
    &:last-child {
      width: 0;

      .ant-picker-header {
        position: absolute;
        right: 0;

        .ant-picker-header-prev-btn,
        .ant-picker-header-view {
          visibility: hidden;
        }
      }

      .ant-picker-body {
        display: none;
      }

      @media (min-width: 768px) {
        width: 280px !important;
        .ant-picker-header {
          position: relative;

          .ant-picker-header-prev-btn,
          .ant-picker-header-view {
            visibility: initial;
          }
        }

        .ant-picker-body {
          display: block;
        }
      }
    }
  }
`;

export const RangeDatePicker = (props: RangePickerProps) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const panelRender = (panelNode: ReactNode) => (
		<StyleWrapperDatePicker>{panelNode as any}</StyleWrapperDatePicker>
	);

	return <DatePicker.RangePicker panelRender={panelRender} {...props} />;
};
