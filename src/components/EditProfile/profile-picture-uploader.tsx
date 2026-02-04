import React, { useEffect, useState } from "react";
import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { App, Avatar, Spin, Tooltip, Upload, UploadProps } from "antd";
import { useDashboardData } from "../../util/routes-data";
import { css } from "@emotion/css";
import { colors } from "../../styles";
import { useTranslation } from "react-i18next";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import type { UpdateUserInfoValues } from "./index";

interface ProfilePictureUploaderProps {
  onSubmit: (values: UpdateUserInfoValues) => Promise<void>;
}

export const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({ onSubmit }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const { currentUser } = useDashboardData();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(currentUser?.profile_photo);

  const beforeUpload: UploadProps['beforeUpload'] = (file: RcFile): boolean => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  useEffect(() => {
    setImageUrl(currentUser?.profile_photo);
  }, [currentUser]);

  const handleChange = (info: UploadChangeParam<UploadFile>): void => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <Spin /> : <PlusIcon style={{ width: 20, height: 20 }} />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Tooltip title={t("change-profile-photo")} placement="bottom">
      <Upload
        name="avatar"
        accept="image/*"
        listType="picture-circle"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={async ({ file }) => onSubmit({ profile_photo: file as File })}
        className={css`
          .ant-upload {
            width: 100px !important;
            height: 100px !important;

            &.ant-upload-select {
              margin: 0 !important;
            }
          }
        `}
      >
        {imageUrl ? (
          <Avatar
            src={imageUrl}
            alt="avatar"
            size={100}
            style={{ backgroundColor: "transparent" }}
          >
            <ArrowUpTrayIcon
              style={{ color: colors.darkGrey, width: 20, height: 20 }}
            />
          </Avatar>
        ) : (
          uploadButton
        )}
      </Upload>
    </Tooltip>
  );
};
