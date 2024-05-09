import { Module } from "@nestjs/common";
import { drugServices } from "./drugs.service";
import { drugController } from "./drugs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { drugEntity } from "./drugs.entity";

@Module({
    imports: [TypeOrmModule.forFeature([drugEntity])],
    providers: [drugServices],
    controllers: [drugController],
    exports: [drugServices]
})
export class drugModule {}