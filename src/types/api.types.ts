import type { Dayjs } from "dayjs";

// ============================================================================
// ENUMS
// ============================================================================

/** Contest person role (0-6) */
export enum Role {
	CONTEST_OWNER = 0,
	SUPER_ADMIN = 1,
	ADMIN = 2,
	MEMBER = 3,
	READ_ONLY_MEMBER = 4,
	PENDING = 5,
	DEACTIVATED = 6,
}

/** Group role (1-2) */
export enum GroupRole {
	ADMIN = 1,
	MEMBER = 2,
}

/** Contest status derived from dates */
export enum ContestStatus {
	NOT_STARTED = "not_started",
	STARTED = "started",
	FINISHED = "finished",
}

/** Device type for push notifications */
export type DeviceType = "ios" | "android";

/** Criterion resource type discriminator */
export type CriterionResourceType =
	| "numbercriterion"
	| "checkboxcriterion"
	| "radiocriterion"
	| "multicheckboxcriterion"
	| "userinputcriterion";

// ============================================================================
// COMMON TYPES
// ============================================================================

/** UUID string type alias for clarity */
export type UUID = string;

/** Standard paginated response wrapper */
export interface PaginatedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

// ============================================================================
// AUTH TYPES
// ============================================================================

/** Person (user) as returned by API */
export interface Person {
	id: UUID;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	profile_photo: string | null;
}

/** Person info as returned in member lists (minimal person data) */
export interface PersonInfo {
	username: string;
	first_name: string;
	last_name: string;
}

/** Legacy User type alias for backwards compatibility */
export type User = Person;

/** Login request payload */
export interface LoginRequest {
	username: string;
	password: string;
}

/** Login response with tokens and user */
export interface LoginResponse {
	access: string;
	refresh: string;
	user: Person;
}

/** Registration request payload */
export interface RegisterRequest {
	username: string;
	email: string;
	password1: string;
	password2: string;
	first_name?: string;
	last_name?: string;
	timezone?: string;
}

/** Registration response */
export interface RegisterResponse {
	access: string;
	refresh: string;
	user: Person;
}

/** Legacy signup form data alias */
export type SignupFormData = RegisterRequest;

/** Password change request (authenticated user) */
export interface PasswordChangeRequest {
	old_password: string;
	new_password1: string;
	new_password2: string;
}

/** Legacy change password form data alias */
export type ChangePasswordFormData = PasswordChangeRequest;

/** Password reset request (email) */
export interface PasswordResetRequest {
	email: string;
}

/** Password reset confirm request */
export interface PasswordResetConfirmRequest {
	uid: string;
	token: string;
	new_password1: string;
	new_password2: string;
}

/** Token refresh request */
export interface TokenRefreshRequest {
	refresh: string;
}

/** Token refresh response */
export interface TokenRefreshResponse {
	access: string;
	refresh?: string;
}

/** Social account linked to user */
export interface SocialAccount {
	id: UUID;
	provider: string;
	uid: string;
	last_login: string;
	date_joined: string;
}

/** Google social login request */
export interface GoogleSocialLoginRequest {
	access_token?: string;
	code?: string;
	id_token?: string;
}

/** Google social login response */
export interface GoogleSocialLoginResponse {
	access: string;
	refresh: string;
	user: Person;
}

/** Auth tokens stored in session */
export interface AuthTokens {
	token: string;
	refreshToken: string;
	user: Person;
}

// ============================================================================
// CONTEST TYPES
// ============================================================================

/** Contest as returned by API (raw dates) */
export interface ContestRaw {
	id: UUID;
	contest_id: string;
	name: string;
	description: string;
	country: string;
	start_date: string;
	end_date: string;
	show_standings: boolean;
	readonly_mode: boolean;
	person_contest_role?: Role;
}

/** Contest with parsed dates and computed status */
export interface Contest extends Omit<ContestRaw, "start_date" | "end_date"> {
	start_date: Dayjs;
	end_date: Dayjs;
	daterange: [Dayjs, Dayjs];
	status: ContestStatus;
}

/** Contest creation payload */
export interface ContestCreateData {
	name: string;
	description?: string;
	country?: string;
	start_date: string;
	end_date: string;
	show_standings?: boolean;
	readonly_mode?: boolean;
}

