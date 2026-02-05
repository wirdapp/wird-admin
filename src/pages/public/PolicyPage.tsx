import { useTranslation } from "react-i18next";
import { SEO } from "components/public/SEO";

export function PolicyPage() {
	const { t } = useTranslation();

	return (
		<>
			<SEO
				title={`${t("policy")} - ${t("wird")}`}
				description="Privacy Policy for Wird App - Learn how we collect, use, and safeguard your information."
				ogTitle={`${t("policy")} - ${t("wird")}`}
				ogDescription="Privacy Policy for Wird App - Learn how we collect, use, and safeguard your information."
			/>
			<div className="mt-8 px-6 lg:px-8">
				<div className="max-w-5xl mx-auto bg-white rounded-2xl w-full p-8">
					<div className="page-content">
						<h1>Privacy Policy for Wird App</h1>
						<br />
						<p className="!text-sm italic text-gray-400">
							Effective Date: Feb 22, 2024
						</p>
						<br />
						<p>
							Thank you for using Wird App. This Privacy Policy outlines how we
							collect, use, and safeguard your information when you use our
							mobile application. By using Wird App, you consent to the data
							practices described in this policy.
						</p>

						<h3>Collection of Your Information</h3>
						<p>We collect the following types of information:</p>
						<ul>
							<li>
								Email, Profile Picture, and Phone Number: When you register for
								an account, we collect your email address, profile picture, and
								phone number to create and manage your account.
							</li>
						</ul>

						<h3>Use of Your Information</h3>
						<p>
							We only use the information we collect for the following purposes:
						</p>
						<ul>
							<li>
								Account Management: We use your email, profile picture, and
								phone number to create and manage your account within Wird App.
							</li>
						</ul>
						<h3>Third-party Sharing</h3>
						<p>
							We do not share your data with any third party under any
							circumstances.
						</p>

						<h3>Data Deletion</h3>
						<p>
							You have the right to request the deletion of your data at any
							time. To delete your data, you can click the delete button in your
							application, or you can contact us at{" "}
							<a href="mailto:contact@wird.app">contact@wird.app</a>. Upon
							receiving your request, we will promptly delete all data
							associated with your account.
						</p>

						<h3>Data Security</h3>
						<p>
							We take reasonable measures to protect your information from
							unauthorized access, alteration, disclosure, or destruction.
							However, please be aware that no method of transmission over the
							internet or electronic storage is 100% secure, and we cannot
							guarantee absolute security.
						</p>

						<h3>Children&apos;s Privacy</h3>
						<p>
							Wird App is intended for users of all ages, including children. We
							do not knowingly collect personal information from children under
							the age of 13. If you are a parent or guardian and believe that
							your child has provided us with personal information, please
							contact us so that we can delete the information.
						</p>

						<h3>Changes to This Privacy Policy</h3>
						<p>
							We reserve the right to update or change our Privacy Policy at any
							time. Any changes to the Privacy Policy will be effective
							immediately upon posting the updated policy on this page.
						</p>

						<h3>Contact Us</h3>
						<p>
							If you have any questions or concerns about this Privacy Policy,
							please contact us at{" "}
							<a href="mailto:contact@wird.app">contact@wird.app</a>.
						</p>

						<p>
							By using Wird App, you agree to the terms of this Privacy Policy.
							If you do not agree with this policy, please do not use the
							application.
						</p>
						<p>
							We would like to emphasize that Wird contest is entirely
							independent of Apple Inc. and its subsidiaries. Apple is not a
							sponsor, co-sponsor, endorser, or administrator of our contest.
							Additionally, Apple bears no responsibility for the management,
							execution, or outcomes of this contest. Any inquiries regarding
							the contest should be directed solely to Wird, and Apple should
							not be contacted for any matters related to this Contest.
						</p>
						<br />
						<br />
					</div>
				</div>
			</div>
		</>
	);
}
