import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateGroup } from "../../services/groups/queries";

interface CreateGroupPopupProps {
	open: boolean;
	onClose: () => void;
}

export const CreateGroupPopup: React.FC<CreateGroupPopupProps> = ({ open, onClose }) => {
	const { t } = useTranslation();

	const createGroupSchema = z.object({
		name: z.string().min(1, t("requiredField")),
	});

	type FormValues = z.infer<typeof createGroupSchema>;
	const navigate = useNavigate();
	const createGroup = useCreateGroup();

	const form = useForm<FormValues>({
		resolver: zodResolver(createGroupSchema),
		defaultValues: {
			name: "",
		},
	});

	const onCreateGroup = async (values: FormValues) => {
		try {
			const createdGroup = await createGroup.mutateAsync(values);
			navigate(`/dashboard/groups/${createdGroup.id}`);
			form.reset();
			onClose();
		} catch (e) {
			console.error(e);
			toast.error(t("something-went-wrong"));
		}
	};

	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<DialogContent className="max-w-[400px]">
				<DialogHeader>
					<DialogTitle>{t("create-group")}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onCreateGroup)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("name")}</FormLabel>
									<FormControl>
										<Input {...field} disabled={createGroup.isPending} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex gap-2">
							<Button type="submit" disabled={createGroup.isPending}>
								{createGroup.isPending && (
									<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
								)}
								{t("create")}
							</Button>
							<Button type="button" variant="outline" onClick={onClose}>
								{t("cancel")}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