/** Contest update payload (partial) */
export interface ContestUpdateData {
	name?: string;
	description?: string;
	country?: string;
	start_date?: string;
	end_date?: string;
	show_standings?: boolean;
	readonly_mode?: boolean;
}

/** Contest person (member) as returned by API */
export interface ContestPerson {
	id: UUID;
	person_info: PersonInfo;
	contest_role: Role;
}

/** Legacy Member type alias */
export type Member = ContestPerson;

/** Contest person in group context */
export interface ContestPersonGroup {
	id: UUID;
	person_info: PersonInfo;
	group_role: GroupRole;
}

/** Legacy GroupMember type alias */
export type GroupMember = ContestPersonGroup;

/** Members query parameters */
export interface MembersQueryParams {
	contestId?: string;
	role?: Role | string;
	search?: string;
	page_size?: number;
	page?: number;
}

/** Add user to contest parameters */
export interface AddUserToContestParams {
	username: string;
	contestId?: string;
	role: Role;
}

/** Update user role parameters */
export interface UpdateUserRoleParams {
	userId: string;
	contestId?: string;
	role: Role;
}

// ============================================================================
// GROUP TYPES
// ============================================================================

/** Group announcement */
export interface GroupAnnouncement {
	id: UUID;
	title: string;
	body: string;
	created_at: string;
}

/** Group announcements object (paginated format from API) */
export interface GroupAnnouncementsPaginated {
	count: number;
	next: string | null;
	previous: string | null;
	results: GroupAnnouncement[];
}

/** Group as returned by API */
export interface Group {
	id: UUID;
	name: string;
	contest: UUID;
	announcements?: GroupAnnouncement[] | GroupAnnouncementsPaginated;
}

/** Group creation payload */
export interface GroupCreateData {
	name: string;
}

/** Group update payload (partial) */
export interface GroupUpdateData {
	name?: string;
}

// ============================================================================
// SECTION TYPES
// ============================================================================

/** Section as returned by API */
export interface Section {
	id: UUID;
	label: string;
	order_in_contest: number;
	visible: boolean;
	active: boolean;
	contest: UUID;
}

/** Section creation payload */
export interface SectionCreateData {
	label: string;
	position?: number;
	visible?: boolean;
	active?: boolean;
}

/** Section update payload (partial) */
export interface SectionUpdateData {
	label?: string;
	position?: number;
	visible?: boolean;
	active?: boolean;
}

// ============================================================================
// CRITERIA TYPES (Polymorphic)
// ============================================================================

/** Section info embedded in criterion response */
export interface SectionInfo {
	id: UUID;
	label: string;
}

/** Base criterion fields shared by all types */
export interface BaseCriterion {
	id: UUID;
	label: string;
	description: string;
	max_points: number;
	order_in_section: number;
	section: UUID;
	section_info?: SectionInfo;
	contest: UUID;
	resourcetype: CriterionResourceType;
}

/** Number criterion - numeric input with min/max bounds */
export interface NumberCriterion extends BaseCriterion {
	resourcetype: "numbercriterion";
	min_value: number;
	max_value: number;
}

/** Checkbox criterion - boolean toggle */
export interface CheckboxCriterion extends BaseCriterion {
	resourcetype: "checkboxcriterion";
	checked_label: string;
	unchecked_label: string;
}

/** Radio criterion choice option */
export interface RadioChoice {
	id: UUID;
	label: string;
	points: number;
	order: number;
}

/** Radio criterion - single selection from choices */
export interface RadioCriterion extends BaseCriterion {
	resourcetype: "radiocriterion";
	choices: RadioChoice[];
}

/** Multi-checkbox criterion choice option */
export interface MultiCheckboxChoice {
	id: UUID;
	label: string;
	points: number;
	order: number;
}

/** Multi-checkbox criterion - multiple selections from choices */
export interface MultiCheckboxCriterion extends BaseCriterion {
	resourcetype: "multicheckboxcriterion";
	choices: MultiCheckboxChoice[];
}

/** User input criterion - free text input */
export interface UserInputCriterion extends BaseCriterion {
	resourcetype: "userinputcriterion";
}

