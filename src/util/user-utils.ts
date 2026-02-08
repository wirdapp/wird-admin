interface UserLike {
	name?: string;
	first_name?: string;
	last_name?: string;
	username?: string;
}

export function getFullName(user: UserLike | null | undefined): string | null {
	if (!user) return null;

	if (user.name) {
		return user.name;
	}
	if (!user.first_name && !user.last_name) {
		return user.username ?? null;
	}

	return `${user.first_name} ${user.last_name}`;
}

interface LeaderboardLike {
	person__first_name: string;
	person__last_name: string;
	person__username: string;
}

export function getLeaderboardFullName(entry: LeaderboardLike): string {
	if (!entry.person__first_name && !entry.person__last_name) {
		return entry.person__username;
	}
	return `${entry.person__first_name} ${entry.person__last_name}`;
}

export function getLeaderboardInitials(entry: LeaderboardLike): string {
	if (!entry.person__first_name || !entry.person__last_name) {
		return entry.person__username?.substring(0, 2)?.toUpperCase() ?? "";
	}
	return `${entry.person__first_name[0]}${entry.person__last_name[0]}`.toUpperCase();
}

export function getInitials(user: UserLike | null | undefined): string | null {
	if (!user) return null;

	if (!user.first_name || !user.last_name) {
		return user.username?.substring(0, 2)?.toUpperCase() ?? null;
	}

	return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
}
