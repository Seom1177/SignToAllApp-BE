import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { HydratedDocument } from "mongoose";

export type ActivityByUserDocument = HydratedDocument<ActivityByUser>;

@Schema()
export class ActivityByUser{
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop()
    idUser: string;

    @Prop()
    idActivity: string;

    // @Prop()
    // score: number;

    @Prop()
    isDone: boolean;

    @Prop()
    timeDone: number;
}

export const ActivityByUserSchema = SchemaFactory.createForClass(ActivityByUser);