/** Discriminated union of all criterion types */
export type ContestCriterion =
	| NumberCriterion
	| CheckboxCriterion
	| RadioCriterion
	| MultiCheckboxCriterion
	| UserInputCriterion;

/** Legacy Criterion type alias */
export type Criterion = ContestCriterion;

/** Criterion creation payload (base fields) */
export interface CriterionCreateData {
	label: string;
	description?: string;
	max_points: number;
	section: UUID;
	order_in_section?: number;
	resourcetype: CriterionResourceType;
	// Type-specific fields
	min_value?: number;
	max_value?: number;
	checked_label?: string;
	unchecked_label?: string;
	choices?: Array<{ label: string; points: number; order?: number }>;
}

/** Criterion update payload (partial) */
export interface CriterionUpdateData {
	label?: string;
	description?: string;
	max_points?: number;
	section?: UUID;
	order_in_section?: number;
	// Type-specific fields
	min_value?: number;
	max_value?: number;
	checked_label?: string;
	unchecked_label?: string;
	choices?: Array<{ id?: UUID; label: string; points: number; order?: number }>;
}

// ============================================================================
// POINT RECORD TYPES (Polymorphic)
// ============================================================================

/** Base point record fields shared by all types */
export interface BasePointRecord {
	id: UUID;
	criterion: UUID;
	criterion_label: string;
	points: number;
	date: string;
	contest_person: UUID;
	resourcetype: CriterionResourceType;
}

/** Number point record */
export interface NumberPointRecord extends BasePointRecord {
	resourcetype: "numbercriterion";
	number: number;
}

/** Checkbox point record */
export interface CheckboxPointRecord extends BasePointRecord {
	resourcetype: "checkboxcriterion";
	checked: boolean;
}

/** Radio point record */
export interface RadioPointRecord extends BasePointRecord {
	resourcetype: "radiocriterion";
	choice: string;
}

/** Multi-checkbox point record */
export interface MultiCheckboxPointRecord extends BasePointRecord {
	resourcetype: "multicheckboxcriterion";
	choices: string[];
}

/** User input point record */
export interface UserInputPointRecord extends BasePointRecord {
	resourcetype: "userinputcriterion";
	user_input: string;
	reviewed_by_admin: boolean;
}

/** Discriminated union of all point record types */
export type PointRecord =
	| NumberPointRecord
	| CheckboxPointRecord
	| RadioPointRecord
	| MultiCheckboxPointRecord
	| UserInputPointRecord;

/** Admin point record base (includes person info) */
export interface AdminBasePointRecord extends BasePointRecord {
	person: Person;
}

/** Admin number point record */
export interface AdminNumberPointRecord extends AdminBasePointRecord {
	resourcetype: "numbercriterion";
	number: number;
}

/** Admin checkbox point record */
export interface AdminCheckboxPointRecord extends AdminBasePointRecord {
	resourcetype: "checkboxcriterion";
	checked: boolean;
}

/** Admin radio point record */
export interface AdminRadioPointRecord extends AdminBasePointRecord {
	resourcetype: "radiocriterion";
	choice: string;
}

/** Admin multi-checkbox point record */
export interface AdminMultiCheckboxPointRecord extends AdminBasePointRecord {
	resourcetype: "multicheckboxcriterion";
	choices: string[];
}

/** Admin user input point record */
export interface AdminUserInputPointRecord extends AdminBasePointRecord {
	resourcetype: "userinputcriterion";
	user_input: string;
	reviewed_by_admin: boolean;
}

/** Discriminated union of all admin point record types */
export type AdminPointRecord =
	| AdminNumberPointRecord
	| AdminCheckboxPointRecord
	| AdminRadioPointRecord
	| AdminMultiCheckboxPointRecord
	| AdminUserInputPointRecord;

/** Point record update payload */
export interface PointRecordUpdateData {
	points?: number;
	// Type-specific fields
	number?: number;
	checked?: boolean;
	choice?: string;
	choices?: string[];
	user_input?: string;
	reviewed_by_admin?: boolean;
}

// ============================================================================
// RESULTS TYPES
// ============================================================================

