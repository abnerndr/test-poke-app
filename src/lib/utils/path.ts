export class PathUtils {
	static getLastPath(path: string) {
		const segments = path.split("/").filter(Boolean);
		return segments.length > 0 ? segments[segments.length - 1] : "";
	}
}
