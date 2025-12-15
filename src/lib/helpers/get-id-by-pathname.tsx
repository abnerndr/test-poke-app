export function getIdByPathname(pathname: string) {
	const id = pathname.split("/").pop();
	return id ?? "";
}