/** Leaderboard person entry */
export interface LeaderboardPerson {
	id: UUID;
	person_info: PersonInfo;
	total_points: number;
	rank: number;
	contest_role: Role;
}

/** Legacy LeaderboardEntry alias */
export type LeaderboardEntry = LeaderboardPerson;

/** Leaderboard response */
export interface LeaderboardResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: LeaderboardPerson[];
}

/** Day detail for user results */
export interface DayDetail {
	date: string;
	total_points: number;
	point_records: PointRecord[];
}

/** User results response */
export interface UserResultsResponse {
	contest_person: ContestPerson;
	total_points: number;
	days: DayDetail[];
}

/** Category score for member results */
export interface CategoryScore {
	contest_criterion__label: string;
	point_total: number;
}

/** Day submission summary for member results */
export interface DaySubmission {
	index: number;
	date: string;
	points: number;
}

/** Member result from admin panel API (individual member) */
export interface MemberResult {
	person_data: Person;
	total_points: number;
	rank: number;
	days: DaySubmission[];
	scores: CategoryScore[];
}

/** Top three user for daily results */
export interface TopThreeUser extends Person {
	points?: number;
}

/** Daily submission summary for contest results overview */
export interface DailySubmissionSummary {
	date: string;
	submission_count: number;
	top_three_by_day?: TopThreeUser[];
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

/** All notification (contest-wide) */
export interface AllNotification {
	id: UUID;
	title: string;
	body: string;
	created_at: string;
	contest: UUID;
}

/** Legacy Notification alias */
export type Notification = AllNotification;

/** Notification creation payload */
export interface NotificationCreateData {
	title: string;
	body: string;
}

/** User device for push notifications */
export interface UserDevice {
	id: UUID;
	registration_id: string;
	device_type: DeviceType;
	active: boolean;
	date_created: string;
}

/** Announcement as returned by API */
export interface Announcement {
	id: UUID;
	title: string;
	body: string;
	created_at: string;
	group: UUID;
}

/** Announcement creation payload */
export interface AnnouncementCreateData {
	title: string;
	body: string;
}

/** Announcement response (paginated) */
export interface AnnouncementResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Announcement[];
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/** Type guard for NumberCriterion */
export function isNumberCriterion(criterion: ContestCriterion): criterion is NumberCriterion {
	return criterion.resourcetype === "numbercriterion";
}

/** Type guard for CheckboxCriterion */
export function isCheckboxCriterion(criterion: ContestCriterion): criterion is CheckboxCriterion {
	return criterion.resourcetype === "checkboxcriterion";
}

/** Type guard for RadioCriterion */
export function isRadioCriterion(criterion: ContestCriterion): criterion is RadioCriterion {
	return criterion.resourcetype === "radiocriterion";
}

/** Type guard for MultiCheckboxCriterion */
export function isMultiCheckboxCriterion(
	criterion: ContestCriterion,
): criterion is MultiCheckboxCriterion {
	return criterion.resourcetype === "multicheckboxcriterion";
}

/** Type guard for UserInputCriterion */
export function isUserInputCriterion(criterion: ContestCriterion): criterion is UserInputCriterion {
	return criterion.resourcetype === "userinputcriterion";
}

/** Type guard for NumberPointRecord */
export function isNumberPointRecord(record: PointRecord): record is NumberPointRecord {
	return record.resourcetype === "numbercriterion";
}

/** Type guard for CheckboxPointRecord */
export function isCheckboxPointRecord(record: PointRecord): record is CheckboxPointRecord {
	return record.resourcetype === "checkboxcriterion";
}

/** Type guard for RadioPointRecord */
export function isRadioPointRecord(record: PointRecord): record is RadioPointRecord {
	return record.resourcetype === "radiocriterion";
}

/** Type guard for MultiCheckboxPointRecord */
export function isMultiCheckboxPointRecord(
	record: PointRecord,
): record is MultiCheckboxPointRecord {
	return record.resourcetype === "multicheckboxcriterion";
}

/** Type guard for UserInputPointRecord */
export function isUserInputPointRecord(record: PointRecord): record is UserInputPointRecord {
	return record.resourcetype === "userinputcriterion";
}
