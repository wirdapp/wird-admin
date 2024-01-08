export function getFullName(user) {
  if (!user.first_name || !user.last_name) {
    return user.username;
  }

  return `${user.first_name} ${user.last_name}`;
}

export function getInitials(user) {
  if (!user.first_name || !user.last_name) {
    return user.username?.[0]?.toUpperCase();
  }

  return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
}
