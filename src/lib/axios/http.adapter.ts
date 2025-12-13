import type { AxiosInstance } from "axios";
import axios from "axios";

export class AxiosHttpAdapter {
	private instance: AxiosInstance;
	private readonly timeoutMilliseconds = 50 * 1000; // 50 seconds

	public constructor(baseURL: string) {
		this.instance = axios.create({
			baseURL,
			timeout: this.timeoutMilliseconds,
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.setupInterceptors();
	}

	private setupInterceptors(): void {
		// Implementar interceptors
	}

	public getInstance(): AxiosInstance {
		return this.instance;
	}
}
