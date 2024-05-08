import { Module } from "@nestjs/common";
import { drugServices } from "./drugs.service";
import { drugController } from "./drugs.controller";

@Module({
    imports: [],
    providers: [drugServices],
    controllers: [drugController],
    exports: [drugServices]
})
export class drugModule {}