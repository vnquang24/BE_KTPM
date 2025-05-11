import { Controller, Get } from "@nestjs/common";
import { Public } from "./decorator";

@Controller()
export class AppController {
	@Public()
	@Get("health")
	health() {
		return "OK";
	}
}
